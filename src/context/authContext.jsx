import React, { createContext, useState, useContext, useEffect } from "react";
import loginUser from "../components/api/loginUser";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Ambil informasi pengguna jika diperlukan
      // fetchUserInfo(token).then(setUser); // Contoh fungsi untuk mengambil data pengguna
      // Panggil checkOrder jika token ada
      const userId = localStorage.getItem("user_id");
      if (userId) {
        checkOrder(userId);
      }
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

      // Panggil checkOrder setelah token diset
      checkOrder(user_id);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Login failed", error.message);
      throw new Error("Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const [firstName, ...lastNameParts] = user.displayName.split(" ");
      const lastName = lastNameParts.join(" ");
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: user.email,
        phone_number: user.phoneNumber || "089977882288",
      };

      // Panggil registerUser dan createCart setelah Google Sign-In
      await registerUser(userData);
      const user_id = localStorage.getItem("user_id");
      createCart(user_id);
      checkOrder(user_id); // Panggil checkOrder setelah cart dibuat
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error signing in with Google:", error);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASEURL}customers/login-with-google`,
        userData
      );
      setIsAuthenticated(true);
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
        await login(userData.email, ""); // Password kosong untuk login
        navigate("/");
      } else {
        console.error("Error registering user:", error);
      }
    }
  };

  const createCart = async (userId) => {
    try {
      let cartId = localStorage.getItem("id_cart");
      const token = localStorage.getItem("token");

      if (!cartId && token) {
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

  const checkOrder = async (userId) => {
    try {
      if (!userId) {
        throw new Error("User ID tidak tersedia.");
      }

      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/order/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Cek apakah response.data adalah array
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Extract order IDs and statuses
          const ordersSummary = response.data.map((order) => ({
            id: order.id,
            status: order.status,
          }));

          // Simpan array yang berisi ID dan status pesanan ke localStorage
          localStorage.setItem("order_summary", JSON.stringify(ordersSummary));

          // Lakukan tindakan tambahan sesuai kebutuhan
        } else {
          console.log("Order tidak ditemukan untuk user:", userId);
        }
      } else {
        console.error("Token tidak tersedia.");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
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
        checkOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
