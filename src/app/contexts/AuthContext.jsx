import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiConfig } from "../utils/api";

const AuthContext = createContext(void 0);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState(null);

  // Check connection status periodically
  useEffect(() => {
    const checkOnline = () => setIsOnline(apiConfig.isOnline);
    const interval = setInterval(checkOnline, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("farmMarketUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role) parsedUser.role = parsedUser.role.toLowerCase();
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("farmMarketUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password, role) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch(`${apiConfig.baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: role.toUpperCase() }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned an invalid response. Please try again.");
      }

      if (!response.ok) {
        const errorMessage = data.message || "Login failed. Please check your credentials.";
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      const realUser = data.data.user;
      if (realUser.role) realUser.role = realUser.role.toLowerCase();
      const token = data.data.token;

      const userWithToken = { ...realUser, token };
      setUser(userWithToken);
      localStorage.setItem("farmMarketUser", JSON.stringify(userWithToken));
      setError(null);
      return userWithToken;
    } catch (error) {
      if (error.message.includes('fetch') || error.message.includes('network')) {
        setError("Cannot connect to server. Please check your connection.");
        setIsOnline(false);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password, role) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch(`${apiConfig.baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: role.toUpperCase() }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned an invalid response. Please try again.");
      }

      if (!response.ok) {
        const errorMessage = data.message || "Registration failed. Please try again.";
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      const realUser = data.data.user;
      if (realUser.role) realUser.role = realUser.role.toLowerCase();
      const token = data.data.token;

      const userWithToken = { ...realUser, token };
      setUser(userWithToken);
      localStorage.setItem("farmMarketUser", JSON.stringify(userWithToken));
      setError(null);
      return userWithToken;
    } catch (error) {
      if (error.message.includes('fetch') || error.message.includes('network')) {
        setError("Cannot connect to server. Please check your connection.");
        setIsOnline(false);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem("farmMarketUser");
    localStorage.removeItem("farmMarketCart");
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      isOnline,
      error,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
