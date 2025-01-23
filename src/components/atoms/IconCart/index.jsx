import React from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const IconCart = () => {
  return (
    <div className="flex items-center">
      <Link to="/cart" className="flex items-center space-x-2">
        <FaCartShopping size={24} />
        <span className="bag-quantity bg-red-500 text-white rounded-full px-2 py-1 text-xs">
          3
        </span>
      </Link>
    </div>
  );
};

export default IconCart;
