import { useContext, useRef, useState } from 'react';
import { useAuth } from './AuthProvider';

export function Login() {
  const usernameRef = useRef();
  const { login } = useAuth();

  function attemptLogin(event) {
    event.preventDefault();
    console.log(usernameRef);
    login(usernameRef.current);
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Benutzername</label>
        <input ref={usernameRef} />
        <label>Passwort</label>
        <input />
        <button onClick={attemptLogin}>Login</button>
      </form>
    </div>
  );
}
