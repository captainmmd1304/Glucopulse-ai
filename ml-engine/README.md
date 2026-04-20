# GlucoPulse ML Engine

Production-ready diabetes risk prediction microservice for Indian population, powered by XGBoost with SHAP explainability.

## Architecture

```
ml-engine/
├── app.py                    # FastAPI entry point
├── train.py                  # Model training pipeline
├── config.py                 # Configuration & thresholds
├── requirements.txt          # Python dependencies
├── Dockerfile                # Docker container
├── model/
│   ├── loader.py             # Singleton model loader
│   └── trained/              # Saved model artifacts (auto-generated)
├── services/
│   ├── predictor.py          # XGBoost inference
│   ├── explainer.py          # SHAP explainability
│   └── recommender.py        # Personalized recommendations
├── routes/
│   └── predict.py            # API endpoints
├── utils/
│   ├── validators.py         # Pydantic input/output schemas
│   └── preprocessing.py      # Feature engineering pipeline
├── tests/
│   └── test_predict.py       # Pytest test suite
├── data/
│   └── sample_schema.json    # Input schema documentation
└── logs/                     # Runtime logs
```

## Quick Start

### 1. Create virtual environment

```bash
cd ml-engine
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Train the model

```bash
python train.py
```

This generates synthetic data based on Indian population epidemiology, trains an XGBoost classifier with SMOTE rebalancing and hyperparameter tuning, and saves artifacts to `model/trained/`.

### 4. Start the server

```bash
python app.py
```

Server starts at **http://localhost:8000**. API docs at **http://localhost:8000/docs**.

## API Usage

### POST /predict

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
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
    "alcohol": 1
  }'
```

### Response

```json
{
  "risk_probability": 72.3,
  "category": "High Risk",
  "confidence": 89.2,
  "shap_factors": [
    {"factor": "Sedentary-to-Active Ratio", "impact": "+18.4%"},
    {"factor": "Sleep Quality Deficit", "impact": "+12.1%"},
    {"factor": "Body Mass Index", "impact": "+9.7%"}
  ],
  "recommendations": [
    "Increase daily walking by 4,500 steps...",
    "Your BMI exceeds the Asian cutoff for overweight...",
    "Sleeping 5.5h/night significantly increases insulin resistance..."
  ]
}
```

## Integration with Express Backend

From your Node.js backend, call the ML engine:

```typescript
// In your backend service
const response = await fetch('http://localhost:8000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userHealthData),
});
const prediction = await response.json();
```

## Docker

```bash
docker build -t glucopulse-ml .
docker run -p 8000:8000 glucopulse-ml
```

The container auto-trains the model on first run if no saved artifacts exist.

## Running Tests

```bash
pytest tests/ -v
```

## Indian Population Calibration

This engine uses risk thresholds from:
- **ICMR-INDIAB Study** — diabetes prevalence data
- **WHO Asia-Pacific BMI Guidelines** — overweight at 23, obese at 27.5
- **ICMR Abdominal Obesity** — waist cutoffs: Male >90cm, Female >80cm
- **NFHS-5 Survey** — lifestyle and dietary pattern distributions

Feature engineering captures:
- Thin-fat phenotype (BMI × waist interaction)
- Dietary glycemic load from Indian food patterns
- Sedentary urban lifestyle metrics
- Stress × sleep cortisol interaction
