import { useAuth } from './AuthProvider';
import { useLocation, Navigate } from 'react-router-dom';

// Macht children nur für angemeldete Nutzer zugänglich
export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ rückkehrUrl: location.pathname }}
        replace
      />
    );
  }
  return children;
}
