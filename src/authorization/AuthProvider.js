import { createContext, useContext, useState } from 'react';

// Setzt Provider für loggedIn state, login und logout
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // Es wird angenommen, dass die Userin eingeloggt ist,
  // wenn nicht wird sie ausgelogt wenn ihr nächstes Request
  // mit 401 beantwortet wird. 
  const [loggedIn, setLoggedIn] = useState(true);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
