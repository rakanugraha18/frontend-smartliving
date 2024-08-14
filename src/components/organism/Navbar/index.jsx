// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { GrFavorite, GrUser, GrCart, GrLocation } from "react-icons/gr";
// import SearchBox from "../../molecules/SearchBox";
// import { Link } from "react-router-dom";
// import smartliving from "../../../assets/Smartliving.svg";
// import { HiMenu } from "react-icons/hi";
// import { IoMdClose } from "react-icons/io";

// const categories = [
//   "LIVING",
//   "DINING",
//   "KITCHEN",
//   "BEDROOM",
//   "BATHROOM",
//   "LIGHTING",
//   "OFFICE",
//   "DECOR",
//   "OUTDOOR",
// ];

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     // Fetch cart data or get cart count from a global state (e.g., Redux or Context)
//     // Here we assume you fetch the cart count from an API or state management
//     const fetchCartCount = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/cart/1");
//         const cartItems = response.data.cartItems; // Adjust based on your API response structure
//         const totalQuantity = cartItems.reduce(
//           (acc, item) => acc + item.quantity,
//           0
//         );
//         setCartCount(totalQuantity); // Update cart count with total quantity
//         console.log("Cart count:", totalQuantity);
//       } catch (error) {
//         console.error("Error fetching cart count:", error);
//       }
//     };

//     fetchCartCount();
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div>
//       <nav className="w-full bg-white md:py-[15px] flex flex-col md:flex-row justify-between items-center z-50 transition-shadow duration-300">
//         <div className="container mx-auto flex items-center justify-between px-4">
//           <div className="flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="text-2xl md:hidden mr-4"
//               aria-label="Toggle Menu"
//             >
//               {isMenuOpen ? <IoMdClose /> : <HiMenu />}
//             </button>
//             <div className="mr-6">
//               <SearchBox />
//             </div>
//           </div>
//           <div className="flex items-center justify-center flex-1">
//             <Link to="/" className="text-xl font-bold">
//               <img
//                 src={smartliving}
//                 alt="SmartLiving"
//                 className="w-[210px] h-[57px]"
//               />
//             </Link>
//           </div>

//           <div className="flex items-center space-x-6">
//             <div className="text-center hidden md:block group">
//               <Link to="#">
//                 <GrLocation
//                   className="text-base mx-auto group-hover:text-[#167a69]"
//                   size={24}
//                 />
//                 <span className="text-[10px] hidden md:block pt-3 group-hover:text-[#167a69]">
//                   Location
//                 </span>
//               </Link>
//             </div>
//             <div className="text-center md:block group">
//               <Link to="/login">
//                 <GrUser
//                   className="text-base mx-auto group-hover:text-[#167a69]"
//                   size={24}
//                 />
//                 <span className="text-[10px] hidden md:block pt-3 group-hover:text-[#167a69]">
//                   Profile
//                 </span>
//               </Link>
//             </div>
//             <div className="text-center md:block relative group">
//               <Link to="/cart" className="relative">
//                 <GrCart
//                   className="text-base mx-auto hover:text-[#167a69] group-hover:text-[#167a69]"
//                   size={24}
//                 />
//                 <span className="text-[10px] hidden md:block pt-3 group-hover:text-[#167a69]">
//                   Cart
//                 </span>
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-[#167a69] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="bg-white md:py-[15px]">
//         <div className="hidden container mx-auto md:flex justify-between items-center self-stretch">
//           {categories.map((category, index) => (
//             <a
//               key={index}
//               href="#"
//               className="text-gray-700 hover:text-[#167a69] font-semibold uppercase mx-2 font-poppins"
//               style={{ fontSize: "16px" }}
//             >
//               {category}
//             </a>
//           ))}
//         </div>
//         <div className="flex justify-center">
//           <div className=" hidden md:flex pt-[30px] w-full border-b-[1px] border-black max-w-screen-2xl"></div>
//         </div>
//       </div>

//       <div
//         className={`fixed inset-0 bg-white z-40 transform ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out md:hidden`}
//       >
//         <div className="justify-between">
//           <div className="pt-4">
//             <Link to="/" className="text-xl font-bold">
//               <img
//                 src={smartliving}
//                 alt="SmartLiving"
//                 className="p-2 max-w-[210px] max-h-[57px]"
//               />
//             </Link>
//             <button
//               onClick={toggleMenu}
//               className="text-2xl absolute top-8 right-4"
//               aria-label="Close Menu"
//             >
//               <IoMdClose />
//             </button>
//           </div>
//           <div className="flex flex-col items-start px-4">
//             {categories.map((category, index) => (
//               <a
//                 key={index}
//                 href={`#${category.toLowerCase()}`}
//                 className="text-gray-700 hover:text-[#167a69] my-6 font-semibold uppercase mb-2"
//                 style={{ fontSize: "16px" }}
//               >
//                 {category}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useContext } from "react";
import { GrFavorite, GrUser, GrCart, GrLocation } from "react-icons/gr";
import SearchBox from "../../molecules/SearchBox";
import { Link } from "react-router-dom";
import smartliving from "../../../assets/Smartliving.svg";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useCart } from "../../../context/cartContext";

