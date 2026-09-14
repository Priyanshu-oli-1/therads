"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  password: string;
  emailVerified: boolean;
};

type SignInResult =
  | {
      success: true;
    }
  | {
      success: false;
      reason: "invalid" | "unverified";
    };

type AuthContextType = {
  isLoggedIn: boolean;
  user: AuthUser | null;

  signin: (email: string, password: string) => SignInResult;

  signup: (email: string, name: string, password: string) => boolean;

  verifyEmail: () => void;

  resetPassword: (email: string, password: string) => boolean;

  updateProfile: (name: string, email: string, phone: string) => boolean;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "threads-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<AuthUser | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  /*
    Load saved authentication information
    when the application starts.
  */
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

      if (!savedAuth) {
        return;
      }

      const authData = JSON.parse(savedAuth);

      if (authData.user) {
        setUser(authData.user);

        setIsLoggedIn(Boolean(authData.user.emailVerified));
      }
    } catch (error) {
      console.error("Failed to load auth:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /*
    Create a new account.
  */
  const signup = (email: string, name: string, password: string) => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

      if (savedAuth) {
        const authData = JSON.parse(savedAuth);

        if (authData.user?.email === email) {
          return false;
        }
      }

      const newUser: AuthUser = {
        id: Date.now().toString(),
        email,
        name,
        password,
        emailVerified: false,
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: newUser,
        }),
      );

      setUser(newUser);
      setIsLoggedIn(false);

      return true;
    } catch (error) {
      console.error("Failed to create account:", error);

      return false;
    }
  };

  /*
    Authenticate an existing user.
  */
  const signin = (email: string, password: string): SignInResult => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

      if (!savedAuth) {
        return {
          success: false,
          reason: "invalid",
        };
      }

      const authData = JSON.parse(savedAuth);

      const savedUser: AuthUser = authData.user;

      if (!savedUser) {
        return {
          success: false,
          reason: "invalid",
        };
      }

      if (savedUser.email !== email || savedUser.password !== password) {
        return {
          success: false,
          reason: "invalid",
        };
      }

      if (!savedUser.emailVerified) {
        setUser(savedUser);
        setIsLoggedIn(false);

        return {
          success: false,
          reason: "unverified",
        };
      }

      setUser(savedUser);
      setIsLoggedIn(true);

      return {
        success: true,
      };
    } catch (error) {
      console.error("Failed to sign in:", error);

      return {
        success: false,
        reason: "invalid",
      };
    }
  };

  /*
    Verify the current user's email.
  */
  const verifyEmail = () => {
    if (!user) {
      return;
    }

    const verifiedUser: AuthUser = {
      ...user,
      emailVerified: true,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: verifiedUser,
      }),
    );

    setUser(verifiedUser);
    setIsLoggedIn(true);
  };

  /*
    Update profile information.
  */
  const updateProfile = (name: string, email: string, phone: string) => {
    if (!user) {
      return false;
    }

    try {
      const updatedUser: AuthUser = {
        ...user,
        name,
        email,
        phone,
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: updatedUser,
        }),
      );

      setUser(updatedUser);

      return true;
    } catch (error) {
      console.error("Failed to update profile:", error);

      return false;
    }
  };

  /*
    Reset password.
  */
  const resetPassword = (email: string, password: string) => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

      if (!savedAuth) {
        return false;
      }

      const authData = JSON.parse(savedAuth);

      const savedUser: AuthUser = authData.user;

      if (!savedUser || savedUser.email !== email) {
        return false;
      }

      const updatedUser: AuthUser = {
        ...savedUser,
        password,
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: updatedUser,
        }),
      );

      setUser(updatedUser);

      return true;
    } catch (error) {
      console.error("Failed to reset password:", error);

      return false;
    }
  };

  /*
    Logout the current session.
  */
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem("threads-cart");
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    signin,
    signup,
    verifyEmail,
    resetPassword,
    updateProfile,
    logout,
  };

  if (!isLoaded) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
