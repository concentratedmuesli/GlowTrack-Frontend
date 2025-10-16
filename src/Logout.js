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
    logout();
    navigate('/login');
    dispatch(removeUserInfo());
  }, [logout, navigate, dispatch]);
};
