"""
Model Training Pipeline for GlucoPulse Diabetes Risk Prediction.

Generates synthetic training data based on Indian population epidemiology,
trains an XGBoost classifier with SMOTE rebalancing, tunes hyperparameters,
and saves the model + preprocessing pipeline.

Usage:
    python train.py
"""

import sys
import logging
import numpy as np
import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split, RandomizedSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    classification_report, roc_auc_score, f1_score, accuracy_score
)
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier

from config import (
    MODEL_DIR, MODEL_PATH, PIPELINE_PATH,
    RANDOM_STATE, TEST_SIZE, N_SYNTHETIC_SAMPLES,
    NUMERIC_FEATURES, CATEGORICAL_FEATURES
)
from utils.preprocessing import (
    build_preprocessing_pipeline, engineer_features, ENGINEERED_FEATURES
)

# ─── Logging Setup ────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%H:%M:%S"
)
log = logging.getLogger("train")


# ═══════════════════════════════════════════════════════════
# 1. SYNTHETIC DATA GENERATION
# ═══════════════════════════════════════════════════════════

def generate_synthetic_data(n: int = N_SYNTHETIC_SAMPLES) -> pd.DataFrame:
    """Generate synthetic diabetes risk dataset calibrated to Indian population.
    
    Prevalence ~11.4% (ICMR-INDIAB study) adjusted for lifestyle risk stratification.
    Feature distributions based on NNMB, NFHS-5, and ICMR surveys.
    """
    rng = np.random.RandomState(RANDOM_STATE)
    log.info(f"Generating {n} synthetic samples...")

    data = {
        # Demographics — Indian adult population (18-70 typical range)
        "age": rng.triangular(18, 38, 72, n).round(0),
        "gender": rng.choice(["male", "female"], n, p=[0.52, 0.48]),

        # Anthropometrics — South Asian phenotype (lower BMI thresholds)
        "bmi": np.clip(rng.normal(24.5, 5.2, n), 14, 50).round(1),
        "waist_cm": np.clip(rng.normal(86, 14, n), 55, 150).round(1),

        # Physical Activity — urban sedentary patterns
        "daily_steps": np.clip(rng.lognormal(8.2, 0.65, n), 500, 25000).round(0),
        "sleep_hours": np.clip(rng.normal(6.5, 1.4, n), 3, 12).round(1),
        "sedentary_hours": np.clip(rng.normal(8.5, 3.0, n), 1, 18).round(1),
        "stress_level": np.clip(rng.normal(5.5, 2.2, n), 1, 10).round(0),

        # Genetic & Behavioral
        "family_history": rng.choice([0, 1], n, p=[0.65, 0.35]),
        "sugary_drinks_per_week": np.clip(rng.poisson(3.5, n), 0, 25).astype(float),
        "refined_flour_meals_per_week": np.clip(rng.poisson(5, n), 0, 21).astype(float),
        "indian_thali_per_week": np.clip(rng.poisson(8, n), 0, 21).astype(float),
        "smoking": rng.choice([0, 1], n, p=[0.80, 0.20]),
        "alcohol": rng.choice([0, 1], n, p=[0.75, 0.25]),
    }

    df = pd.DataFrame(data)

    # ─── Generate realistic target labels ─────────────────
    # Risk score based on medical evidence — then probabilistically assign label
    risk_score = np.zeros(n, dtype=float)

    # Age contribution (exponential after 35)
    risk_score += np.where(df["age"] > 35, (df["age"] - 35) * 0.6, 0)
    risk_score += np.where(df["age"] > 50, (df["age"] - 50) * 0.4, 0)

    # BMI — using WHO Asia-Pacific cutoffs (overweight at 23, obese at 27.5)
    risk_score += np.where(df["bmi"] > 23, (df["bmi"] - 23) * 1.8, 0)
    risk_score += np.where(df["bmi"] > 27.5, (df["bmi"] - 27.5) * 1.5, 0)

    # Waist circumference — abdominal obesity (gender-specific Indian thresholds)
    male_mask = df["gender"] == "male"
    risk_score += np.where(male_mask & (df["waist_cm"] > 90), (df["waist_cm"] - 90) * 0.5, 0)
    risk_score += np.where(~male_mask & (df["waist_cm"] > 80), (df["waist_cm"] - 80) * 0.5, 0)

    # Low physical activity
    risk_score += np.where(df["daily_steps"] < 5000, (5000 - df["daily_steps"]) * 0.003, 0)

    # Poor sleep (both short and long)
    risk_score += np.abs(df["sleep_hours"] - 7.5) * 2.0

    # Sedentary lifestyle
    risk_score += np.where(df["sedentary_hours"] > 8, (df["sedentary_hours"] - 8) * 2.5, 0)

    # Chronic stress
    risk_score += np.where(df["stress_level"] > 6, (df["stress_level"] - 6) * 2.0, 0)

    # Family history — strong genetic component in South Asians
    risk_score += df["family_history"] * 12

    # Dietary factors
    risk_score += df["sugary_drinks_per_week"] * 1.2
    risk_score += df["refined_flour_meals_per_week"] * 0.8
    risk_score += np.where(df["indian_thali_per_week"] > 10, (df["indian_thali_per_week"] - 10) * 0.5, 0)

    # Lifestyle modifiers
    risk_score += df["smoking"] * 5
    risk_score += df["alcohol"] * 3

    # Normalize to 0-1, add noise, then threshold
    risk_score = (risk_score - risk_score.min()) / (risk_score.max() - risk_score.min() + 1e-8)
    risk_score += rng.normal(0, 0.08, n)
    risk_score = np.clip(risk_score, 0, 1)

    # Target prevalence ~25% (higher than general because we're selecting at-risk individuals)
    threshold = np.percentile(risk_score, 75)
    df["diabetes_risk"] = (risk_score >= threshold).astype(int)

    pos_rate = df["diabetes_risk"].mean()
    log.info(f"Generated labels — positive rate: {pos_rate:.1%}")

    return df


