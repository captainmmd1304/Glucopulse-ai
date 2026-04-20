import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { predictApi } from '../lib/api';
import { Loader2, AlertCircle } from 'lucide-react';

export function PredictionPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<any>({
    age: '',
    gender: 'male',
    bmi: '',
    waist_cm: '',
    daily_steps: '',
    sleep_hours: '',
    sedentary_hours: '',
    stress_level: '',
    family_history: '0',
    sugary_drinks_per_week: '',
    refined_flour_meals_per_week: '',
    indian_thali_per_week: '',
    smoking: '0',
    alcohol: '0',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        bmi: Number(formData.bmi),
        waist_cm: Number(formData.waist_cm),
        daily_steps: Number(formData.daily_steps),
        sleep_hours: Number(formData.sleep_hours),
        sedentary_hours: Number(formData.sedentary_hours),
        stress_level: Number(formData.stress_level),
        family_history: Number(formData.family_history),
        sugary_drinks_per_week: Number(formData.sugary_drinks_per_week),
        refined_flour_meals_per_week: Number(formData.refined_flour_meals_per_week),
        indian_thali_per_week: Number(formData.indian_thali_per_week),
        smoking: Number(formData.smoking),
        alcohol: Number(formData.alcohol),
      };

      const res = await predictApi.predictRisk(token, payload);
      setResult(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to predict risk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 lg:px-10 py-10 lg:py-12 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 panel p-6 lg:p-8 rounded-3xl">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          Predict Diabetes Risk
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required min="18" max="90" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">BMI</label>
              <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Waist (cm)</label>
              <input type="number" name="waist_cm" value={formData.waist_cm} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Daily Steps</label>
              <input type="number" name="daily_steps" value={formData.daily_steps} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Sleep Hours</label>
              <input type="number" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Sedentary Hours</label>
              <input type="number" name="sedentary_hours" value={formData.sedentary_hours} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Stress Level (1-10)</label>
              <input type="number" name="stress_level" min="1" max="10" value={formData.stress_level} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Family History</label>
              <select name="family_history" value={formData.family_history} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Sugary Drinks/Week</label>
              <input type="number" name="sugary_drinks_per_week" value={formData.sugary_drinks_per_week} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Refined Flour Meals/Week</label>
              <input type="number" name="refined_flour_meals_per_week" value={formData.refined_flour_meals_per_week} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Indian Thali/Week</label>
              <input type="number" name="indian_thali_per_week" value={formData.indian_thali_per_week} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Smoking</label>
              <select name="smoking" value={formData.smoking} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface-variant">Alcohol</label>
              <select name="alcohol" value={formData.alcohol} onChange={handleChange} className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-2">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Run Prediction Model'}
          </button>
        </form>
      </div>

      <div className="flex-1">
        {error && (
          <div className="panel bg-red-500/10 border-red-500/30 p-6 rounded-3xl mb-6">
            <h3 className="text-red-500 font-semibold mb-2 flex items-center gap-2">
              <AlertCircle size={20} /> Error
            </h3>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="panel p-6 lg:p-8 rounded-3xl h-full">
            <h2 className="text-xl font-semibold mb-6">Prediction Results</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between panel-soft p-4 rounded-xl">
                <div>
                  <div className="text-sm text-on-surface-variant">Risk Category</div>
                  <div className="text-lg font-bold">{result.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-on-surface-variant">Probability</div>
                  <div className="text-3xl font-extrabold text-primary">{Number(result.risk_probability).toFixed(1)}%</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant mb-3">Key Factors</h3>
                <div className="space-y-3">
                  {result.shap_factors?.map((factor: any, i: number) => (
                    <div key={i} className="flex items-center justify-between bg-surface-container-low p-3 rounded-xl border border-surface-container-high">
                      <span className="capitalize">{factor.factor}</span>
                      <span className="font-medium text-secondary">{factor.impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant mb-3">Recommendations</h3>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  {result.recommendations?.map((rec: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary mt-1">•</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
