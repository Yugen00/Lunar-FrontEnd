import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../utils/http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      validateToken(token);
    }
  },[])

  const validateToken = async (token) =>{
    const response = customAxios.get('/person/getItem/1');
    if((await response).status == 200){
        setIsAuthenticated(true);
        return;
    }
    //else call logout wh
    logout();
  }

  const login = (token,displayName) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem('DisplayName',displayName);    
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("DisplayName");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
