"""
Prediction Service.

Takes validated input, preprocesses it, runs inference through the XGBoost model,
and returns a structured prediction with risk probability, category, and confidence.
"""

import numpy as np
import pandas as pd
import logging

from model.loader import model_loader
from utils.preprocessing import engineer_features, ENGINEERED_FEATURES
from config import NUMERIC_FEATURES, CATEGORICAL_FEATURES, get_risk_category

log = logging.getLogger("services.predictor")


def predict(input_data: dict) -> dict:
    """Run diabetes risk prediction on a single input sample.
    
    Args:
        input_data: Validated input dict matching PredictionInput schema.
    
    Returns:
        Dict with risk_probability, category, and confidence.
    """
    loader = model_loader

    # 1. Build single-row DataFrame
    df = pd.DataFrame([input_data])

    # 2. Engineer derived features
    df = engineer_features(df)

    # 3. Preprocess original features (scaling + encoding)
    X_processed = loader.preprocessor.transform(df[NUMERIC_FEATURES + CATEGORICAL_FEATURES])

    # 4. Scale engineered features
    X_engineered = loader.engineered_scaler.transform(df[ENGINEERED_FEATURES].values)

    # 5. Combine
    X = np.hstack([X_processed, X_engineered])

    # 6. Predict
    probability = loader.model.predict_proba(X)[0][1]
    risk_pct = round(float(probability * 100), 1)

    # 7. Confidence — derived from how far the prediction is from the 50% boundary.
    # A prediction of 0.95 or 0.05 is high confidence, 0.50 is low.
    confidence = round(float(abs(probability - 0.5) * 2 * 100), 1)
    # Minimum confidence floor at 55%
    confidence = max(confidence, 55.0)

    category = get_risk_category(risk_pct)

    log.info(f"Prediction: {risk_pct}% ({category}), confidence: {confidence}%")

    return {
        "risk_probability": risk_pct,
        "category": category,
        "confidence": confidence,
        "feature_vector": X,  # Passed to SHAP explainer
    }
