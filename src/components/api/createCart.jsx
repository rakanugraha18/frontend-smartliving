import axios from "axios";

const user_id = localStorage.getItem("user_id");
const createCart = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASEURL}/cart/create-cart`,
      {
        user_id: user_id,
      }
    );
    const cart_id = response.data.cart.id;
    localStorage.setItem("cart_id", cart_id);

    console.log(cart_id);
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

export default createCart;

// import axios from "axios";

// const user_id = localStorage.getItem("user_id");

// const createCart = async () => {
//   try {
//     // Cek apakah sudah ada keranjang aktif untuk user ini
//     const existingCartResponse = await axios.get(
//       `${import.meta.env.VITE_API_BASEURL}/cart/${user_id}`
//     );

//     console.log("Existing cart response:", existingCartResponse.data);

//     if (
//       existingCartResponse.status === 200 &&
//       existingCartResponse.data &&
//       existingCartResponse.data.active
//     ) {
//       // Jika keranjang aktif ditemukan, simpan cart_id ke localStorage
//       const cart_id = existingCartResponse.data.active.id;
//       localStorage.setItem("cart_id", cart_id);

//       console.log("Existing cart found:", cart_id);
//       return existingCartResponse.data;
//     }

//     // Jika tidak ada keranjang aktif, buat keranjang baru
//     const createCartResponse = await axios.post(
//       `${import.meta.env.VITE_API_BASEURL}/cart/create-cart`,
//       { user_id }
//     );

//     console.log("Create cart response:", createCartResponse.data);

//     if (createCartResponse.data && createCartResponse.data.cart) {
//       const new_cart_id = createCartResponse.data.cart.id;
//       localStorage.setItem("cart_id", new_cart_id);

//       console.log("New cart created:", new_cart_id);
//       return createCartResponse.data;
//     } else {
//       console.error("Failed to create new cart. Response data is missing.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error creating or getting cart:", error);
//     throw error;
//   }
// };

// export default createCart;
