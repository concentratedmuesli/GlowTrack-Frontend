import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// TODO: see if i can remove the authprovider
// TODO: and use only redux to check if the user is logged in
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (username) => {
    setUser({ username });
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
