import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar, Footer } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { ProtocolPage } from './components/ProtocolPage';
import { ExplanationPage } from './components/ExplanationPage';
import { PredictionPage } from './components/PredictionPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-shell min-h-screen flex flex-col tech-grid">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              } />
              <Route path="/assessment" element={
                <ProtectedRoute><ExplanationPage /></ProtectedRoute>
              } />
              <Route path="/validation" element={
                <ProtectedRoute><ProtocolPage /></ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute><ExplanationPage /></ProtectedRoute>
              } />
              <Route path="/predict" element={
                <ProtectedRoute><PredictionPage /></ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
