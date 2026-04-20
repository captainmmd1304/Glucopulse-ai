"""
GlucoPulse ML Engine — FastAPI Application Entry Point.

Startup sequence:
1. Configure logging
2. Load trained model artifacts
3. Mount API routes
4. Start uvicorn server

Usage:
    python app.py
    # or
    uvicorn app:app --host 0.0.0.0 --port 8000 --reload
"""

import logging
import sys
from contextlib import asynccontextmanager
from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import HOST, PORT, DEBUG, LOG_DIR
from model.loader import model_loader
from routes.predict import router as predict_router


# ─── Logging Configuration ────────────────────────────────
LOG_DIR.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(name)-24s | %(levelname)-5s | %(message)s",
    datefmt="%H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOG_DIR / "ml_engine.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("app")


# ─── Lifespan: load model on startup ──────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML artifacts on startup, cleanup on shutdown."""
    log.info("=" * 60)
    log.info("  GlucoPulse ML Engine starting...")
    log.info("=" * 60)

    try:
        model_loader.load()
    except FileNotFoundError as e:
        log.warning(f"⚠️  {e}")
        log.warning("Server will start but /predict will return 503 until model is trained.")

    yield

    log.info("Shutting down ML Engine...")
    model_loader.unload()


# ─── FastAPI App ──────────────────────────────────────────
app = FastAPI(
    title="GlucoPulse ML Engine",
    description=(
        "Production-ready diabetes risk prediction API for Indian population. "
        "Uses XGBoost with SHAP explainability and personalized recommendations."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Middleware ──────────────────────────────────────
# Allow your Express backend to call this engine
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Mount Routes ─────────────────────────────────────────
app.mount_prefix = ""
app.include_router(predict_router, tags=["Prediction"])


# ─── Root Endpoint ────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "engine": "GlucoPulse ML Engine",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "operational" if model_loader.is_loaded else "waiting_for_model",
    }


# ─── Run ──────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host=HOST,
        port=PORT,
        reload=DEBUG,
        log_level="info",
    )
