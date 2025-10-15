import './Login.css';
import { useContext, useRef, useState } from 'react';
import { useAuth } from './AuthProvider';

export function Login() {
  const usernameRef = useRef(null);
  const { login } = useAuth();

  function attemptLogin(event) {
    event.preventDefault();
    console.log(usernameRef.current.value);
    login(usernameRef.current);
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form className="loginForm">
        <label className="label">Benutzername</label>
        <input className="input" ref={usernameRef} />
        <label className="label">Passwort</label>
        <input className="input"/>
        <button className="button" onClick={attemptLogin}>Login</button>
      </form>
    </div>
  );
}
