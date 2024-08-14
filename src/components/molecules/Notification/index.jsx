import React from "react";
import { useCart } from "../../../context/cartContext";

const NotificationPopup = () => {
  const { notification } = useCart();

  if (!notification) return null; // Return null if there's no notification to show

  return (
    <div className="fixed top-40 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300">
      {notification}
    </div>
  );
};

export default NotificationPopup;
