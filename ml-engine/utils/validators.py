"""
Input validation schemas using Pydantic.
Validates all incoming prediction requests against expected ranges.
"""

from pydantic import BaseModel, Field, field_validator
from typing import Literal


class PredictionInput(BaseModel):
    """Schema for diabetes risk prediction input.
    
    All fields are validated against physiologically reasonable ranges
    calibrated for Indian adult population (18-90 years).
    """

    age: float = Field(..., ge=18, le=90, description="Age in years")
    gender: Literal["male", "female"] = Field(..., description="Biological sex")
    bmi: float = Field(..., ge=12, le=60, description="Body Mass Index (kg/m²)")
    waist_cm: float = Field(..., ge=50, le=180, description="Waist circumference in cm")
    daily_steps: float = Field(..., ge=0, le=50000, description="Average daily step count")
    sleep_hours: float = Field(..., ge=2, le=14, description="Average nightly sleep in hours")
    sedentary_hours: float = Field(..., ge=0, le=20, description="Daily sedentary hours (sitting/lying)")
    stress_level: float = Field(..., ge=1, le=10, description="Self-reported stress level (1-10)")
    family_history: Literal[0, 1] = Field(..., description="Family history of diabetes (0=No, 1=Yes)")
    sugary_drinks_per_week: float = Field(..., ge=0, le=40, description="Sugary drinks consumed per week")
    refined_flour_meals_per_week: float = Field(..., ge=0, le=30, description="Refined flour (maida) meals per week")
    indian_thali_per_week: float = Field(..., ge=0, le=21, description="Traditional Indian thali meals per week")
    smoking: Literal[0, 1] = Field(..., description="Current smoker (0=No, 1=Yes)")
    alcohol: Literal[0, 1] = Field(..., description="Regular alcohol consumption (0=No, 1=Yes)")

    @field_validator("gender", mode="before")
    @classmethod
    def normalize_gender(cls, v: str) -> str:
        return v.strip().lower()

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "age": 35,
                    "gender": "male",
                    "bmi": 27.5,
                    "waist_cm": 94,
                    "daily_steps": 3500,
                    "sleep_hours": 5.5,
                    "sedentary_hours": 10,
                    "stress_level": 7,
                    "family_history": 1,
                    "sugary_drinks_per_week": 5,
                    "refined_flour_meals_per_week": 8,
                    "indian_thali_per_week": 10,
                    "smoking": 0,
                    "alcohol": 1,
                }
            ]
        }
    }


class PredictionOutput(BaseModel):
    """Schema for the prediction response."""

    risk_probability: float = Field(..., description="Predicted diabetes risk probability (%)")
    category: str = Field(..., description="Risk category: Low Risk / Moderate Risk / High Risk")
    confidence: float = Field(..., description="Model confidence score (%)")
    shap_factors: list[dict] = Field(..., description="Top contributing risk factors with SHAP impact")
    recommendations: list[str] = Field(..., description="Personalized lifestyle recommendations")
