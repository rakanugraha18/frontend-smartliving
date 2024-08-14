import axios from "axios";

const API_BASEURL = import.meta.env.VITE_API_BASEURL;

export const getApiProduct = async () => {
  try {
    const response = await axios.get(`${API_BASEURL}/product`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // throw error to handle it in the component
  }
};

export const getAPiProductDetail = async (productId) => {
  try {
    const response = await axios.get(`${API_BASEURL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export default getApiProduct;
