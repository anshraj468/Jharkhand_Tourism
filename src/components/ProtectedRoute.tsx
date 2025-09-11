import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole: 'tourist' | 'guide' | 'seller' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  // Step 1: Jab tak authentication check ho raha hai, intezaar karein aur spinner dikhayein
  // Yeh sabse zaroori kadam hai jo aapki login loop wali problem theek karega.
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Step 2: Jab loading poori ho jaaye, tab check karein ki user logged-in hai ya nahi
  if (!user) {
    // Agar user nahi hai, to use login page par bhejein
    return <Navigate to="/login" replace />;
  }

  // Step 3: Agar user logged-in hai, lekin uski role page ke liye sahi nahi hai,
  // to use uske *apne sahi dashboard* par bhejein.
  if (user.role !== requiredRole) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  // Step 4: Agar sab kuch theek hai, to page ko dikhayein
  return children;
};

export default ProtectedRoute;

