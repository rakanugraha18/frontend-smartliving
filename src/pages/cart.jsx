import React, { useEffect, useState } from "react";
import getApiCartItems from "../components/api/cart";
import CartItem from "../components/molecules/CartItem";
import axios from "axios";
import Button from "../components/atoms/Button";
import { Link } from "react-router-dom";
import formatRupiah from "../utils/formatRupiah";

const CartPage = () => {
  const user_id = "1"; // Assuming you have a way to identify the user's ID
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getApiCartItems(user_id);
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData();
  }, [user_id]);

  useEffect(() => {
    // Calculate the total price of selected items
    const calculateTotalPrice = () => {
      const total = cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.quantity * item.productCart.price, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems, selectedItems]);

  const handleSelect = (id, isSelected) => {
    setSelectedItems(
      (prevSelectedItems) =>
        isSelected
          ? [...prevSelectedItems, id] // Add to selectedItems if selected
          : prevSelectedItems.filter((itemId) => itemId !== id) // Remove if deselected
    );
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      if (selectedItems.length === 0) {
        alert("No items selected for checkout.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/cart/checkout/${user_id}`,
        {
          item_ids: selectedItems,
        }
      );

      // Clear cart_id from localStorage
      localStorage.removeItem("cart_id");

      console.log("Checkout successful:", response.data);
      // Tambahkan logika untuk menampilkan konfirmasi, mengarahkan ke halaman lain, dll.
    } catch (error) {
      console.error("Error during checkout:", error);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Pastikan selectedItems berisi ID yang valid
      if (selectedItems.length === 0) {
        console.log("No items selected for deletion.");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/cart/items/delete`,
        {
          item_ids: selectedItems,
        }
      );

      // Update state after successful deletion
      setCartItems((prevItems) =>
        prevItems.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]); // Clear selected items
      // Clear cart_id from localStorage
      localStorage.removeItem("cart_id");
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allItemIds = cartItems.map((item) => item.id);
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="flex justify-between text-gray-700 font-semibold mb-2 ">
        <label className="flex items-center">
          <input type="checkbox" onChange={handleSelectAll} />{" "}
          <span className="px-8 my-2 text-center mx-auto">Select All</span>
        </label>

        <Link
          onClick={handleDelete}
          className=" text-red-500 px-4 py-2 rounded"
        >
          Delete Selected
        </Link>
      </div>
      <div className="hidden md:flex flex-col md:flex-row items-center justify-between border-b pb-2 mb-4">
        <span className="w-full md:w-2/4 text-left text-gray-700 font-semibold mb-2 md:mb-0">
          Product
        </span>
        <span className="w-full md:w-1/6 text-center text-gray-700 font-semibold mb-2 md:mb-0">
          Price
        </span>
        <span className="w-full md:w-1/6 text-center text-gray-700 font-semibold mb-2 md:mb-0">
          Quantity
        </span>
        <span className="w-full md:w-1/6 text-center text-gray-700 font-semibold mb-2 md:mb-0">
          Total
        </span>
      </div>
      {cartItems.map((item, index) => (
        <CartItem
          key={index}
          product={{
            id: item.id,
            image: item.productCart.image, // Assuming the first image is the thumbnail
            name: item.productCart.name,
            price: item.productCart.price,
            quantity: item.quantity,
          }}
          isSelected={selectedItems.includes(item.id)}
          onSelect={handleSelect}
        />
      ))}
      <div className="flex justify-end text-gray-700 font-semibold">
        <div className="justify-between flex w-full md:w-[28%]">
          <span>TOTAL KERANJANG BELANJA</span>
          <span>{formatRupiah(totalPrice)}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleCheckout}
          size="large"
          disabled={loading}
          classname={` ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Processing..." : "Checkout"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CartPage;
