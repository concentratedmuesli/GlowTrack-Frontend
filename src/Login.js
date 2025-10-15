import './Login.css';
import { useRef } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { postUserLogin } from './API';
import { useDispatch } from 'react-redux';
import { setUsername } from './slice/usernameSlice';

export function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function attemptLogin(event) {
    event.preventDefault();
    postUserLogin(usernameRef.current.value, passwordRef.current.value).then(
      (loginData) => {
        login(loginData.username);
        dispatch(setUsername(loginData.username))
        navigate('/');
      }
    );
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form className="loginForm">
        <label className="label">Benutzername</label>
        <input className="input" ref={usernameRef} />
        <label className="label">Passwort</label>
        <input className="input" ref={passwordRef} />
        <button className="button" onClick={attemptLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
