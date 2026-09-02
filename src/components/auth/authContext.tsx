"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  user: { id: string; email: string; name: string } | null;
  signin: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load auth state from localStorage
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("threads-auth");
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        setUser(authData.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to load auth:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const signin = (email: string, name: string) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(
      "threads-auth",
      JSON.stringify({ user: newUser })
    );
  };

  const signup = (email: string, name: string) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(
      "threads-auth",
      JSON.stringify({ user: newUser })
    );
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("threads-auth");
    localStorage.removeItem("threads-cart");
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    signin,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
