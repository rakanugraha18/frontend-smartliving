import React, { useEffect, useState } from "react";

const AddressList = ({ onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASEURL}/address/addresses/check`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.status === "ok") {
          setAddresses(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleSelect = (id) => {
    setSelectedAddressId(id);
    onSelectAddress(id); // Notify parent component or context
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const deleteResponse = await fetch(
          `${import.meta.env.VITE_API_BASEURL}/address/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete address");
        }

        const deleteData = await deleteResponse.json();

        if (deleteData.status === "ok") {
          window.location.reload();
        } else {
          setError(deleteData.message);
        }
      } catch (error) {
        setError(error.message || "Failed to delete address");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {addresses.length > 0 ? (
        <ul>
          {addresses.map((address) => (
            <li
              key={address.id}
              className={`p-4 border rounded mb-2 cursor-pointer relative ${
                selectedAddressId === address.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelect(address.id)}
            >
              <button
                onClick={() => {
                  handleDelete(address.id);
                }}
                className="absolute top-2 right-2 text-red-500"
              >
                &times;
              </button>
              <div className="flex flex-row">
                <div className="px-2">
                  <input
                    type="checkbox"
                    checked={selectedAddressId === address.id}
                    onChange={() => handleSelect(address.id)}
                    className="md:mr-5 checked:bg-[#16737a] checked:ring-[#16737a] md:ml-4 focus:ring-[#16697A]"
                  />
                </div>
                <div>
                  <p>Address Name: {address.address_name}</p>
                  <p>Full Address: {address.full_address}</p>
                  <p>City: {address.city}</p>
                  <p>Postal Code: {address.postal_code}</p>
                  <p>Phone Number: {address.phone_number}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No addresses found.</p>
      )}
    </div>
  );
};

export default AddressList;
