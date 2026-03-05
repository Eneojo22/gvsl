"use client";
import { useCart } from "../../cartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const { cartItems, clearCart } = useCart();
  console.log(cartItems)
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "", address:"" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/orders/create-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          customer_email: form.email,
          customer_address: form.address,
          customer_phone: form.phone,
          notes: form.note,
          cart: cartItems,
          total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
      });

      const data = await response.json();
if (!response.ok) {
  console.error("Backend error:", response.status, data);
  alert(data.error || JSON.stringify(data));
} 
else {
  console.log("Order created:", data);
  clearCart();
  router.push(
    `/services/LeadwoodsFuniture/leadwoods-funitures/order/order-success?orderId=${data.order.order_number}`
  );
}

    } catch (error) {
      console.error("Request failed:", error);
      alert("⚠️ Failed to connect to backend. Is Django running?");
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 text-black">
      {/* Left Section: Customer Details */}
      <div className="p-6 rounded-lg shadow-md">
        <p className="mt-4 mb-4 text-red-600">
          Enter your information then place your order so as for delivery and contacting you after making payment. Thanks.
        </p>
        <h2 className="text-xl font-bold mb-4">Customer Details</h2>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-2 border mb-3 rounded"/>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border mb-3 rounded"/>
        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full p-2 border mb-3 rounded"/>
                <input type="text" name="address" placeholder="Home Address" value={form.address} onChange={handleChange} className="w-full p-2 border mb-3 rounded"/>
        <textarea name="note" placeholder="Anything you want to add?" value={form.note} onChange={handleChange} className="w-full p-2 border mb-3 rounded"/>
      </div>

      {/* Right Section: Order Summary */}
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul className="mb-4">
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₦{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="font-bold">Total: ₦{total}</p>
        <p className="mt-2 text-sm text-red-600">
          ⚠️ Please pay via <b>Bank Transfer</b> using your order number as the reference.  
          Your goods won’t be cleared until payment is received.
        </p>
        <button
          onClick={handleOrder}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
