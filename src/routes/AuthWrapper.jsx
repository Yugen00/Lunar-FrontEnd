import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LazyLoader from "../utils/LazyLoader";

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until loading is complete
  if (loading) {
    return <LazyLoader/>; 
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthWrapper;
