import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

const auth = getAuth();

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Extract user information
    const [firstName, ...lastNameParts] = user.displayName.split(" ");
    const lastName = lastNameParts.join(" ");
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: user.email,
      phone_number: null, // or a default value if required
      password: generateRandomPassword(), // Generate a random password
    };

    // Send user data to your API to save it in the database
    await registerUser(userData);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // Generates a random 8-character string
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post("http://yourapi.com/api/users", userData);
    console.log("User registered:", response.data);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
