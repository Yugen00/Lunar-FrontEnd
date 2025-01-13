import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../utils/http";
import { showToast } from "../utils/ReactToast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Adding loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false); 
      navigate("/login");
      showToast("Login Required!!","info")
    } else {
      validateToken(token);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await customAxios.get("/person/getItem/1");
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        logout(); // Call logout only if the token is invalid
      }
    } catch (error) {
      showToast("Session Expired, Please login !!", 'warn');
      logout();
    } finally {
      setLoading(false); // Loading complete after validation attempt
    }
  };

  const login = (token, displayName) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("DisplayName", displayName);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("DisplayName");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
