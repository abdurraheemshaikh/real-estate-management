import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/api.js';
import axios from 'axios';

type UserRole = 'customer' | 'builder' | 'agent' | 'admin';

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  price: string;
  bio: string;
  createdAt?: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, role: UserRole = 'customer') => {
    console.log('Logging in with:', { username, password, role });
    setIsLoading(true);

    try {
      const res = await api.get(`/search/Get_Profile/${username}`);

      if (res.status !== 200) {
        throw new Error('Login failed');
      }

      const data = res.data;

      const userData: User = {
        id: data.id,
        username: data.username,
        name: username.split('@')[0],
        email: data.email,
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        price: data.price?.toString() || '',
        bio: data.bio || '',
        role: role,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.detail || 'Something went wrong. Please try again.';
        console.error('Login error:', { status, message });
        throw new Error(message);
      } else {
        console.error('Unknown login error:', error);
        throw new Error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Optional helper if you just need the user
export const useUser = () => {
  const { user } = useAuth();
  return user;
};
