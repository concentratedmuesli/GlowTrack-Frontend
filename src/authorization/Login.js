import styles from './Login.module.css';
import { useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import SEO from '../seo/SEO';

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
        // Das Ziel ist, postUserLogin in einer Saga auszuführen.
        // Wenn das login erfolgreich war, soll zum Dashboard navigiert werden.
        // In einer Saga kann man kein useAuth oder useNavigate aufrufen.
        // Also müssen diese Operationen hier weitergegeben werden.
        onSuccess: () => {
          login();
          navigate('/'); // Weiterleitung ins Dashboard
        },
        onFailure: () => {
          setLoginFailed(true);
        },
      },
    });
  }

  return (
    <>
      <SEO
        title="Login – GlowTrack, deine Gewichtsverlaufs‑App"
        description="Behalte dein Gewicht mühelos im Blick mit GlowTrack. Logg dich ein, um deinen Gewichtsverlauf zu sehen."
        name="GlowTrack"
        type="website"
      />
      <div className={styles.card}>
        <h1>Login</h1>
        <form className={styles.loginForm}>
          <label htmlFor="email" className={styles.label}>
            Emailadresse
          </label>
          <input
            id="email"
            data-testid="email"
            className={styles.input}
            ref={emailRef}
          />
          <label htmlFor="password" className="label">
            Passwort
          </label>
          <input
            id="password"
            data-testid="password"
            type="password"
            className={styles.input}
            ref={passwordRef}
          />
          <button className={styles.button} onClick={attemptLogin}>
            Login
          </button>
          {loginFailed ? (
            <div className={styles.errorMessage}>
              &#9888; Emailadresse oder Passwort ist inkorrekt
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </>
  );
}
