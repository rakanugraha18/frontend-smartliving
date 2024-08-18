import React, { createContext, useState, useContext, useEffect } from "react";
import loginUser from "../components/api/loginUser";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // You might want to fetch user info based on the token here
      // Example: fetchUserInfo(token).then(setUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const token = await loginUser(email, password);
      setIsAuthenticated(true);
      setUser({ email }); // Set user based on login response
      localStorage.setItem("token", token);
    } catch (error) {
      setIsAuthenticated(false);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("id_cart");
    navigate("/login");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
