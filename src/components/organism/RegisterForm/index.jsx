import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import InputForm from "../../atoms/Input/index";
import { useState } from "react";
import registerUser from "../../api/registerUser";
import banner from "../../../assets/bannerRegister.svg";
import logoSmartliving from "../../../assets/LogoSmartLiving.svg";

const FormRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateFormData = () => {
    const newErrors = {};
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = `Field ${key} tidak boleh kosong`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrors({});

    if (!validateFormData()) {
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phoneNumber,
        formData.password
      );
      setLoading(false);

      if (response.status === 201) {
        navigate("/login");
      } else {
        setErrors({ server: "Gagal menyimpan data ke server" });
      }
    } catch (error) {
      console.error("Error selama pengiriman data:", error);
      setLoading(false);

      if (error.response) {
        console.error("Server error response:", error.response.data);
        setErrors({ server: error.response.data.error });
      } else if (error.request) {
        console.error("No response from server");
        setErrors({ server: "No response from server" });
      } else {
        console.error("Error:", error.message);
        setErrors({ server: error.message });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Banner */}
        <div className="hidden lg:block min-w-[256px] lg:min-w-[512px] h-[300px] lg:h-[983px]">
          <img
            src={banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white md:shadow-lg rounded-2xl w-full lg:w-auto lg:max-w-full lg:max-h-full min-w-[320px] lg:min-w-[837px] min-h-[983px] mx-4 lg:mx-[26px] p-4 lg:p-8 flex justify-center items-center relative">
          <form className="w-full px-4 lg:px-[132px]" onSubmit={handleRegister}>
            <div className="flex justify-center my-5">
              <img
                src={logoSmartliving}
                alt="logo-smartliving"
                className="md:hidden flex items-center justify-center "
              />
            </div>
            <div className="flex lg:absolute top-4 right-4 pt-2 pr-7 pb-2">
              <p>
                Already have an account?{" "}
                <a href="/login" className="font-semibold underline">
                  Sign In
                </a>
              </p>
            </div>
            <div className="justify-start mb-5">
              <h2 className="text-2xl font-bold">Welcome to SmartLiving</h2>
              <p>Please enter your details to create your account</p>
            </div>
            {errors.server && (
              <div className="text-xs text-red-500 mt-[-8px] mb-3">
                {errors.server}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InputForm
                  label="First Name"
                  htmlFor="firstName"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <div className="text-xs text-red-500 mt-[-8px] mb-3">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div>
                <InputForm
                  label="Last Name"
                  htmlFor="lastName"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <div className="text-xs text-red-500 mt-[-8px] mb-3">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
            <div>
              <InputForm
                label="Email"
                htmlFor="email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="text-xs text-red-500 mt-[-8px] mb-3">
                  {errors.email}
                </div>
              )}
            </div>
            <div>
              <InputForm
                label="Phone Number"
                htmlFor="phoneNumber"
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && (
                <div className="text-xs text-red-500 mt-[-8px] mb-3">
                  {errors.phoneNumber}
                </div>
              )}
            </div>
            <div>
              <InputForm
                label="Your Password"
                htmlFor="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="text-xs text-red-500 mt-[-8px] mb-3">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  className="form-checkbox text-[#16737a]"
                />
                <span className="ml-2 text-sm">
                  By checking the box, I agree to the terms of sale and privacy
                  policy
                </span>
              </label>
            </div>
            <div className="flex justify-center">
              <Button
                size="large"
                color="primary"
                type="submit"
                classname="hover:bg-[#27858b] md:w-[100%] w-[80%] focus:ring-4 focus:ring-[#16737a]"
              >
                {loading ? "Register loading..." : "Sign up account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
