import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import CartItem from "../components/molecules/CartItem";
import Button from "../components/atoms/Button";
import { Link, useLocation } from "react-router-dom";
import formatRupiah from "../utils/formatRupiah";

const CartPage = () => {
  const {
    cartItems,
    checkoutItems,
    selectedItems,
    setSelectedItems,
    deleteCartItem, //
    deleteSelectedItems,
    fetchCartItems,
    error,
  } = useCart();

  useEffect(() => {
    fetchCartItems(); // Memastikan data cart selalu di-fetch saat komponen dimount
  }, []);

  const handleSelect = (id, isSelected) => {
    setSelectedItems((prevSelectedItems) =>
      isSelected
        ? [...prevSelectedItems, id]
        : prevSelectedItems.filter((itemId) => itemId !== id)
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allItemIds = cartItems.map((item) => item.id);
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };

  // Hitung total harga setelah diskon untuk item yang dipilih
  const totalKeranjangBelanja = cartItems.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      const discountAmount = item.productCart.discount
        ? (item.productCart.price * item.productCart.discount) / 100
        : 0;
      const discountedPrice = item.productCart.price - discountAmount;
      return total + discountedPrice * item.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <div className="flex justify-center items-center bg-[#EBEEF3] h-16">
        <h1 className="text-2xl text-center font-semibold">
          KERANJANG BELANJA
        </h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center mt-4 text-gray-700 font-semibold">
          Tidak ada keranjang
        </div>
      ) : (
        <>
          <div className="flex justify-between text-gray-700 font-semibold mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedItems.length === cartItems.length}
              />
              <span className="px-8 my-2 text-center mx-auto">Select All</span>
            </label>

            <Link
              onClick={deleteSelectedItems} // Gunakan deleteSelectedItems dari context
              className="text-red-500 px-4 py-2 rounded"
            >
              HAPUS PRODUK TERPILIH
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
              Discount
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
                image: item.productCart?.image || "", // Use optional chaining
                name: item.productCart?.name || "Unknown", // Default values if undefined
                price: item.productCart?.price || 0,
                quantity: item.quantity || 0,
                discount: item.productCart?.discount || 0,
              }}
              isSelected={selectedItems.includes(item.id)}
              onSelect={handleSelect}
              onDelete={() => deleteCartItem(item.id)} // Gunakan deleteCartItem dari context
            />
          ))}
          <div className="flex justify-end text-gray-700 font-semibold">
            <div className="justify-between flex w-full md:w-[28%]">
              <span>TOTAL KERANJANG BELANJA</span>
              <span>{formatRupiah(totalKeranjangBelanja)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => checkoutItems()} size="large">
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
