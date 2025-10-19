import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { UeberUns } from './UeberUns';
import { Kontakt } from './Kontakt';
import { Login } from './Login';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { Logout } from './Logout';

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
        <NavLink to="/logout" className="navHeader">
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
    </BrowserRouter>
  );
}

export default App;
