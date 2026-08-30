import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../config/apiClient";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await API.get("/user");
        return response;
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    await API.post("/auth/login", { email, password });
    refetch();
  };

  const logout = async () => {
    await API.get("/auth/logout");
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        refetch,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
