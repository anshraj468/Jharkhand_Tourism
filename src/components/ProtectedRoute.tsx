import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole: 'tourist' | 'guide' | 'seller' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  // Jab tak authentication check ho raha hai, kuch na dikhayein
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Ya ek accha sa spinner dikha sakte hain
  }

  // Agar user logged-in nahi hai, to use login page par bhejein
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user logged-in hai, lekin uski role sahi nahi hai, to use uske apne dashboard par bhejein
  if (user.role !== requiredRole) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  // Agar sab kuch theek hai, to page ko dikhayein
  return children;
};

export default ProtectedRoute;
