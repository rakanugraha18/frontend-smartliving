import React from "react";
import CartItem from "../../molecules/CartItem";

const CartPage = () => {
  // Contoh data produk
  const cartItems = [
    {
      image: "https://via.placeholder.com/150",
      name: "Product 1",
      price: 49.99,
      quantity: 2,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Product 2",
      price: 29.99,
      quantity: 1,
    },
    // Tambahkan lebih banyak item sesuai kebutuhan
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <span className="w-24"></span> {/* Tempat untuk gambar */}
        <span className="w-1/4 text-left text-gray-700 font-semibold">
          Product
        </span>
        <span className="w-1/6 text-center text-gray-700 font-semibold">
          Price
        </span>
        <span className="w-1/6 text-center text-gray-700 font-semibold">
          Quantity
        </span>
        <span className="w-1/6 text-center text-gray-700 font-semibold">
          Total
        </span>
      </div>
      {cartItems.map((item, index) => (
        <CartItem key={index} product={item} />
      ))}
    </div>
  );
};

export default CartPage;
