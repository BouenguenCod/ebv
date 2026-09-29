import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('ebv_admin_token');
    const savedUser = localStorage.getItem('ebv_admin_user');
    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user", err);
        localStorage.removeItem('ebv_admin_token');
        localStorage.removeItem('ebv_admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Simulated JWT login for demonstration or API call connection
    if (email.trim().toLowerCase() === 'admin@eglisebaptistevitry.fr' && pass === 'admin123') {
      const mockUser: User = {
        id: 'user-admin-1',
        name: 'Administrateur EBV',
        email: email,
        role: 'admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_ebv_admin_token_2026'
      };
      setUser(mockUser);
      localStorage.setItem('ebv_admin_token', mockUser.token!);
      localStorage.setItem('ebv_admin_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ebv_admin_token');
    localStorage.removeItem('ebv_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
