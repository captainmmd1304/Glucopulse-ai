"""
Feature preprocessing pipeline.

Handles:
- Numeric scaling (StandardScaler)
- Categorical encoding (OrdinalEncoder for binary, OneHotEncoder for gender)
- Feature engineering: derived risk indicators for Indian population
"""

import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OrdinalEncoder, OneHotEncoder

from config import NUMERIC_FEATURES, CATEGORICAL_FEATURES


def build_preprocessing_pipeline() -> ColumnTransformer:
    """Build the sklearn ColumnTransformer for feature preprocessing.
    
    - Numeric features → StandardScaler
    - Gender → OneHotEncoder (male/female → 2 columns)
    - Binary features (family_history, smoking, alcohol) → OrdinalEncoder (passthrough 0/1)
    """

    numeric_transformer = Pipeline(steps=[
        ("scaler", StandardScaler())
    ])

    # Gender gets one-hot encoded
    gender_transformer = Pipeline(steps=[
        ("onehot", OneHotEncoder(drop="if_binary", sparse_output=False, handle_unknown="infrequent_if_exist"))
    ])

    # Binary features are already 0/1 — just passthrough with ordinal encoding
    binary_transformer = Pipeline(steps=[
        ("ordinal", OrdinalEncoder())
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, NUMERIC_FEATURES),
            ("gender", gender_transformer, ["gender"]),
            ("binary", binary_transformer, ["family_history", "smoking", "alcohol"]),
        ],
        remainder="drop"
    )

    return preprocessor


def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Create derived features that capture Indian population risk patterns.
    
    These engineered features encode domain knowledge about metabolic syndrome
    risk factors specific to South Asian populations.
    """
    df = df.copy()

    # ─── Abdominal Obesity Index ──────────────────────────
    # Indian males: waist > 90cm, females: waist > 80cm (ICMR guidelines)
    df["abdominal_risk"] = df.apply(
        lambda row: row["waist_cm"] / (90 if row["gender"] == "male" else 80),
        axis=1
    )

    # ─── BMI × Waist interaction ──────────────────────────
    # Captures central adiposity beyond BMI alone — critical for South Asians
    # who can be "normal weight obese" (thin-fat phenotype)
    df["bmi_waist_interaction"] = df["bmi"] * df["waist_cm"] / 100

    # ─── Sedentary-to-Active Ratio ────────────────────────
    # Higher ratio = more sedentary lifestyle. Capped to avoid division by near-zero.
    df["sedentary_active_ratio"] = df["sedentary_hours"] / (df["daily_steps"] / 1000 + 0.5)

    # ─── Dietary Glycemic Load Score ──────────────────────
    # Composite of sugar + refined flour + high-carb thali frequency
    # Weighted: sugary drinks most harmful, thali moderate (depends on composition)
    df["dietary_risk_score"] = (
        df["sugary_drinks_per_week"] * 1.5 +
        df["refined_flour_meals_per_week"] * 1.2 +
        df["indian_thali_per_week"] * 0.6
    )

    # ─── Sleep Deficit Score ──────────────────────────────
    # Distance from ideal 7.5h sleep — both short AND long sleep are risk factors
    df["sleep_deficit"] = np.abs(df["sleep_hours"] - 7.5)

    # ─── Compound Lifestyle Risk ──────────────────────────
    # Stress × poor sleep creates cortisol-driven insulin resistance
    df["stress_sleep_interaction"] = df["stress_level"] * df["sleep_deficit"]

    return df


# The engineered features that get added to the pipeline
ENGINEERED_FEATURES = [
    "abdominal_risk",
    "bmi_waist_interaction",
    "sedentary_active_ratio",
    "dietary_risk_score",
    "sleep_deficit",
    "stress_sleep_interaction",
]
