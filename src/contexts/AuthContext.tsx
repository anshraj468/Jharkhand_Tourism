import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Step 1: User ke data ka structure define karein
interface User {
  name: string;
  email: string;
  role: 'tourist' | 'guide' | 'seller' | 'admin';
}

// Step 2: Context mein kya-kya hoga, uska structure define karein
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signup: (name: string, email: string, password: string, role: string, govtId?: string) => Promise<boolean>;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
}

// Backend API ka URL
const API_URL = 'http://localhost:5000/api/auth';

// Step 3: Context banayein
const AuthContext = createContext<AuthContextType | null>(null);

// Step 4: Ek custom hook banayein taaki context ko aasani se use kar sakein
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Step 5: AuthProvider component banayein jo saara logic sambhalega
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Jab app load ho, to check karein ki user pehle se logged in hai ya nahi
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Checking poori ho gayi
  }, []);

  // Signup function
  const signup = async (name: string, email: string, password: string, role: string, govtId?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/signup`, {
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

  // Login function
  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
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

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, isLoading, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
