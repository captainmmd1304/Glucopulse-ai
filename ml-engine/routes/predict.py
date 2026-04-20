"""
Prediction API Route.

POST /predict — accepts user health features, returns risk assessment.
GET  /health  — health check endpoint.
"""

import logging
import time
from fastapi import APIRouter, HTTPException

from utils.validators import PredictionInput, PredictionOutput
from services.predictor import predict
from services.explainer import explain_prediction
from services.recommender import generate_recommendations
from model.loader import model_loader

log = logging.getLogger("routes.predict")

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check — confirms server is running and model is loaded."""
    return {
        "status": "healthy",
        "model_loaded": model_loader.is_loaded,
        "engine": "GlucoPulse ML Engine v1.0",
    }


@router.post("/predict", response_model=PredictionOutput)
async def predict_risk(input_data: PredictionInput):
    """Predict diabetes risk from lifestyle and behavioral inputs.
    
    Returns risk probability, category, top SHAP factors, and recommendations.
    """
    if not model_loader.is_loaded:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Run `python train.py` first."
        )

    start = time.perf_counter()

    try:
        # 1. Convert Pydantic model to dict
        data = input_data.model_dump()

        # 2. Run prediction
        result = predict(data)

        # 3. Get SHAP explanations
        shap_factors = explain_prediction(result["feature_vector"], top_n=3)

        # 4. Generate recommendations
        recommendations = generate_recommendations(data, shap_factors)

        elapsed = (time.perf_counter() - start) * 1000
        log.info(f"Prediction completed in {elapsed:.1f}ms")

        return PredictionOutput(
            risk_probability=result["risk_probability"],
            category=result["category"],
            confidence=result["confidence"],
            shap_factors=shap_factors,
            recommendations=recommendations,
        )

    except Exception as e:
        log.error(f"Prediction error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
