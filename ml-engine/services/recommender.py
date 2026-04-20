"""
Recommendation Engine.

Generates personalized, actionable lifestyle recommendations
based on the user's input features and the identified risk factors.

Rules are calibrated for Indian population dietary and lifestyle patterns.
"""

import logging
from config import RISK_THRESHOLDS as T

log = logging.getLogger("services.recommender")


def generate_recommendations(input_data: dict, shap_factors: list[dict]) -> list[str]:
    """Generate personalized recommendations based on input data and SHAP drivers.
    
    Args:
        input_data: The raw validated input dict.
        shap_factors: Top SHAP factors from the explainer.
    
    Returns:
        List of 3-5 actionable recommendation strings.
    """
    recommendations = []
    shap_factor_names = {f["factor"].lower() for f in shap_factors}

    # ─── Physical Activity ────────────────────────────────
    steps = input_data["daily_steps"]
    if steps < T["min_steps"]:
        deficit = int(T["ideal_steps"] - steps)
        recommendations.append(
            f"Increase daily walking by {deficit:,} steps. Start with a 20-minute "
            f"brisk walk after dinner — a common and effective habit in Indian households."
        )
    elif steps < T["ideal_steps"]:
        recommendations.append(
            f"You're at {int(steps):,} steps/day. Aim for {T['ideal_steps']:,} steps "
            f"by adding a morning walk or evening yoga session."
        )

    # ─── BMI & Waist ──────────────────────────────────────
    bmi = input_data["bmi"]
    waist = input_data["waist_cm"]
    gender = input_data["gender"]
    waist_threshold = T["waist_male"] if gender == "male" else T["waist_female"]

    if bmi > T["bmi_obese"]:
        recommendations.append(
            "Your BMI indicates obesity by South Asian standards (>27.5). "
            "Target a 5-7% weight reduction over 6 months through portion control "
            "and reducing fried snacks (samosas, pakoras, chips)."
        )
    elif bmi > T["bmi_overweight"]:
        recommendations.append(
            "Your BMI exceeds the Asian cutoff for overweight (>23). "
            "Consider replacing white rice with brown rice or millets (bajra, jowar) "
            "to reduce glycemic load without drastically changing your diet."
        )

    if waist > waist_threshold:
        recommendations.append(
            f"Waist circumference of {waist}cm exceeds the ICMR threshold of "
            f"{waist_threshold}cm for {'men' if gender == 'male' else 'women'}. "
            f"Abdominal fat is the strongest predictor of diabetes in Indians. "
            f"Focus on core exercises and reducing refined carbohydrates."
        )

    # ─── Sleep ────────────────────────────────────────────
    sleep = input_data["sleep_hours"]
    if sleep < T["min_sleep"]:
        recommendations.append(
            f"Sleeping {sleep}h/night significantly increases insulin resistance. "
            f"Aim for 7-8 hours. Avoid screen time 1 hour before bed and try "
            f"a warm milk or chamomile tea routine."
        )
    elif sleep > 9:
        recommendations.append(
            "Excessive sleep (>9h) can also indicate metabolic dysfunction. "
            "Maintain a consistent 7-8 hour sleep schedule with a fixed wake time."
        )

    # ─── Sedentary Behavior ───────────────────────────────
    sedentary = input_data["sedentary_hours"]
    if sedentary > T["max_sedentary"]:
        recommendations.append(
            f"You spend {sedentary}h/day sedentary. Break sitting every 45 minutes "
            f"with a 5-minute walk. Standing desks and walking meetings reduce "
            f"insulin resistance by up to 24%."
        )

    # ─── Stress ───────────────────────────────────────────
    stress = input_data["stress_level"]
    if stress > T["max_stress"]:
        recommendations.append(
            "High stress elevates cortisol, directly increasing blood sugar levels. "
            "Practice pranayama (breathing exercises) or 10-minute daily meditation. "
            "Even simple deep breathing activates the parasympathetic nervous system."
        )

    # ─── Dietary — Sugar ──────────────────────────────────
    sugary = input_data["sugary_drinks_per_week"]
    if sugary > T["max_sugary_drinks"]:
        recommendations.append(
            f"Consuming {int(sugary)} sugary drinks/week dramatically spikes blood sugar. "
            f"Replace with buttermilk (chaas), nimbu pani (without sugar), or coconut water. "
            f"Even reducing by 2 drinks/week lowers HbA1c by ~0.3%."
        )

    # ─── Dietary — Refined Flour ──────────────────────────
    maida = input_data["refined_flour_meals_per_week"]
    if maida > T["max_refined_flour"]:
        recommendations.append(
            f"Eating {int(maida)} refined flour meals/week (naan, bread, biscuits) "
            f"causes rapid glucose spikes. Switch to whole wheat rotis, multigrain "
            f"bread, or besan (chickpea flour) alternatives for better glycemic control."
        )

    # ─── Family History ───────────────────────────────────
    if input_data["family_history"] == 1:
        recommendations.append(
            "With a family history of diabetes, your genetic risk is elevated. "
            "Get HbA1c tested every 6 months and a fasting glucose test annually. "
            "Early detection allows lifestyle intervention before medication is needed."
        )

    # ─── Smoking ──────────────────────────────────────────
    if input_data["smoking"] == 1:
        recommendations.append(
            "Smoking doubles diabetes risk by increasing insulin resistance and "
            "causing chronic inflammation. Consider nicotine replacement therapy or "
            "consult your doctor about cessation programs."
        )

    # ─── Alcohol ──────────────────────────────────────────
    if input_data["alcohol"] == 1:
        recommendations.append(
            "Regular alcohol disrupts glucose metabolism and liver function. "
            "Limit to 1-2 standard drinks on occasions. Avoid drinking on an empty stomach."
        )

    # ─── Ensure minimum recommendations ───────────────────
    if len(recommendations) < 3:
        recommendations.append(
            "Maintain a balanced diet with adequate protein (dal, paneer, eggs), "
            "fiber (vegetables, whole grains), and healthy fats (nuts, seeds). "
            "The traditional Indian diet, when balanced, is protective against diabetes."
        )

    # Cap at 5 most relevant recommendations
    return recommendations[:5]
