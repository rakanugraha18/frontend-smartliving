import axios from "axios";

const saveUserToDatabase = async (userData) => {
  try {
    const response = await axios.post("http://yourapi.com/api/users", userData);
    console.log("User saved to the database:", response.data);
  } catch (error) {
    console.error("Error saving user to the database:", error);
  }
};

export default saveUserToDatabase;
