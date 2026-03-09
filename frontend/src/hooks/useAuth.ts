import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function useAuth() {
  const navigate = useNavigate();

  const getStoredUser = (): User | null => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState<User | null>(getStoredUser);

  const login = useCallback((token: string, userData: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    navigate('/dashboard');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const isAuthenticated = !!user && !!localStorage.getItem(TOKEN_KEY);

  return { user, login, logout, isAuthenticated };
}
