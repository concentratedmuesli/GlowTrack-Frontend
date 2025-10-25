import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { removeUserInfo } from '../slice/usernameSlice';

export const Logout = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      logout(); // Setzt AuthContext zurück
      dispatch(removeUserInfo()); // Leert Redux-Store
    }
    navigate('/login'); // Navigiert zum Login für erneuerte Anmeldung
  }, [loggedIn, logout, navigate, dispatch]);
};
