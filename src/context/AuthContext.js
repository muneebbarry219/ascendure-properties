import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('admin_email') || '');

  useEffect(() => {
    if (token) localStorage.setItem('admin_token', token); else localStorage.removeItem('admin_token');
    if (email) localStorage.setItem('admin_email', email); else localStorage.removeItem('admin_email');
  }, [token, email]);

  const login = async (emailInput, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput, password })
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    setToken(data.token);
    setEmail(emailInput);
    return true;
  };

  const logout = () => {
    setToken('');
    setEmail('');
  };

  const value = useMemo(() => ({ token, email, login, logout, isAuthenticated: !!token }), [token, email]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
