"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { setupAuthInterceptors } from "@/config/auth-interceptors";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const cleanupInterceptorsRef = useRef<(() => void) | undefined>(undefined);

  // Initialize auth from storage on mount
  const initialize = useCallback(async () => {
    try {
      setIsInitializing(true);
      
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUserState(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      // Clear corrupted data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsInitializing(false);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(
    (newUser: User, newToken: string) => {
      setUserState(newUser);
      setToken(newToken);

      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUserState(null);
    setToken(null);

    // Clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  // Setup axios interceptors
  useEffect(() => {
    if (isInitializing) return;

    const getToken = () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("token");
      }
      return null;
    };

    const handleLogout = () => {
      logout();
    };

    // Setup interceptors
    cleanupInterceptorsRef.current = setupAuthInterceptors(
      getToken,
      handleLogout
    );

    // Cleanup on unmount
    return () => {
      if (cleanupInterceptorsRef.current) {
        cleanupInterceptorsRef.current();
      }
    };
  }, [isInitializing, logout]);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser && typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    isInitializing,
    login,
    logout,
    setUser,
    initialize,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use auth context
 * @throws Error if used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
