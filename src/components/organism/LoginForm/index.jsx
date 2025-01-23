import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import Button from "../../atoms/Button";
import InputForm from "../../atoms/Input/index";
import logo from "../../../assets/LogoSmartLiving.svg";

const MAX_LOGIN_ATTEMPTS = 8; // Set the maximum number of login attempts

const FormLogin = () => {
  const { handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const { login } = useAuth(); // Ambil fungsi login dari AuthContext
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0); // Track login attempts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        setError("Email dan password harus diisi.");
        return;
      }

      if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        setError(
          "Jumlah login gagal maksimal tercapai. Silakan coba lagi nanti."
        );
        return;
      }

      setLoading(true);

      // Panggil fungsi login dari context
      await login(formData.email, formData.password);

      setLoading(false);

      // Redirect setelah login berhasil
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
      setError("Email atau password tidak valid. Silakan coba lagi.");
      setLoading(false);
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
    }
  };

  const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts;

  const handleGoogleLogin = async () => {
    try {
      await handleGoogleSignIn();
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <form
      className="max-w-xl md:max-w-2xl mx-auto bg-white p-8"
      onSubmit={handleLogin}
    >
      <div className="flex justify-center">
        <img src={logo} alt="Login" className="md:w-[530px]" />
      </div>
      {loginAttempts >= 3 && (
        <p className="text-gray-500 text-xs">
          Sisa upaya login: {remainingAttempts}
        </p>
      )}
      <InputForm
        label="Email"
        htmlFor="email"
        type="text"
        name="email"
        id="email"
        placeholder="Masukkan Email Anda"
        required
        value={formData.email}
        onChange={handleInputChange}
      />
      <InputForm
        label="Password"
        htmlFor="password"
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        required
        value={formData.password}
        onChange={handleInputChange}
      />
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      <div className="pb-4">
        <a href="#" className="text-sm">
          Lupa kata sandi?
        </a>
      </div>
      <div className="mb-4 items-start pb-12">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-500" />
          <span className="ml-2 text-sm">Tetap masuk</span>
        </label>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          size="large"
          color="primary"
          classname={`hover:bg-[#27858b] focus:ring-4 md:w-[100%] w-[80%] focus:ring-[#16737a]`}
        >
          {loading ? "Masuk..." : "Masuk"}
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleGoogleLogin}
          classname="mt-4 md:w-[100%] w-[80%]"
          color="secondary"
          size="large"
        >
          Login Dengan Google
        </Button>
      </div>
      <div className="pt-14 flex justify-center">
        <p>
          {" "}
          Belum punya akun?{" "}
          <a href="/register" className="font-semibold">
            Daftar Sekarang
          </a>
        </p>
      </div>
    </form>
  );
};

export default FormLogin;
