import './Login.css';
import { useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFailed, setLoginFailed] = useState(false);

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
        onFailure: () => {
          setLoginFailed(true);
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
        {loginFailed ? (
          <div>Emailadresse oder Passwort ist inkorrekt</div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
