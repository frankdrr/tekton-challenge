import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('fakeToken'));

  const login = async (email: string, pass: string) => {
    console.log(`Attempting login with ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        pass
      })
    });
    if (!res.ok) throw new Error('Error in login fake');

    const data = await res.json();
    console.log("Login response:", data);

    const fakeToken = 'fake-jwt-token-' + Date.now();

    sessionStorage.setItem('fakeToken', fakeToken);
    setToken(fakeToken);
  };

  const logout = () => {
    sessionStorage.removeItem('fakeToken');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
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
