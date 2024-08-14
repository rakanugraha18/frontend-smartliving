// import React, { useState } from "react";
// import axios from "axios";
// import Button from "../../atoms/Button";
// import formatRupiah from "../../../utils/formatRupiah";

// const CartItem = ({ product, onSelect, isSelected }) => {
//   const { image, name, price, id } = product;
//   const [quantity, setQuantity] = useState(product.quantity || 1);
//   const total = price * quantity;

//   const updateQuantity = async (newQuantity) => {
//     try {
//       // Panggil API untuk update quantity di backend
//       await axios.put(`${import.meta.env.VITE_API_BASEURL}/cart/items/${id}`, {
//         quantity: newQuantity,
//       });
//     } catch (error) {
//       console.error("Failed to update quantity:", error);
//     }
//   };

//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     updateQuantity(newQuantity);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       updateQuantity(newQuantity);
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     onSelect(id, e.target.checked);
//   };

//   return (
//     <div className="flex flex-col-2 md:flex-row items-center justify-between border-b py-4 px-2 md:px-4">
//       <input
//         type="checkbox"
//         checked={isSelected}
//         onChange={handleCheckboxChange}
//         className="mr-4"
//       />
//       <div className="flex items-center w-full md:w-2/4 mb-4 md:mb-0">
//         <img
//           src={image}
//           alt={name}
//           className="w-24 h-auto md:w-24 md:h-24 object-contain"
//         />
//         <span className="hidden md:flex ml-2 md:ml-4 text-left text-gray-700">
//           {name}
//         </span>
//       </div>
//       <div className="md:hidden w-full flex flex-col">
//         <span className="md:ml-4 text-left text-gray-700">{name}</span>
//         <span className="w-full md:w-1/6 text-left text-xs text-gray-700 mb-4 md:mb-0">
//           <span className="text-gray-700 font-bold justify-center text-xs">
//             Price:{" "}
//           </span>
//           {formatRupiah(price)}
//         </span>
//         <div className="w-full md:w-1/6 flex text-xs md:text-base items-center justify-left text-gray-700 mb-4 md:mb-0">
//           <span className="text-gray-700 font-bold text-xs pr-2">Qty: </span>
//           <button
//             onClick={handleDecrease}
//             className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
//           >
//             -
//           </button>
//           <span className="px-4">{quantity}</span>
//           <button
//             onClick={handleIncrease}
//             className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
//           >
//             +
//           </button>
//         </div>
//         <span className="w-full md:w-1/6 text-left text-gray-700 mb-4 md:mb-0 text-xs">
//           <span className="text-gray-700 font-bold text-xs">Total: </span>
//           {formatRupiah(total)}
//         </span>
//       </div>
//       <span className="hidden md:flex w-full md:w-1/6 text-center justify-center text-gray-700 mb-4 md:mb-0">
//         {formatRupiah(price)}
//       </span>
//       <div className="hidden md:flex w-full md:w-1/6 items-center justify-center text-gray-700 mb-4 md:mb-0">
//         <button
//           onClick={handleDecrease}
//           className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
//         >
//           -
//         </button>
//         <span className="px-4">{quantity}</span>
//         <button
//           onClick={handleIncrease}
//           className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
//         >
//           +
//         </button>
//       </div>
//       <span className="hidden md:flex w-full md:w-1/6 text-center justify-center text-gray-700 mb-4 md:mb-0">
//         {formatRupiah(total)}
//       </span>
//     </div>
//   );
// };

// export default CartItem;

import React, { useState } from "react";
import { useCart } from "../../../context/cartContext";
import formatRupiah from "../../../utils/formatRupiah";

const CartItem = ({ product, onSelect, isSelected }) => {
  const { id, image, name, price, quantity: initialQuantity } = product;
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const { updateQuantity } = useCart();
  const total = price * quantity;

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(id, newQuantity); // Pass both id and newQuantity
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(id, newQuantity); // Pass both id and newQuantity
    }
  };

  const handleCheckboxChange = (e) => {
    onSelect(id, e.target.checked);
  };

  return (
    <div className="flex flex-row md:flex-row items-center justify-between border-b py-4 px-2 md:px-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="mr-4"
      />
      <div className="flex items-center w-full md:w-2/4 mb-4 md:mb-0">
        <img
          src={image}
          alt={name}
          className="w-24 h-auto md:w-24 md:h-24 object-contain"
        />
        <span className="hidden md:flex ml-2 md:ml-4 text-left text-gray-700">
          {name}
        </span>
      </div>
      <div className="md:hidden w-full flex flex-col">
        <span className="md:ml-4 text-left text-gray-700">{name}</span>
        <span className="w-full md:w-1/6 text-left text-xs text-gray-700 mb-4 md:mb-0">
          <span className="text-gray-700 font-bold justify-center text-xs">
            Price:{" "}
          </span>
          {formatRupiah(price)}
        </span>
        <div className="w-full md:w-1/6 flex text-xs md:text-base items-center justify-left text-gray-700 mb-4 md:mb-0">
          <span className="text-gray-700 font-bold text-xs pr-2">Qty: </span>
          <button
            onClick={handleDecrease}
            className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <span className="w-full md:w-1/6 text-left text-gray-700 mb-4 md:mb-0 text-xs">
          <span className="text-gray-700 font-bold text-xs">Total: </span>
          {formatRupiah(total)}
        </span>
      </div>
      <span className="hidden md:flex w-full md:w-1/6 text-center justify-center text-gray-700 mb-4 md:mb-0">
        {formatRupiah(price)}
      </span>
      <div className="hidden md:flex w-full md:w-1/6 items-center justify-center text-gray-700 mb-4 md:mb-0">
        <button
          onClick={handleDecrease}
          className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>
      <span className="hidden md:flex w-full md:w-1/6 text-center justify-center text-gray-700 mb-4 md:mb-0">
        {formatRupiah(total)}
      </span>
    </div>
  );
};

export default CartItem;
