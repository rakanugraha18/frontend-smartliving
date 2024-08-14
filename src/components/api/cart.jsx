import axios from "axios";

const API_BASEURL = import.meta.env.VITE_API_BASEURL;
const getApiCartItems = async (userId) => {
  try {
    const response = await axios.get(`${API_BASEURL}/cart/${userId}`);
    return response.data.cartItems; // Pastikan ini sesuai dengan struktur data yang dikembalikan API
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error; // Lempar error jika ingin ditangani lebih lanjut di komponen
  }
};

export default getApiCartItems;
