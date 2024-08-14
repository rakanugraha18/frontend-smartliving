import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../../store/slice/cartSlice"; // Adjust the path as needed

const CartPopup = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const showPopup = useSelector((state) => state.cart.showPopup);

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-10 right-10 bg-white border shadow-lg w-[507px] h-[250px] p-4 z-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Item Added to Cart</h2>
      <div className="overflow-y-auto max-h-[150px] mb-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover mr-2"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-gray-600">Rp.{item.price.toLocaleString()}</p>
            </div>
            <span className="text-gray-800">Qty: {item.quantity}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => dispatch(closePopup())}
        className="w-full py-2 bg-blue-600 text-white rounded-lg mt-2 hover:bg-blue-700"
      >
        Lihat Keranjang Belanja
      </button>
    </div>
  );
};

export default CartPopup;
