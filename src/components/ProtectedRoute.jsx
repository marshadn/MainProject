// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"; // Use Navigate for React Router v6
import { auth } from "../firebase"; // Import Firebase authentication
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state as null (to handle loading state)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading while checking the auth state
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Return the children if authenticated
};

export default ProtectedRoute;
