"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    fetch(`http://127.0.0.1:8000/orders/${orderId}/`)
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
  if (!order) return <p>Order not found.</p>;

  const total = order.total;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center mt-35 text-black">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Successful!
      </h1>

      <div className="mt-2 text-[#000]">
        Status: <b className="text-[#dd5500]">{order.status}</b>
      </div>

      <p className="text-lg mb-2">
        Thank you for your order, {order.customer_name}.
      </p>

      <p className="text-md text-gray-700">
        Your Order ID is: <b>{order.order_number}</b>
      </p>

      <div className="mt-6 w-full max-w-md text-left">
        <h2 className="text-xl font-bold mb-2">Items Bought:</h2>
        <ul>
          {order.cart.map((item: any, idx: number) => (
            <li key={idx} className="flex justify-between border-b py-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₦{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">Total: ₦{total}</p>
      </div>

      <p className="mt-4 text-gray-500">
        Please make your payment using the Order ID as the transfer reference.
        Once payment is confirmed, we’ll contact you to complete delivery.
      </p>

      <div className="text-2xl m-6">
        <ul>
          <li>Bank-Name: WemaBank</li>
          <li>Account-Number: 8278287187282</li>
          <li>Account-Name: G&V SUPPORT SERVICES LIMITED</li>
        </ul>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<p>Loading order success page...</p>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
