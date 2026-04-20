"""
Model Loader — singleton pattern for loading trained artifacts.

Loads model and preprocessing pipeline once on startup,
then serves them for all prediction requests.
"""

import logging
import joblib
from typing import Optional

from config import MODEL_PATH, PIPELINE_PATH

log = logging.getLogger("model.loader")


class ModelLoader:
    """Singleton loader for the trained ML artifacts.
    
    Loads on first access, then caches in memory for fast inference.
    Thread-safe for FastAPI async workers.
    """

    _instance: Optional["ModelLoader"] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._loaded = False
        return cls._instance

    def load(self):
        """Load all trained artifacts from disk."""
        if self._loaded:
            return

        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Trained model not found at {MODEL_PATH}. "
                "Run `python train.py` first to train the model."
            )

        log.info("Loading model artifacts...")

        self.model = joblib.load(MODEL_PATH)
        log.info(f"  [OK] Model loaded ({type(self.model).__name__})")

        pipeline_artifact = joblib.load(PIPELINE_PATH)
        self.preprocessor = pipeline_artifact["preprocessor"]
        self.engineered_scaler = pipeline_artifact["engineered_scaler"]
        self.engineered_features = pipeline_artifact["engineered_features"]
        log.info("  [OK] Preprocessing pipeline loaded")

        self._loaded = True
        log.info("[READY] All artifacts ready for inference.")

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    def unload(self):
        """Release artifacts from memory."""
        self.model = None
        self.preprocessor = None
        self.engineered_scaler = None
        self._loaded = False


# Global singleton instance
model_loader = ModelLoader()
