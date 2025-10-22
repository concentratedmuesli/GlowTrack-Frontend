import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { Logout } from './Logout';
import { Loading } from './Loading.js';

const Dashboard = lazy((load) => import('./Dashboard.js'));
const UeberUns = lazy((load) => import('./UeberUns.js'));
const Kontakt = lazy((load) => import('./Kontakt.js'));
const Login = lazy((load) => import('./Login.js'));

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <NavLink to="/" className="logo navHeader">
          GlowTrack
        </NavLink>
        <NavLink to="/ueber-uns" className="navHeader">
          Über uns
        </NavLink>
        <NavLink to="/kontakt" className="navHeader">
          Kontakt
        </NavLink>
        <NavLink to="/logout" className="navHeader" aria-label="Ausloggen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#444444"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </NavLink>
      </nav>
      <main>
        <Suspense fallback={<Loading />}>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/ueber-uns" element={<UeberUns />} />
              <Route
                path="/kontakt"
                element={
                  <ProtectedRoute>
                    <Kontakt />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </AuthProvider>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

// TODO: check if the suspense is doing anything

export default App;
