import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username || decoded.user || decoded.name || "User" });
      } catch {
        setUser(null);
      }
    } else {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    navigate("/products");
  };

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
