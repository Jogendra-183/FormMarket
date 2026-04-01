import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("farmMarketUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email, password, role) => {
    const mockUser = {
      id: Math.random().toString(36).substring(7),
      name: email.split("@")[0],
      email,
      role
    };
    setUser(mockUser);
    localStorage.setItem("farmMarketUser", JSON.stringify(mockUser));
  };
  const register = async (name, email, password, role) => {
    const mockUser = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      role
    };
    setUser(mockUser);
    localStorage.setItem("farmMarketUser", JSON.stringify(mockUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("farmMarketUser");
  };
  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {
  AuthProvider,
  useAuth
};
