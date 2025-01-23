import React, { useState, useEffect } from "react";
import SkeletonLoader from "../../atoms/SkeletonLoader";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulasi loading selama 2 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-xs w-full bg-white shadow-md rounded-lg overflow-hidden mx-2 my-4">
      {loading ? (
        <SkeletonLoader width="w-full" height="h-48" />
      ) : (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
