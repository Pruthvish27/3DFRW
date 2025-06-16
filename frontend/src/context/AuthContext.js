import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser()); // Get initial user from localStorage
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
      setUser(authService.getCurrentUser());
      setIsAuthReady(true); // Set auth as ready on mount
  }, []);

  const login = async (userData) => {
    const user = await authService.login(userData);
    setUser(user);
  };

  const register = async (userData) => {
    const user = await authService.register(userData);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const contextValue = {
    user,
    login,
    register,
    logout,
    isAuthReady
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isAuthReady ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};