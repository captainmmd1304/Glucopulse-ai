import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { ProtocolPage } from './components/ProtocolPage';
import { ExplanationPage } from './components/ExplanationPage';

export default function App() {
  return (
    <Router>
      <div className="app-shell min-h-screen flex flex-col tech-grid">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/assessment" element={<ExplanationPage />} />
            <Route path="/validation" element={<ProtocolPage />} />
            <Route path="/insights" element={<ExplanationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
