import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../atoms/Button";
import InputForm from "../../atoms/Input";

const AddressForm = ({
  selectedAddressId,
  onAddressDataChange,
  onNewAddress,
  onEnable,
}) => {
  const apiKey =
    "2cfd80e4e2928634a890259476e7fc7181615888611972711d13f953c7d858a9";
  const token = localStorage.getItem("token");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [formData, setFormData] = useState({
    address_name: "",
    province: "",
    city: "",
    subdistrict: "",
    villages: "",
    full_address: "",
    postal_code: "",
    phone_number: "",
  });
  const [selectedNames, setSelectedNames] = useState({
    provinceName: "",
    cityName: "",
    subdistrictName: "",
    villageName: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`,
          { method: "GET" }
        );
        const data = await response.json();
        setProvinces(data.value);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, [apiKey]);

  useEffect(() => {
    if (selectedAddressId) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedAddressId]);

  const getCities = async (selectedProvinceId) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${selectedProvinceId}`
      );
      setCities(response.data.value);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getSubdistricts = async (selectedCityId) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${selectedCityId}`
      );
      setSubdistricts(response.data.value);
    } catch (error) {
      console.error("Error fetching subdistricts:", error);
    }
  };

  const getVillages = async (selectedSubdistrictId) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kelurahan?api_key=${apiKey}&id_kecamatan=${selectedSubdistrictId}`
      );
      setVillages(response.data.value);
    } catch (error) {
      console.error("Error fetching villages:", error);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Apakah alamat sudah lengkap?");

    if (confirmation) {
      setIsLoading(true);
      setNotificationMessage(""); // Clear previous messages
      setIsDisabled(true); // Disable the button

      const userId = localStorage.getItem("user_id");

      const dataToSend = {
        userId,
        address_name: formData.address_name,
        province: selectedNames.provinceName,
        city: selectedNames.cityName,
        subdistrict: selectedNames.subdistrictName,
        villages: selectedNames.villageName,
        full_address: formData.full_address,
        postal_code: formData.postal_code,
        phone_number: formData.phone_number,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASEURL}/address/add-address`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(dataToSend),
          }
        );

        const result = await response.json();
        if (result.status === "ok") {
          // Optionally handle success
          window.location.reload(); // Reload the page
        } else {
          setNotificationMessage(result.message);
        }
      } catch (error) {
        setNotificationMessage("Failed to submit the form");
      } finally {
        setIsLoading(false);
        setIsDisabled(false);
      }
    } else {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    const selectedProvinceName =
      provinces.find((province) => province.id === selectedProvinceId)?.name ||
      "";
    setFormData((prevData) => ({
      ...prevData,
      province: selectedProvinceId,
      city: "",
    }));
    setSelectedNames((prevNames) => ({
      ...prevNames,
      provinceName: selectedProvinceName,
    }));
    getCities(selectedProvinceId);
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const selectedCityName =
      cities.find((city) => city.id === selectedCityId)?.name || "";
    setFormData((prevData) => ({
      ...prevData,
      city: selectedCityId,
      subdistrict: "",
    }));
    setSelectedNames((prevNames) => ({
      ...prevNames,
      cityName: selectedCityName,
    }));
    getSubdistricts(selectedCityId);
  };

  const handleSubdistrictChange = (e) => {
    const selectedSubdistrictId = e.target.value;
    const selectedSubdistrictName =
      subdistricts.find((sub) => sub.id === selectedSubdistrictId)?.name || "";
    setFormData((prevData) => ({
      ...prevData,
      subdistrict: selectedSubdistrictId,
      villages: "",
    }));
    setSelectedNames((prevNames) => ({
      ...prevNames,
      subdistrictName: selectedSubdistrictName,
    }));
    getVillages(selectedSubdistrictId);
  };

  const handleVillageChange = (e) => {
    const selectedVillageId = e.target.value;
    const selectedVillageName =
      villages.find((village) => village.id === selectedVillageId)?.name || "";
    setFormData((prevData) => ({
      ...prevData,
      village: selectedVillageId,
    }));
    setSelectedNames((prevNames) => ({
      ...prevNames,
      villageName: selectedVillageName,
    }));
  };

  const handleAddressChange = (e) => {
    const full_address = e.target.value;
    setFormData((prevData) => ({ ...prevData, full_address }));
  };

  const handleAddressNameChange = (e) => {
    const address_name = e.target.value;
    setFormData((prevData) => ({ ...prevData, address_name }));
  };

  const handlePhoneNumberChange = (e) => {
    const phone_number = e.target.value;
    setFormData((prevData) => ({ ...prevData, phone_number }));
  };

  const handlePostalCodeChange = (e) => {
    const postal_code = e.target.value;
    setFormData((prevData) => ({ ...prevData, postal_code }));
  };

  const handleCheckboxChange = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div className="p-4 bg-white w-full max-w-3xl text-sm">
      <div className="flex flex-row">
        <div className="mb-4 px-2">
          <input
            type="checkbox"
            id="enable_form"
            className="ml-4 checked:bg-[#16737a] checked:ring-[#16737a] md:mr-5 md:ml-4 focus:ring-[#16697A]"
            checked={!isDisabled}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="w-full max-w-3xl">
          <form>
            <div className="mb-4">
              <label htmlFor="address_name" className="block mb-2">
                Nama Alamat
              </label>
              <InputForm
                id="address_name"
                name="address_name"
                type="text"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.address_name}
                onChange={handleAddressNameChange}
                disabled={isDisabled}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="province" className="block mb-2">
                Provinsi
              </label>
              <select
                id="province"
                name="province"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.province}
                onChange={handleProvinceChange}
                disabled={isDisabled}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block mb-2">
                Kota
              </label>
              <select
                id="city"
                name="city"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.city}
                onChange={handleCityChange}
                disabled={isDisabled}
              >
                <option value="">Pilih Kota</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="subdistrict" className="block mb-2">
                Kecamatan
              </label>
              <select
                id="subdistrict"
                name="subdistrict"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.subdistrict}
                onChange={handleSubdistrictChange}
                disabled={isDisabled}
              >
                <option value="">Pilih Kecamatan</option>
                {subdistricts.map((subdistrict) => (
                  <option key={subdistrict.id} value={subdistrict.id}>
                    {subdistrict.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="villages" className="block mb-2">
                Desa
              </label>
              <select
                id="villages"
                name="villages"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.villages}
                onChange={handleVillageChange}
                disabled={isDisabled}
              >
                <option value="">Pilih Desa</option>
                {villages.map((village) => (
                  <option key={village.id} value={village.id}>
                    {village.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="full_address" className="block mb-2">
                Alamat Lengkap
              </label>
              <InputForm
                id="full_address"
                name="full_address"
                type="text"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.full_address}
                onChange={handleAddressChange}
                disabled={isDisabled}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="postal_code" className="block mb-2">
                Kode Pos
              </label>
              <InputForm
                id="postal_code"
                name="postal_code"
                type="text"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.postal_code}
                onChange={handlePostalCodeChange}
                disabled={isDisabled}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone_number" className="block mb-2">
                Nomor Telepon
              </label>
              <InputForm
                id="phone_number"
                name="phone_number"
                type="text"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDisabled ? "bg-gray-200" : ""
                }`}
                value={formData.phone_number}
                onChange={handlePhoneNumberChange}
                disabled={isDisabled}
              />
            </div>
            {/* Form fields */}
            <Button
              type="button"
              size="xlarge"
              onClick={submitForm}
              disabled={isDisabled}
              classname={` focus:ring-4 md:w-[100%] w-[80%] focus:ring-[#16737a]`}
            >
              {isLoading ? "Loading..." : "Tambahkan Alamat"}
            </Button>
            {notificationMessage && (
              <div className={`notification ${isLoading ? "loading" : "done"}`}>
                {notificationMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
