// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import Button from "../../atoms/Button";
// import { useCart } from "../../../context/cartContext";
// import formatRupiah from "../../../utils/formatRupiah";

// const ProductDetail = () => {
//   const [product, setProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1); // State untuk quantity
//   const { updateQuantity } = useCart();

//   const { id } = useParams(); // Get the product ID from the URL params

//   useEffect(() => {
//     const getProductDetail = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASEURL}/product/${id}`
//         );
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };

//     getProductDetail();
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const handlePrevImage = () => {
//     setSelectedImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextImage = () => {
//     setSelectedImageIndex((prevIndex) =>
//       prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleAddToCart = async () => {
//     try {
//       const user_id = "1"; // Replace with actual user_id
//       let cart_id = localStorage.getItem("cart_id");
//       let activeCartResponse;

//       // Cek apakah `cart_id` valid
//       if (cart_id) {
//         try {
//           activeCartResponse = await axios.get(
//             `${import.meta.env.VITE_API_BASEURL}/cart/${cart_id}`
//           );
//           if (activeCartResponse.data.error) {
//             throw new Error("Cart in localStorage not found");
//           }
//         } catch (error) {
//           // Jika `cart_id` tidak valid, hapus dari localStorage
//           localStorage.removeItem("cart_id");
//           cart_id = null;
//         }
//       }

//       // Jika tidak ada `cart_id` yang valid, buat atau dapatkan keranjang aktif
//       if (!cart_id) {
//         activeCartResponse = await axios.get(
//           `${import.meta.env.VITE_API_BASEURL}/cart/${user_id}`
//         );

//         if (activeCartResponse.data.id) {
//           cart_id = activeCartResponse.data.id;
//           localStorage.setItem("cart_id", cart_id);
//         } else {
//           // Jika tidak ada keranjang aktif, buat keranjang baru
//           const createCartResponse = await axios.post(
//             `${import.meta.env.VITE_API_BASEURL}/cart/create-cart`,
//             { user_id }
//           );
//           cart_id = createCartResponse.data.id;
//           localStorage.setItem("cart_id", cart_id);
//         }
//       }

//       // Tambahkan item ke keranjang
//       const addItemResponse = await axios.post(
//         `${import.meta.env.VITE_API_BASEURL}/cart/${cart_id}/items`,
//         {
//           user_id: user_id,
//           product_id: product.id,
//           quantity,
//         }
//       );
//       // Update quantity in context if necessary
//       updateQuantity(id, quantity);

//       console.log("Item added to cart:", addItemResponse.data);
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   const handleIncrementQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const handleDecrementQuantity = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   return (
//     <div className="flex justify-center items-center p-4">
//       <div className="w-full md:max-w-screen-xl flex flex-col md:flex-row mx-auto">
//         {/* Left Column - Image Slider */}
//         <div className="md:w-full flex flex-col items-center">
//           <div className="flex items-center w-full">
//             <button className="mr-4" onClick={handlePrevImage}>
//               <FaChevronLeft size={24} />
//             </button>
//             <div className="border rounded-lg overflow-hidden w-full md:h-[551px]">
//               <img
//                 src={product.images[selectedImageIndex].image_url}
//                 alt="Selected"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <button className="ml-4" onClick={handleNextImage}>
//               <FaChevronRight size={24} />
//             </button>
//           </div>
//           <div className="flex space-x-2 mt-4 justify-center px-2">
//             {product.images.map((img, index) => (
//               <img
//                 key={img.id}
//                 src={img.image_url}
//                 alt={`Thumbnail ${index}`}
//                 onClick={() => setSelectedImageIndex(index)}
//                 className={`w-16 h-16 md:w-[94px] md:h-[100%] object-cover cursor-pointer border-2 ${
//                   selectedImageIndex === index
//                     ? "border-[#16697A]"
//                     : "border-gray-300"
//                 } rounded-lg`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right Column - Product Details */}
//         <div className="md:w-[421px] md:ml-[60px] mt-8 md:mt-0 flex flex-col justify-between">
//           <h1 className="text-xl font-medium mb-4">{product.name}</h1>
//           <div className="text-sm text-gray-500 line-through mb-2">
//             {formatRupiah(product.price)}
//           </div>
//           <div className="text-base mb-4">
//             <span className="bg-slate-200 px-1">
//               {formatRupiah(product.price * (1 - product.discount / 100))}
//             </span>
//           </div>
//           <div className=" mb-4">FREE DELIVERY SERVICES</div>
//           <div className="mb-4">
//             <h2 className="font-semibold mb-2">Product Details:</h2>
//             <p>{product.description}</p>
//           </div>
//           <div className="flex items-center mb-4 justify-between">
//             <span className="text-gray-700 flex">ATUR JUMLAH</span>
//             <div>
//               <button
//                 onClick={handleDecrementQuantity}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg"
//               >
//                 -
//               </button>
//               <span className="px-4 py-2 bg-white text-gray-700 border-t border-b">
//                 {quantity}
//               </span>
//               <button
//                 onClick={handleIncrementQuantity}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//           <Button
//             size="medium"
//             onClick={handleAddToCart}
//             classname={"md:w-[420px] mx-auto"}
//           >
//             Add to Cart
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import Button from "../../atoms/Button";
// import { useCart } from "../../../context/cartContext";
// import formatRupiah from "../../../utils/formatRupiah";

// const ProductDetail = () => {
//   const [product, setProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1); // State untuk quantity
//   const { updateQuantity } = useCart();

//   const { id } = useParams(); // Get the product ID from the URL params

//   useEffect(() => {
//     const getProductDetail = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASEURL}/product/${id}`
//         );
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };

//     getProductDetail();
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const handlePrevImage = () => {
//     setSelectedImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextImage = () => {
//     setSelectedImageIndex((prevIndex) =>
//       prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleAddToCart = async () => {
//     try {
//       const user_id = "1"; // Replace with actual user_id
//       let cart_id = localStorage.getItem("cart_id");
//       let activeCartResponse;

//       // Check if `cart_id` is valid
//       if (cart_id) {
//         try {
//           activeCartResponse = await axios.get(
//             `${import.meta.env.VITE_API_BASEURL}/cart/${user_id}`
//           );
//           if (activeCartResponse.data.error) {
//             throw new Error("Cart in localStorage not found");
//           }
//         } catch (error) {
//           // If `cart_id` is invalid, remove from localStorage
//           localStorage.removeItem("cart_id");
//           cart_id = null;
//         }
//       }

//       // If no valid `cart_id`, create or get the active cart
//       if (!cart_id) {
//         activeCartResponse = await axios.get(
//           `${import.meta.env.VITE_API_BASEURL}/cart/${user_id}`
//         );

//         if (activeCartResponse.data.id) {
//           cart_id = activeCartResponse.data.id;
//           localStorage.setItem("cart_id", cart_id);
//         } else {
//           // If no active cart, create a new cart
//           const createCartResponse = await axios.post(
//             `${import.meta.env.VITE_API_BASEURL}/cart/create-cart`,
//             { user_id }
//           );
//           cart_id = createCartResponse.data.id;
//           localStorage.setItem("cart_id", cart_id);
//         }
//       }

//       // Add item to the cart
//       const addItemResponse = await axios.post(
//         `${import.meta.env.VITE_API_BASEURL}/cart/${cart_id}/items`,
//         {
//           user_id: user_id,
//           product_id: product.id,
//           quantity,
//         }
//       );

//       // Update quantity in context if necessary
//       updateQuantity(id, quantity); // If needed, adjust based on your cart context logic

//       console.log("Item added to cart:", addItemResponse.data);
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   const handleIncrementQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const handleDecrementQuantity = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   return (
//     <div className="flex justify-center items-center p-4">
//       <div className="w-full md:max-w-screen-xl flex flex-col md:flex-row mx-auto">
//         {/* Left Column - Image Slider */}
//         <div className="md:w-full flex flex-col items-center">
//           <div className="flex items-center w-full">
//             <button className="mr-4" onClick={handlePrevImage}>
//               <FaChevronLeft size={24} />
//             </button>
//             <div className="border rounded-lg overflow-hidden w-full md:h-[551px]">
//               <img
//                 src={product.images[selectedImageIndex].image_url}
//                 alt="Selected"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <button className="ml-4" onClick={handleNextImage}>
//               <FaChevronRight size={24} />
//             </button>
//           </div>
//           <div className="flex space-x-2 mt-4 justify-center px-2">
//             {product.images.map((img, index) => (
//               <img
//                 key={img.id}
//                 src={img.image_url}
//                 alt={`Thumbnail ${index}`}
//                 onClick={() => setSelectedImageIndex(index)}
//                 className={`w-16 h-16 md:w-[94px] md:h-[100%] object-cover cursor-pointer border-2 ${
//                   selectedImageIndex === index
//                     ? "border-[#16697A]"
//                     : "border-gray-300"
//                 } rounded-lg`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right Column - Product Details */}
//         <div className="md:w-[421px] md:ml-[60px] mt-8 md:mt-0 flex flex-col justify-between">
//           <h1 className="text-xl font-medium mb-4">{product.name}</h1>
//           <div className="text-sm text-gray-500 line-through mb-2">
//             {formatRupiah(product.price)}
//           </div>
//           <div className="text-base mb-4">
//             <span className="bg-slate-200 px-1">
//               {formatRupiah(product.price * (1 - product.discount / 100))}
//             </span>
//           </div>
//           <div className=" mb-4">FREE DELIVERY SERVICES</div>
//           <div className="mb-4">
//             <h2 className="font-semibold mb-2">Product Details:</h2>
//             <p>{product.description}</p>
//           </div>
//           <div className="flex items-center mb-4 justify-between">
//             <span className="text-gray-700 flex">ATUR JUMLAH</span>
//             <div>
//               <button
//                 onClick={handleDecrementQuantity}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg"
//               >
//                 -
//               </button>
//               <span className="px-4 py-2 bg-white text-gray-700 border-t border-b">
//                 {quantity}
//               </span>
//               <button
//                 onClick={handleIncrementQuantity}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//           <Button
//             size="medium"
//             onClick={handleAddToCart}
//             classname={"md:w-[420px] mx-auto"}
//           >
//             Add to Cart
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../../atoms/Button";
import { useCart } from "../../../context/cartContext";
import formatRupiah from "../../../utils/formatRupiah";
import NotificationPopup from "../../molecules/Notification";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { addItemToCart, updateQuantity } = useCart();

  const { id } = useParams(); // Get the product ID from the URL params

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/product/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
  };

  const handleIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex justify-center items-center p-4">
      <NotificationPopup />
      <div className="w-full md:max-w-screen-xl flex flex-col md:flex-row mx-auto">
        {/* Left Column - Image Slider */}
        <div className="md:w-full flex flex-col items-center">
          <div className="flex items-center w-full">
            <button className="mr-4" onClick={handlePrevImage}>
              <FaChevronLeft size={24} />
            </button>
            <div className="border rounded-lg overflow-hidden w-full md:h-[551px]">
              <img
                src={product.images[selectedImageIndex].image_url}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="ml-4" onClick={handleNextImage}>
              <FaChevronRight size={24} />
            </button>
          </div>
          <div className="flex space-x-2 mt-4 justify-center px-2">
            {product.images.map((img, index) => (
              <img
                key={img.id}
                src={img.image_url}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16 h-16 md:w-[94px] md:h-[100%] object-cover cursor-pointer border-2 ${
                  selectedImageIndex === index
                    ? "border-[#16697A]"
                    : "border-gray-300"
                } rounded-lg`}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="md:w-[421px] md:ml-[60px] mt-8 md:mt-0 flex flex-col justify-between">
          <h1 className="text-xl font-medium mb-4">{product.name}</h1>
          <div className="text-sm text-gray-500 line-through mb-2">
            {formatRupiah(product.price)}
          </div>
          <div className="text-base mb-4">
            <span className="bg-slate-200 px-1">
              {formatRupiah(product.price * (1 - product.discount / 100))}
            </span>
          </div>
          <div className=" mb-4">FREE DELIVERY SERVICES</div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Product Details:</h2>
            <p>{product.description}</p>
          </div>
          <div className="flex items-center mb-4 justify-between">
            <span className="text-gray-700 flex">ATUR JUMLAH</span>
            <div>
              <button
                onClick={handleDecrementQuantity}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg"
              >
                -
              </button>
              <span className="px-4 py-2 bg-white text-gray-700 border-t border-b">
                {quantity}
              </span>
              <button
                onClick={handleIncrementQuantity}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>
          <Button
            size="medium"
            onClick={handleAddToCart}
            classname={"md:w-[420px] mx-auto"}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
