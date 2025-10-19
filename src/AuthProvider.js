import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// TODO: see if i can remove the authprovider
// TODO: and use only redux to check if the user is logged in
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const storedUsername = localStorage.getItem('username');
  if (!user && storedUsername) {
    setUser({ storedUsername });
  }

  const login = (user) => {
    setUser({user});
    localStorage.setItem("username", user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
