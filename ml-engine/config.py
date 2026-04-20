# GlucoPulse ML Engine Configuration

import os
from pathlib import Path

# ─── Paths ────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model" / "trained"
LOG_DIR = BASE_DIR / "logs"

MODEL_PATH = MODEL_DIR / "xgb_diabetes_model.joblib"
PIPELINE_PATH = MODEL_DIR / "preprocessing_pipeline.joblib"

# ─── Server ───────────────────────────────────────────────
HOST = os.getenv("ML_HOST", "0.0.0.0")
PORT = int(os.getenv("ML_PORT", "8000"))
DEBUG = os.getenv("ML_DEBUG", "false").lower() == "true"

# ─── Model ────────────────────────────────────────────────
RANDOM_STATE = 42
TEST_SIZE = 0.2
N_SYNTHETIC_SAMPLES = 5000

# Feature definitions
NUMERIC_FEATURES = [
    "age", "bmi", "waist_cm", "daily_steps", "sleep_hours",
    "sedentary_hours", "stress_level", "sugary_drinks_per_week",
    "refined_flour_meals_per_week", "indian_thali_per_week"
]

CATEGORICAL_FEATURES = [
    "gender", "family_history", "smoking", "alcohol"
]

BINARY_FEATURES = ["family_history", "smoking", "alcohol"]

# Ordered list — must match training order
ALL_FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES

# ─── Indian Population Risk Thresholds ────────────────────
# Based on ICMR / WHO-SEARO guidelines for South Asian populations
RISK_THRESHOLDS = {
    "waist_male": 90,       # cm — abdominal obesity threshold for Indian males
    "waist_female": 80,     # cm — for Indian females
    "bmi_overweight": 23,   # WHO Asia-Pacific cutoff (lower than Western 25)
    "bmi_obese": 27.5,      # WHO Asia-Pacific cutoff (lower than Western 30)
    "min_steps": 5000,
    "ideal_steps": 8000,
    "min_sleep": 6.5,
    "ideal_sleep": 7.5,
    "max_sedentary": 8,
    "max_stress": 6,
    "max_sugary_drinks": 3,
    "max_refined_flour": 5,
}

# ─── Risk Categories ──────────────────────────────────────
def get_risk_category(probability: float) -> str:
    """Classify risk based on predicted probability."""
    if probability < 30:
        return "Low Risk"
    elif probability < 60:
        return "Moderate Risk"
    else:
        return "High Risk"
