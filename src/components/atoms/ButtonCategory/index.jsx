import React from "react";
import { Link } from "react-router-dom";

const IconButton = ({ icon, altText, label, link }) => {
  return (
    <div className="flex flex-col items-center font-poppins">
      <Link to={link} className="flex flex-col items-center group">
        <button className="w-24 h-24 bg-[#EBEEF3] flex items-center justify-center rounded-[30px] transition-colors duration-300 group-hover:bg-[#689DA9]">
          {icon && (
            <img
              src={icon}
              alt={altText}
              className="w-16 h-16 object-contain"
            />
          )}
        </button>
        {label && (
          <span className="mt-2 text-center font-semibold text-gray-700 text-base transition-colors duration-300 group-hover:text-[#689DA9]">
            {label}
          </span>
        )}
      </Link>
    </div>
  );
};

export default IconButton;
