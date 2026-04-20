"""
Explainability Service — XGBoost Native Feature Contribution.

Uses XGBoost's built-in `predict(output_margin=True)` with per-feature
contribution analysis to generate human-readable risk factor explanations.

This approach is faster than SHAP, requires no C++ build tools,
and is equally accurate for tree-based models since XGBoost can
compute exact feature contributions for each prediction.
"""

import numpy as np
import logging

from model.loader import model_loader
from config import NUMERIC_FEATURES
from utils.preprocessing import ENGINEERED_FEATURES

log = logging.getLogger("services.explainer")

# ─── Human-readable feature names ─────────────────────────
FEATURE_LABELS = {
    # Original numeric features
    "age": "Age",
    "bmi": "Body Mass Index",
    "waist_cm": "Waist Circumference",
    "daily_steps": "Daily Steps",
    "sleep_hours": "Sleep Duration",
    "sedentary_hours": "Sedentary Hours",
    "stress_level": "Stress Level",
    "sugary_drinks_per_week": "Sugary Drink Intake",
    "refined_flour_meals_per_week": "Refined Flour (Maida) Meals",
    "indian_thali_per_week": "Indian Thali Frequency",
    # Encoded features (from ColumnTransformer)
    "gender_encoded": "Gender Factor",
    "family_history": "Family History of Diabetes",
    "smoking": "Smoking Habit",
    "alcohol": "Alcohol Consumption",
    # Engineered features
    "abdominal_risk": "Abdominal Obesity Index",
    "bmi_waist_interaction": "Central Adiposity Score",
    "sedentary_active_ratio": "Sedentary-to-Active Ratio",
    "dietary_risk_score": "Dietary Glycemic Load",
    "sleep_deficit": "Sleep Quality Deficit",
    "stress_sleep_interaction": "Stress × Sleep Impact",
}


def _get_feature_names() -> list[str]:
    """Reconstruct the ordered feature names matching the model's input columns.
    
    Order must match: [preprocessed numeric] + [gender OHE] + [binary] + [engineered]
    """
    names = list(NUMERIC_FEATURES)  # numeric features first
    names += ["gender_encoded"]     # OneHotEncoder with drop="if_binary" → one column
    names += ["family_history", "smoking", "alcohol"]  # binary features
    names += list(ENGINEERED_FEATURES)
    return names


def explain_prediction(feature_vector: np.ndarray, top_n: int = 3) -> list[dict]:
    """Compute feature contributions and return top N risk drivers.
    
    Uses XGBoost's native feature importance weighted by the actual
    feature values for this specific prediction. This gives per-prediction
    explanations similar to SHAP but without the external dependency.
    
    Args:
        feature_vector: The processed feature array used for prediction (1, n_features).
        top_n: Number of top factors to return.
    
    Returns:
        List of dicts: [{"factor": "...", "impact": "+18%"}, ...]
    """
    loader = model_loader
    feature_names = _get_feature_names()

    # Get per-leaf prediction contributions from XGBoost
    # pred_contribs=True returns (n_samples, n_features + 1) where last column is bias
    contribs = loader.model.get_booster().predict(
        __import__('xgboost').DMatrix(feature_vector),
        pred_contribs=True
    )

    # contribs shape: (1, n_features + 1) — last element is base score (bias)
    values = contribs[0][:-1]  # Exclude bias term

    # Map to feature names
    n_features = min(len(values), len(feature_names))
    feature_impacts = []

    for i in range(n_features):
        # Convert log-odds contribution to approximate percentage impact
        impact_pct = round(float(values[i] * 100), 1)
        if abs(impact_pct) < 0.5:
            continue  # Skip negligible factors

        feature_impacts.append({
            "feature_name": feature_names[i],
            "label": FEATURE_LABELS.get(feature_names[i], feature_names[i]),
            "raw_impact": impact_pct,
        })

    # Sort by absolute impact (descending)
    feature_impacts.sort(key=lambda x: abs(x["raw_impact"]), reverse=True)

    # Take top N and format
    top_factors = []
    for item in feature_impacts[:top_n]:
        sign = "+" if item["raw_impact"] > 0 else ""
        top_factors.append({
            "factor": item["label"],
            "impact": f"{sign}{item['raw_impact']}%",
        })

    log.info(f"Top {top_n} risk drivers: {[f['factor'] for f in top_factors]}")

    return top_factors
