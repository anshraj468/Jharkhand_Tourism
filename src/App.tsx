// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import MainLayout from './components/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TouristDashboard from './pages/TouristDashboard';
import GuideDashboard from './pages/GuideDashboard';
import SellerDashboard from './pages/SellerDashboard';
import MapPage from './pages/MapPage';
import TransportPage from './pages/TransportPage';
import TripPlanner from './pages/TripPlanner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Routes with Navbar */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/transport" element={<TransportPage />} />
              <Route path="/tripplanner" element={<TripPlanner />} />
              <Route
                path="/dashboard/tourist"
                element={
                  <ProtectedRoute requiredRole="tourist">
                    <TouristDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/guide"
                element={
                  <ProtectedRoute requiredRole="guide">
                    <GuideDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/seller"
                element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Routes without Navbar (optional, for login/signup) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;