import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User ke data ka poora structure define karein
interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'tourist' | 'guide' | 'seller' | 'admin';
  // Naye optional fields jo profile update se aayenge
  isVerified?: boolean;
  qualifications?: string[];
  bankAccount?: {
    accountHolderName?: string;
    accountNumber?: string;
    ifscCode?: string;
  };
}

// Context mein kya-kya functions aur data hoga, uska structure
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signup: (name: string, email: string, password: string, role: string, govtId?: string) => Promise<boolean>;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => void; // User data ko refresh karne ke liye naya function
}

const API_URL = 'http://localhost:5000';
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Yeh function server se latest user data laayega
  const fetchUser = async () => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      try {
        const res = await fetch(`${API_URL}/api/profile/me`, {
          headers: { 'x-auth-token': currentToken }
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData)); // Local storage ko bhi update karein
        } else {
          // Agar token invalid ho gaya hai to logout kar dein
          logout();
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      }
    }
  };

  // Jab app load ho, to check karein ki user pehle se logged in hai ya nahi
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [token]);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      if (!response.ok) {
        setIsLoading(false);
        return false;
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login Error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };
  
  const signup = async (name: string, email: string, password: string, role: string, govtId?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role, govtId }),
        });
        setIsLoading(false);
        return response.ok;
    } catch (error) {
        console.error('Signup Error:', error);
        setIsLoading(false);
        return false;
    }
  };

  const value = { user, token, isLoading, signup, login, logout, fetchUser };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
