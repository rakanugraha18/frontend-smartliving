import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASEURL;

const loginUser = async (email, password) => {
  try {
    const resLogin = await axios.post(
      `${API_URL}/customers/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = resLogin.data.token;
    const user_id = resLogin.data.userId;
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user_id);

    return { token, user_id }; // Mengembalikan token dan user_id
  } catch (error) {
    console.error("Login failed", error.response?.data || error.message);
    throw error;
  }
};

export default loginUser;
