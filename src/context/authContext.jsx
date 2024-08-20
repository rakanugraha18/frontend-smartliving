import React, { createContext, useState, useContext, useEffect } from "react";
import loginUser from "../components/api/loginUser";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();
const token = localStorage.getItem("token");

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
      const { token, user_id } = await loginUser(email, password);
      setIsAuthenticated(true);
      setUser({ email }); // Menyimpan informasi pengguna
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);

      createCart(user_id); // Membuat cart jika diperlukan
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Login failed", error.message);
      throw new Error("Login failed"); // Pastikan error ditangani dengan baik
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      const user = result.user;

      const [firstName, ...lastNameParts] = user.displayName.split(" ");
      const lastName = lastNameParts.join(" ");
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: user.email,
        phone_number: user.phoneNumber || "089977882288",
        // Tidak ada password karena Google sudah mengelola autentikasi
      };

      localStorage.setItem("token", token);
      const user_id = localStorage.getItem("user_id");

      await registerUser(userData);
      createCart(user_id);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error signing in with Google:", error);
      console.error("Kesalahan saat login dengan Google:", error);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/customers/login-with-google",
        userData
      );
      setIsAuthenticated(true);
      console.log("Pengguna terdaftar:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.userId);
      // Redirect setelah login berhasil
      navigate("/");
    } catch (error) {
      setIsAuthenticated(false);
      if (
        error.response &&
        error.response.data.error === "Email sudah terdaftar"
      ) {
        // Jika email sudah terdaftar, login
        await login(userData.email, ""); // Password kosong untuk login, jika diperlukan
        navigate("/");
      } else {
        console.error("Kesalahan saat mendaftarkan pengguna:", error);
      }
    }
  };

  const createCart = async (userId) => {
    try {
      let cartId = localStorage.getItem("id_cart");
      if (!cartId) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASEURL}/cart/create-cart`,
          { user_id: userId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        cartId = response.data.cart.id;
        localStorage.setItem("id_cart", cartId);
      }
    } catch (error) {
      console.error("Error creating cart:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("id_cart");
    localStorage.removeItem("order_id");
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
        handleGoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
