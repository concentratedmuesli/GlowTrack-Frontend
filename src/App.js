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
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/ueber-uns">Über uns</NavLink>
      <NavLink to="/kontakt">Kontakt</NavLink>
      <NavLink to="/login">Login</NavLink>
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
