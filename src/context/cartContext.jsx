import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(""); // Notifikasi state
  const user_id = "1"; // Or dynamically fetch the user ID if necessary

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASEURL}/cart/${user_id}`
      );

      if (response.status === 200 && Array.isArray(response.data.cartItems)) {
        setCartItems(response.data.cartItems);
      } else {
        console.warn("Unexpected response structure:", response);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      setCartItems([]); // Ensure cartItems is set to an empty array on error
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASEURL}/cart/items/${id}`, {
        quantity: newQuantity,
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error.message);
    }
  };

  const addItemToCart = async (product, quantity) => {
    try {
      const cart_id = localStorage.getItem("cart_id");
      if (!cart_id) {
        const createCartResponse = await axios.post(
          `${import.meta.env.VITE_API_BASEURL}/cart/create-cart`,
          { user_id }
        );
        localStorage.setItem("cart_id", createCartResponse.data.id);
      }

      const addItemResponse = await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/cart/${cart_id}/items`,
        {
          user_id,
          product_id: product.id,
          quantity,
        }
      );

      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.product_id === product.id
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { ...product, quantity }];
      });

      // Set the notification message
      setNotification(
        `${quantity} ${product.name} Berhasil ditambahkan ke keranjang!`
      );

      // Clear the notification after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when component mounts
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateQuantity,
        addItemToCart,
        getTotalQuantity,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
