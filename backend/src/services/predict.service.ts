import prisma from '../config/db';

export const predictRisk = async (userId: string, data: any) => {
  const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://127.0.0.1:8000';
  
  const response = await fetch(`${ML_ENGINE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `ML Engine responded with status: ${response.status}`);
  }

  const result = await response.json();

  // Save the result to PostgreSQL securely
  await prisma.predictionResult.create({
    data: {
      userId,
      riskProbability: result.risk_probability,
      category: result.category,
      confidence: result.confidence,
      shapFactors: result.shap_factors,
      recommendations: result.recommendations,
      inputs: data,
    }
  });

  return result;
};
