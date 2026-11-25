import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const cached = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_user') : null;
        if (cached) {
          setUser(JSON.parse(cached));
        }
      } catch {}

      try {
        const data = await authService.getMe();
        if (data && data.user) {
          setUser(data.user);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('auth_user', JSON.stringify(data.user));
          }
        }
      } catch (err) {
        if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_token');
          }
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (emailOrUsername, password) => {
    const data = await authService.login(emailOrUsername, password);
    setUser(data.user);
    if (data.user && typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    if (data.user && typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
