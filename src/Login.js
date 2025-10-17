import './Login.css';
import { useRef } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function attemptLogin(event) {
    event.preventDefault();
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: {
        email: emailRef.current.value,
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
        <label className="label">Emailadresse</label>
        <input className="input" ref={emailRef} />
        <label className="label">Passwort</label>
        <input type="password" className="input" ref={passwordRef} />
        <button className="button" onClick={attemptLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