# ═══════════════════════════════════════════════════════════
# 2. TRAINING PIPELINE
# ═══════════════════════════════════════════════════════════

def train_model():
    """Full training pipeline: generate → preprocess → SMOTE → tune → train → save."""

    # Step 1: Generate data
    df = generate_synthetic_data()

    # Step 2: Feature engineering
    log.info("Engineering features...")
    df = engineer_features(df)

    # Step 3: Build & fit preprocessing pipeline
    log.info("Building preprocessing pipeline...")
    preprocessor = build_preprocessing_pipeline()

    # Fit preprocessor on original features
    preprocessor.fit(df[NUMERIC_FEATURES + CATEGORICAL_FEATURES])

    # Transform original features
    X_processed = preprocessor.transform(df[NUMERIC_FEATURES + CATEGORICAL_FEATURES])

    # Scale engineered features separately
    eng_scaler = StandardScaler()
    X_engineered = eng_scaler.fit_transform(df[ENGINEERED_FEATURES].values)

    # Combine into final feature matrix
    X = np.hstack([X_processed, X_engineered])
    y = df["diabetes_risk"]

    log.info(f"Feature matrix shape: {X.shape}")

    # Step 4: Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE, stratify=y
    )

    # Step 5: SMOTE oversampling on training set
    log.info("Applying SMOTE rebalancing...")
    smote = SMOTE(random_state=RANDOM_STATE)
    X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)
    log.info(f"After SMOTE — Train: {len(X_train_resampled)}, positive: {y_train_resampled.mean():.1%}")

    # Step 6: Hyperparameter tuning with RandomizedSearch
    log.info("Tuning hyperparameters (this may take 1-2 minutes)...")
    param_distributions = {
        "n_estimators": [100, 200, 300, 400, 500],
        "max_depth": [3, 4, 5, 6, 7, 8],
        "learning_rate": [0.01, 0.03, 0.05, 0.08, 0.1, 0.15],
        "subsample": [0.7, 0.8, 0.9, 1.0],
        "colsample_bytree": [0.6, 0.7, 0.8, 0.9, 1.0],
        "min_child_weight": [1, 3, 5, 7],
        "gamma": [0, 0.1, 0.2, 0.3],
        "reg_alpha": [0, 0.01, 0.1, 1],
        "reg_lambda": [1, 1.5, 2, 3],
    }

    base_model = XGBClassifier(
        objective="binary:logistic",
        eval_metric="logloss",
        random_state=RANDOM_STATE,
        tree_method="hist",
    )

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)

    search = RandomizedSearchCV(
        estimator=base_model,
        param_distributions=param_distributions,
        n_iter=50,
        cv=cv,
        scoring="roc_auc",
        random_state=RANDOM_STATE,
        n_jobs=-1,
        verbose=0,
    )

    search.fit(X_train_resampled, y_train_resampled)
    best_model = search.best_estimator_

    log.info(f"Best params: {search.best_params_}")
    log.info(f"Best CV AUC: {search.best_score_:.4f}")

    # Step 7: Evaluate on test set
    y_pred = best_model.predict(X_test)
    y_prob = best_model.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)

    log.info("=" * 50)
    log.info(f"Test Accuracy:  {accuracy:.4f}")
    log.info(f"Test F1 Score:  {f1:.4f}")
    log.info(f"Test ROC-AUC:   {auc:.4f}")
    log.info("=" * 50)
    log.info("\n" + classification_report(y_test, y_pred, target_names=["No Risk", "At Risk"]))

    # Step 8: Save artifacts
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    joblib.dump(best_model, MODEL_PATH)
    log.info(f"Saved model → {MODEL_PATH}")

    pipeline_artifact = {
        "preprocessor": preprocessor,
        "engineered_scaler": eng_scaler,
        "engineered_features": ENGINEERED_FEATURES,
    }
    joblib.dump(pipeline_artifact, PIPELINE_PATH)
    log.info(f"Saved pipeline → {PIPELINE_PATH}")

    log.info("✅ Training complete! All artifacts saved.")

    return best_model, preprocessor


if __name__ == "__main__":
    train_model()