const categories = [
  "LIVING",
  "DINING",
  "KITCHEN",
  "BEDROOM",
  "BATHROOM",
  "LIGHTING",
  "OFFICE",
  "DECOR",
  "OUTDOOR",
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="w-full bg-white md:py-[15px] flex flex-col md:flex-row justify-between items-center z-50 transition-shadow duration-300">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-2xl md:hidden mr-4"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <IoMdClose /> : <HiMenu />}
            </button>
            <div className="mr-6">
              <SearchBox />
            </div>
          </div>
          <div className="flex items-center justify-center flex-1">
            <Link to="/" className="text-xl font-bold">
              <img
                src={smartliving}
                alt="SmartLiving"
                className="w-[210px] h-[57px]"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center hidden md:block group">
              <Link to="#">
                <GrLocation
                  className="text-base mx-auto group-hover:text-[#167a69]"
                  size={24}
                />
                <span className="text-[10px] hidden md:block pt-3 group-hover:text-[#167a69]">
                  Location
                </span>
              </Link>
            </div>
            <div className="text-center md:block group">
              <Link to="/login">
                <GrUser
                  className="text-base mx-auto group-hover:text-[#167a69]"
                  size={24}
                />
                <span className="text-[10px] hidden md:block pt-3 group-hover:text-[#167a69]">
                  Profile
                </span>
              </Link>
            </div>
            <div className="text-center md:block relative group">
              <Link to="/cart" className="relative">
                <GrCart
                  className="text-base mx-auto hover:text-[#167a69] group-hover:text-[#167a69]"
                  size={24}
                />
                <span className="text-[10px] hidden md:block pt-3 group-hover:text-[#167a69]">
                  Cart
                </span>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#167a69] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white md:py-[15px]">
        <div className="hidden container mx-auto md:flex justify-between items-center self-stretch">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-700 hover:text-[#167a69] font-semibold uppercase mx-2 font-poppins"
              style={{ fontSize: "16px" }}
            >
              {category}
            </a>
          ))}
        </div>
        <div className="flex justify-center">
          <div className=" hidden md:flex pt-[30px] w-full border-b-[1px] border-black max-w-screen-2xl"></div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="justify-between">
          <div className="pt-4">
            <Link to="/" className="text-xl font-bold">
              <img
                src={smartliving}
                alt="SmartLiving"
                className="p-2 max-w-[210px] max-h-[57px]"
              />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-2xl absolute top-8 right-4"
              aria-label="Close Menu"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex flex-col items-start px-4">
            {categories.map((category, index) => (
              <a
                key={index}
                href={`#${category.toLowerCase()}`}
                className="text-gray-700 hover:text-[#167a69] my-6 font-semibold uppercase mb-2"
                style={{ fontSize: "16px" }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
