"""
Tests for the prediction API.

Run with: pytest tests/ -v
"""

import pytest
from fastapi.testclient import TestClient


# ─── Sample Test Payloads ─────────────────────────────────

VALID_HIGH_RISK = {
    "age": 52,
    "gender": "male",
    "bmi": 31.2,
    "waist_cm": 102,
    "daily_steps": 2000,
    "sleep_hours": 4.5,
    "sedentary_hours": 12,
    "stress_level": 9,
    "family_history": 1,
    "sugary_drinks_per_week": 10,
    "refined_flour_meals_per_week": 12,
    "indian_thali_per_week": 14,
    "smoking": 1,
    "alcohol": 1,
}

VALID_LOW_RISK = {
    "age": 25,
    "gender": "female",
    "bmi": 21.5,
    "waist_cm": 68,
    "daily_steps": 10000,
    "sleep_hours": 7.5,
    "sedentary_hours": 4,
    "stress_level": 3,
    "family_history": 0,
    "sugary_drinks_per_week": 1,
    "refined_flour_meals_per_week": 2,
    "indian_thali_per_week": 7,
    "smoking": 0,
    "alcohol": 0,
}

INVALID_PAYLOAD = {
    "age": 10,  # Below minimum (18)
    "gender": "other",  # Not in allowed values
    "bmi": 200,  # Way too high
}


@pytest.fixture
def client():
    """Create test client. Model must be trained first."""
    from app import app
    return TestClient(app)


class TestHealthCheck:
    def test_health_endpoint(self, client):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "model_loaded" in data

    def test_root_endpoint(self, client):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["engine"] == "GlucoPulse ML Engine"


class TestPrediction:
    def test_high_risk_prediction(self, client):
        """High-risk profile should return elevated probability."""
        response = client.post("/predict", json=VALID_HIGH_RISK)
        if response.status_code == 503:
            pytest.skip("Model not trained yet")

        assert response.status_code == 200
        data = response.json()

        assert "risk_probability" in data
        assert "category" in data
        assert "confidence" in data
        assert "shap_factors" in data
        assert "recommendations" in data

        assert isinstance(data["risk_probability"], (int, float))
        assert 0 <= data["risk_probability"] <= 100
        assert data["category"] in ["Low Risk", "Moderate Risk", "High Risk"]
        assert len(data["shap_factors"]) > 0
        assert len(data["recommendations"]) >= 3

    def test_low_risk_prediction(self, client):
        """Low-risk profile should return lower probability."""
        response = client.post("/predict", json=VALID_LOW_RISK)
        if response.status_code == 503:
            pytest.skip("Model not trained yet")

        assert response.status_code == 200
        data = response.json()
        assert data["risk_probability"] < 70  # Should generally be lower

    def test_risk_ordering(self, client):
        """High-risk profile should score higher than low-risk."""
        high = client.post("/predict", json=VALID_HIGH_RISK)
        low = client.post("/predict", json=VALID_LOW_RISK)

        if high.status_code == 503:
            pytest.skip("Model not trained yet")

        assert high.json()["risk_probability"] > low.json()["risk_probability"]

    def test_shap_factors_structure(self, client):
        """SHAP factors should have correct structure."""
        response = client.post("/predict", json=VALID_HIGH_RISK)
        if response.status_code == 503:
            pytest.skip("Model not trained yet")

        data = response.json()
        for factor in data["shap_factors"]:
            assert "factor" in factor
            assert "impact" in factor
            assert "%" in factor["impact"]


class TestValidation:
    def test_invalid_input_rejected(self, client):
        """Invalid payloads should return 422."""
        response = client.post("/predict", json=INVALID_PAYLOAD)
        assert response.status_code == 422

    def test_missing_fields_rejected(self, client):
        """Missing required fields should return 422."""
        response = client.post("/predict", json={"age": 30})
        assert response.status_code == 422

    def test_empty_body_rejected(self, client):
        """Empty body should return 422."""
        response = client.post("/predict", json={})
        assert response.status_code == 422
