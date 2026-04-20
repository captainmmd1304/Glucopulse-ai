# ─── Stage 1: Builder ─────────────────────────────────────
FROM python:3.11-slim AS builder

WORKDIR /app

# Install system dependencies for XGBoost compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt


# ─── Stage 2: Runtime ─────────────────────────────────────
FROM python:3.11-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p model/trained logs

# Environment variables
ENV ML_HOST=0.0.0.0
ENV ML_PORT=8000
ENV ML_DEBUG=false
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

# Default command: train model (if not exists) then start server
CMD ["sh", "-c", "\
    if [ ! -f model/trained/xgb_diabetes_model.joblib ]; then \
        echo '🔧 Training model...' && python train.py; \
    fi && \
    echo '🚀 Starting ML Engine...' && \
    uvicorn app:app --host $ML_HOST --port $ML_PORT \
"]
