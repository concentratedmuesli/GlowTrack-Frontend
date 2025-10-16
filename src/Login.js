import './Login.css';
import { useRef } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function attemptLogin(event) {
    event.preventDefault();
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        // TODO: Explain why I did it like this.
        onSuccess: (loginData) => {
          login(loginData.username);
          navigate('/');
        },
      },
    });
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
