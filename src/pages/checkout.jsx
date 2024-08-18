import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressForm from "../components/organism/AddressForm";
import Button from "../components/atoms/Button";
import AddressList from "../components/molecules/AddressList";
import { Navigate, useNavigate } from "react-router-dom";

const paymentMethods = {
  virtualAccount: [
    { id: 1, name: "BCA" },
    { id: 2, name: "Mandiri" },
    { id: 3, name: "BRI" },
    { id: 4, name: "BNI" },
  ],
  bank: [
    { id: 5, name: "BNI" },
    { id: 6, name: "BRI" },
    { id: 7, name: "Mandiri" },
    { id: 8, name: "BCA" },
  ],
};

const CheckoutPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressData, setAddressData] = useState({});
  const userId = localStorage.getItem("user_id");
  const orderId = localStorage.getItem("order_id");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (!userId || !orderId) {
          throw new Error("User ID atau Order ID tidak tersedia.");
        }

        const response = await axios.get(
          `http://localhost:3000/api/order/${userId}/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrderData(response.data.order);
        console.log(response.data.order);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [userId, orderId]);

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleAddressDataChange = (data) => {
    setAddressData(data);
  };

  const handleSubmit = async () => {
    if (!selectedAddressId || !paymentMethod || !selectedBank) {
      alert("Please select an address, payment method, and bank.");
      return;
      na;
    }

    // Tentukan paymentMethodId berdasarkan selectedBank dan paymentMethod
    let paymentMethodId = null;

    if (paymentMethod === "virtualAccount") {
      const bank = paymentMethods.virtualAccount.find(
        (b) => b.name === selectedBank
      );
      if (bank) {
        paymentMethodId = bank.id;
      } else {
        alert("Please select a valid bank.");
        return;
      }
    } else if (paymentMethod === "bank") {
      const bank = paymentMethods.bank.find((b) => b.name === selectedBank);
      if (bank) {
        paymentMethodId = bank.id;
      } else {
        alert("Please select a valid bank.");
        return;
      }
    }

    try {
      const requestData = {
        addressId: selectedAddressId,
        addressData: addressData,
        paymentMethodId: paymentMethodId, // Kirim ID bank yang sesuai
      };

      await axios.put(
        `http://localhost:3000/api/order/${orderId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order.");
    }

    navigate("/orderDetails");
  };

  if (!orderData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto">
      <div className="flex justify-center items-center bg-[#EBEEF3] h-[61px]">
        <h1 className="text-2xl text-center font-semibold">CHECKOUT DETAIL</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-12 max-w-screen-2xl mx-auto">
        {/* Left Column */}
        <div className="w-full md:w-1/2 pt-4">
          <div className="flex justify-center items-center bg-[#EBEEF3] h-[51px] mb-4">
            <h2 className="text-xl font-semibold">ALAMAT PENGIRIMAN</h2>
          </div>
          <AddressList onSelectAddress={handleAddressSelect} />
          <AddressForm
            selectedAddressId={selectedAddressId}
            onAddressDataChange={handleAddressDataChange} // Perbarui data alamat
          />
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 pt-4 px-4">
          <div className="flex justify-center items-center bg-[#EBEEF3] h-[51px] mb-4">
            <h2 className="text-xl font-semibold">PESANAN ANDA</h2>
          </div>
          <div className="flex justify-between font-semibold mb-4">
            <span>PRODUK</span>
            <span>SUBTOTAL</span>
          </div>
          {orderData.order_Items && orderData.order_Items.length > 0 ? (
            <div>
              {orderData.order_Items.map((item) => (
                <div key={item.id} className="mb-4 flex justify-between">
                  <div className="flex flex-row w-1/2">
                    <img
                      className="w-24 h-28 mx-4"
                      src={item.productOrder.image}
                      alt={item.productOrder.name}
                    />
                    <span className="flex items-center">
                      {item.productOrder.name}
                      <span className="flex items-center w-11 h-11 mx-2">
                        x{item.quantity}{" "}
                      </span>
                    </span>
                  </div>
                  <span>
                    {parseFloat(item.productOrder.price).toLocaleString(
                      "id-ID",
                      {
                        style: "currency",
                        currency: "IDR",
                      }
                    )}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-semibold mt-4 border-b-[1px] border-black py-2 my-4">
                <span>Subtotal:</span>

                <span>
                  {parseFloat(orderData.total_amount).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </div>
              <div className="flex justify-between font-semibold mt-4 border-b-[1px] border-black py-2 my-4">
                <span>Discount:</span>
                <span>
                  {parseFloat(orderData.discount).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </div>
              <div className="flex justify-between font-semibold mt-4 border-b-[1px] border-black py-2 my-4">
                <span>Ongkos Kirim:</span>
                <span>
                  {parseFloat("0").toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </div>
              <div className="flex justify-between font-semibold mt-4 border-b-[1px] border-black py-2 my-4">
                <span>Total:</span>
                <span>
                  {parseFloat(orderData.total_amount).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </div>
              {/* Payment Method */}
              <h2 className="text-xl font-semibold mt-6 mb-4">
                Metode Pembayaran
              </h2>
              <form>
                <div className="mb-4">
                  <label className="flex items-center pb-4 border-b border-black">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="virtualAccount"
                      checked={paymentMethod === "virtualAccount"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2 checked:bg-[#16737a] checked:ring-[#16737a] md:mr-5 md:ml-4 focus:ring-[#16697A]"
                    />
                    Virtual Account
                  </label>
                </div>
                {paymentMethod === "virtualAccount" && (
                  <div className="mb-4 pl-2">
                    {paymentMethods.virtualAccount.map((bank) => (
                      <label
                        key={bank.id}
                        className="flex items-center justify-between mb-2 "
                      >
                        <div className="flex items-center">
                          <img
                            src={`/src/assets/images/logoBank/${bank.name}.svg`}
                            alt={bank.name}
                            className="w-11 h-6 mr-2"
                          />
                          <span>{bank.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          name="bank"
                          value={bank.name}
                          checked={selectedBank === bank.name}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="form-radio text-[#16737a] checked:bg-[#16737a] checked:ring-[#16737a] md:mr-5 md:ml-4 focus:ring-[#16697A]"
                        />
                      </label>
                    ))}
                  </div>
                )}
                <div className="mb-4">
                  <label className="flex items-center pb-4 border-b border-black">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2 checked:bg-[#16737a] checked:ring-[#16737a] md:mr-5 md:ml-4 focus:ring-[#16697A]"
                    />
                    Transfer Bank
                  </label>
                </div>
                {paymentMethod === "bank" && (
                  <div className="mb-4 pl-2">
                    {paymentMethods.bank.map((bank) => (
                      <label
                        key={bank.id}
                        className="flex items-center justify-between mb-2"
                      >
                        <div className="flex items-center">
                          <img
                            src={`/src/assets/images/logoBank/${bank.name}.svg`}
                            alt={bank.name}
                            className="w-11 h-6  mr-2"
                          />
                          <span>{bank.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          name="bank"
                          value={bank.name}
                          checked={selectedBank === bank.name}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="form-radio text-[#16737a] checked:bg-[#16737a] checked:ring-[#16737a] md:mr-5 md:ml-4 focus:ring-[#16697A]"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </form>
              <Button
                onClick={handleSubmit}
                classname="bg-[#16737a] text-white mt-4 w-full"
              >
                Buat Pesanan
              </Button>
            </div>
          ) : (
            <p>No items in the order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
