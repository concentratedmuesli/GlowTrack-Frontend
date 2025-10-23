import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { removeUserInfo } from './slice/usernameSlice';

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    logout(); // Setzt AuthContext zurück
    navigate('/login'); // Navigiert zum Login für erneuerte Anmeldung
    dispatch(removeUserInfo()); // Leert Redux-Store
  }, [logout, navigate, dispatch]);
};
