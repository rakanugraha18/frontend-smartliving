import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(localStorage.getItem("id_cart"));
  const navigate = useNavigate();

  // Ambil userId dari localStorage jika belum ada di state
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch Cart Items
  const fetchCartItems = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASEURL}/cart/${userId}`
      );
      if (
        response.status === 200 &&
        Array.isArray(response.data.active?.cartItems)
      ) {
        setCartItems(response.data.active.cartItems);
        localStorage.setItem("id_cart", response.data.active.id);
      } else {
        setCartItems([]);
        console.warn("Unexpected response structure:", response);
      }
    } catch (error) {
      setError("Error fetching cart items: " + error.message);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

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
    if (!product || !product.id) {
      console.error("Product or product ID is missing.");
      return;
    }

    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.");
      }

      if (!cartId) {
        const createCartResponse = await axios.post(
          `${import.meta.env.VITE_API_BASEURL}/cart/create-cart`,
          {
            user_id: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartId(createCartResponse.data.cart.id);
        localStorage.setItem("id_cart", createCartResponse.data.cart.id);
      }

      const existingItem = cartItems.find(
        (item) => item.product_id === product.id
      );

      if (existingItem) {
        await axios.put(
          `${import.meta.env.VITE_API_BASEURL}/cart/items/${existingItem.id}`,
          {
            quantity: existingItem.quantity + quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        const addItemResponse = await axios.post(
          `${import.meta.env.VITE_API_BASEURL}/cart/${cartId}/items`,
          {
            product_id: product.id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newItem = {
          ...product,
          quantity,
          id: addItemResponse.data.id,
        };

        setCartItems((prevItems) => [...prevItems, newItem]);
      }

      setNotification(
        `${quantity} ${product.name} berhasil ditambahkan ke keranjang!`
      );

      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const deleteCartItem = async (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((id) => id !== itemId)
    );

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/cart/items/delete`,
        { item_ids: [itemId] }
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      setCartItems((prevItems) => [
        ...prevItems,
        cartItems.find((item) => item.id === itemId),
      ]);
    }
  };

  const deleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      console.log("No items selected for deletion.");
      return;
    }

    const updatedCartItems = cartItems.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setCartItems(updatedCartItems);
    setSelectedItems([]);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/cart/items/delete`,
        { item_ids: selectedItems }
      );
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  const checkoutItems = async () => {
    if (selectedItems.length === 0) {
      alert("Tidak ada item yang dipilih untuk checkout.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/cart/checkout/${userId}`,
        {
          itemsToCheckout: selectedItems,
        }
      );

      console.log("Checkout response:", response.data);

      const order_id = response.data.order.id;
      localStorage.setItem("order_id", order_id);

      const updatedCartItems = cartItems.filter(
        (item) => !selectedItems.includes(item.id)
      );
      setCartItems(updatedCartItems);

      setSelectedItems([]);
      navigate("/checkout");
    } catch (error) {
      console.error("Terjadi kesalahan saat checkout:", error.message);
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateQuantity,
        addItemToCart,
        deleteCartItem,
        deleteSelectedItems,
        checkoutItems,
        getTotalQuantity,
        notification,
        selectedItems,
        setSelectedItems,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
