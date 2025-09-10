import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Backend API का URL, जहाँ हमारा Node.js सर्वर चल रहा है
const API_URL = 'http://localhost:5000/api/auth';

// 1. Interfaces (आपके कोड से) - यह बताता है कि डेटा कैसा दिखेगा
interface User {
  name: string;
  email: string;
  role: 'tourist' | 'guide' | 'seller';
}

interface AuthContextType {
  user: User | null;
  token: string | null; // JWT टोकन को स्टोर करने के लिए जोड़ा गया
  login: (email: string, password: string, role: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Context बनाना
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// कस्टम हुक बनाना ताकि इसे आसानी से इस्तेमाल किया जा सके
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider Component जो पूरे ऐप को रैप करेगा
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true); // शुरू में true ताकि हम सेशन चेक कर सकें

  // यह useEffect ऐप लोड होने पर चलता है ताकि पुराने लॉगिन सेशन को जांचा जा सके
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // जांच पूरी हुई
  }, []);

  // API कॉल: साइनअप
  const signup = async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      setIsLoading(false);
      // अगर response status 201 (Created) है तो true लौटाएगा
      return response.ok;
    } catch (error) {
      console.error('Signup Error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // API कॉल: लॉगिन
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
        return false; // गलत पासवर्ड या ईमेल पर false लौटाएगा
      }

      const data = await response.json();

      // सफलतापूर्वक लॉगिन होने पर, टोकन और उपयोगकर्ता डेटा को localStorage और state में सहेजें
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

  // लॉगआउट फंक्शन
  const logout = () => {
    // localStorage और state दोनों से टोकन और उपयोगकर्ता डेटा हटा दें
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Context की वैल्यू जो पूरे ऐप में उपलब्ध होगी
  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* जब तक सेशन की जांच हो रही है, तब तक बच्चों को रेंडर न करें */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
