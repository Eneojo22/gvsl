"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const CarOrderSuccess = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [car_order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    fetch(`http://127.0.0.1:8000/car-orders/${orderId}/`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (!car_order) return <p>Order not found.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center ">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>

      {/* ✅ Animated tick */}
      <motion.div
        className="flex items-center justify-center h-34 w-34 bg-white rounded-full shadow-md"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-16 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      <p className="text-lg mt-4 mb-2">
        Thank you for your order, <b>{car_order.customer_name}</b>.
      </p>
      <div className="text-md ">
        <p className="text-black"> Your Car ID is:</p>
        <p className="bg-orange-600 text-white   p-3 font-bold  rounded-3xl">{car_order.car_order_number}</p>
      </div>

      <div className="mt-6 w-full max-w-md text-left"></div>

      <p className="mt-4 text-gray-500 max-w-md">
        Please make your payment using the Order ID as the transfer reference.
        Once payment is confirmed, we’ll contact you to complete delivery.
      </p>

      <div className="text-lg m-6  p-4 rounded-lg  text-black">
        <ul className="text-left">
          <li>
            <b>Bank Name:</b> Wema Bank
          </li>
          <li>
            <b>Account Number:</b> 8278287187282
          </li>
          <li>
            <b>Account Name:</b> G&amp;V SUPPORT SERVICES LIMITED
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarOrderSuccess;
