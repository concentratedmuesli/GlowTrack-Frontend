import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { UeberUns } from './UeberUns';
import { Kontakt } from './Kontakt';
import { Login } from './Login';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';

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
        <NavLink to="/login" className="navHeader">
          Login
        </NavLink>
      </nav>
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
          <Route
            path="/ueber-uns"
            element={
              <ProtectedRoute>
                <UeberUns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kontakt"
            element={
              <ProtectedRoute>
                <Kontakt />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
