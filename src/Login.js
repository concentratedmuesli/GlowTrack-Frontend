import './Login.css';
import { useContext, useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const usernameRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  function attemptLogin(event) {
    event.preventDefault();
    console.log(usernameRef.current.value);
    login(usernameRef.current);
    navigate('/');
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form className="loginForm">
        <label className="label">Benutzername</label>
        <input className="input" ref={usernameRef} />
        <label className="label">Passwort</label>
        <input className="input" />
        <button className="button" onClick={attemptLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
