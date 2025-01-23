import React, { useEffect, useState } from "react";
import axios from "axios";
import formatRupiah from "../utils/formatRupiah";
import Button from "../components/atoms/Button";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil user_id, order_id, dan token dari localStorage
  const userId = localStorage.getItem("user_id");
  const orderId = localStorage.getItem("order_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !orderId || !token) {
      setError("User ID, Order ID, or Token not found.");
      setIsLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/order/${userId}/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data.order);
        console.log(response.data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId, orderId, token]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div className="max-h-screen max-w-screen-2xl mx-auto">
      <div className="flex justify-center items-center bg-[#EBEEF3] h-[61px]">
        <h1 className="text-2xl font-bold py-[15px] ">PESANAN ANDA</h1>
      </div>
      <div className="container mx-auto p-4 max-w-[588px]">
        <div className="py-[15px]  flex justify-between border-b border-black border-1 mb-[15px]">
          <h2 className="text-sm font-semibold">Status</h2>
          <p className="">{order.status}</p>
        </div>
        <div className="flex justify-between py-[15px] border-b border-black border-1 mb-[15px]">
          <p className="text-sm">Nomor Pesanan: </p>
          <p>#18082024{order.id}</p>
        </div>

        <div className="py-[15px] border-b border-black border-1 mb-[15px]">
          <div className="py-[15px] border-b border-black border-1 mb-[15px] flex justify-between">
            <h2 className="text-sm font-semibold">Product </h2>
            <p>Jumlah tagihan</p>
          </div>
          {order.order_Items.map((item) => (
            <div key={item.id} className="py-[15px]  flex justify-between">
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
                {formatRupiah(item.productOrder.price - order.discount)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-[15px] border-b border-black border-1 mb-[15px]">
          <h2>Total Tagihan</h2>
          <p>{formatRupiah(order.total_amount)}</p>
        </div>

        <div className="py-[15px] border-b border-black border-1 mb-[15px] ">
          <h2 className="text-sm font-semibold">
            Pembayaran {order.paymentMethod.type}
          </h2>
          <div className="max-w-[247px]">
            <p>
              {order.paymentMethod.type} {order.paymentMethod.selectedBank} a/n
              Smart Living {order.paymentMethod.account_number}
            </p>
          </div>
        </div>

        <div className="py-[15px] border-b border-black border-1 mb-[15px]">
          <h2 className="text-sm font-semibold">Alamat Pengiriman</h2>
          <p>
            {order.user_order.first_name} {order.user_order.lash_name}
          </p>
          <p>{order.user_order.phone_number}</p>
          <p className="max-w-[588px]">
            {order.address.full_address} {order.address.villages}{" "}
            {order.address.subdistrict} {order.address.city}{" "}
            {order.address.province} {order.address.postal_code}{" "}
          </p>
        </div>

        <div className="py-[15px] ">
          <Button
            onClick={() => alert("Upload Payment Proof")}
            classname="w-full text-white px-4 py-2 rounded"
          >
            Upload Bukti Pembayaran
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
