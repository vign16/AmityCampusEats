import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User as SelectUser, InsertUser } from "@shared/schema";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: Omit<SelectUser, "password"> | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<Omit<SelectUser, "password">, Error, LoginData>;
  registerMutation: UseMutationResult<Omit<SelectUser, "password">, Error, RegisterData>;
  logoutMutation: UseMutationResult<void, Error, void>;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  const { 
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser
  } = useQuery<Omit<SelectUser, "password"> | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user", {
          credentials: "include", // Include cookies for cross-origin requests
          headers: {
            "Cache-Control": "no-cache" // Prevent caching
          }
        });
        
        // Return null for unauthorized responses
        if (res.status === 401) {
          console.log("User not authenticated");
          return null;
        }
        
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const userData = await res.json();
        console.log("User data fetched:", userData);
        return userData;
      } catch (error) {
        console.error('Auth error:', error);
        return null;
      }
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include" // Important for cookies
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
      }
      
      return await res.json();
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      queryClient.setQueryData(["/api/user"], data);
      // Immediately refetch to ensure we have the latest user data
      refetchUser();
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.name}!`,
      });
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include" // Important for cookies
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Registration failed");
      }
      
      return await res.json();
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      queryClient.setQueryData(["/api/user"], data);
      // Immediately refetch to ensure we have the latest user data
      refetchUser();
      
      toast({
        title: "Registration successful",
        description: `Welcome to AmityCampusEats, ${data.name}!`,
      });
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Please try a different email address",
        variant: "destructive",
      });
    },
  });
  
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include" // Important for cookies
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Logout failed");
      }
    },
    onSuccess: () => {
      console.log("Logout successful");
      // Clear user data from the cache
      queryClient.setQueryData(["/api/user"], null);
      // Immediately refetch to ensure the user is really logged out
      refetchUser();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: (error: Error) => {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "There was a problem logging out",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading: isUserLoading || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
        error: userError || loginMutation.error || registerMutation.error || logoutMutation.error,
        loginMutation,
        registerMutation,
        logoutMutation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}