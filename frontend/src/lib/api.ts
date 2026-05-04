const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

interface ApiOptions {
  method?: string;
  body?: any;
  token?: string | null;
}

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: any;
}

async function request<T = any>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const json = await res.json();

  if (!res.ok) {
    const error = new Error(json.message || 'Something went wrong') as any;
    error.status = res.status;
    error.errors = json.errors;
    throw error;
  }

  return json;
}

// ─── Auth ────────────────────────────────────────────────
export const authApi = {
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    request('/auth/register', { method: 'POST', body: data }),

  login: (data: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: data }),

  getMe: (token: string) =>
    request('/auth/me', { token }),
};

// ─── Dashboard ───────────────────────────────────────────
export const dashboardApi = {
  getOverview: (token: string) =>
    request('/dashboard/overview', { token }),

  getRiskFactors: (token: string) =>
    request('/dashboard/risk-factors', { token }),
};

// ─── Clinical ────────────────────────────────────────────
export const clinicalApi = {
  getProtocol: (token: string) =>
    request('/clinical/protocol', { token }),

  getAdherence: (token: string) =>
    request('/clinical/adherence', { token }),

  exportReport: async (token: string) => {
    const res = await fetch(`${API_BASE}/clinical/report/export`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      throw new Error(`Failed to export report: ${res.statusText}`);
    }
    return await res.blob();
  },

  shareWithTeam: (token: string) =>
    request('/clinical/report/share', { method: 'POST', token }),
};

// ─── Predict ────────────────────────────────────────────
export const predictApi = {
  predictRisk: (token: string, data: any) =>
    request('/predict', { method: 'POST', body: data, token }),
};
