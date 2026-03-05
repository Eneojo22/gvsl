"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "../product";
import { useCart } from "../cartContext";
import Link from "next/link";
export default function Page() {
  return (
    <div className="mt-36">
      <FunituresItemsDisplay />
    </div>
  );
}

function FunituresItemsDisplay() {
  const [query, setQuery] = useState("");
  const { cartItems, addToCart, increaseQty, decreaseQty, removeFromCart } =
    useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);


  return (
    <div className="px-4">
      {/* HEADER */}
      <div className="flex items-center justify-between md:max-w-6xl md:mx-auto mt-10 mb-10">
        <p className="text-3xl text-black">Our Collections</p>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
        />
      </div>

      {/* BODY */}
     <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
  {/* PRODUCT GRID */}
  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredProducts.map((product) => (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        className="shadow-md rounded-xl border-2 p-4 flex flex-col items-center bg-[#09031b]"
      >
        <div className="w-full h-40 bg-white relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="text-center mt-4">
          <h3 className="text-base font-semibold text-white">
            {product.name}
          </h3>
          <p className="text-white font-bold">₦{product.price}</p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="mt-3 px-4 py-2 bg-[#dd5500] text-white rounded-md hover:bg-orange-600 transition"
          >
            Add To Cart
          </button>
        </div>
      </motion.div>
    ))}
  </div>

  {/* CART PANEL */}
  <div className="w-full lg:w-80 bg-white shadow-lg rounded-xl p-4 h-fit lg:sticky lg:top-32 text-black">
    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

    {cartItems.length === 0 && (
      <p className="text-gray-400">No items yet</p>
    )}

    {cartItems.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between mb-4 border-b pb-2"
      >
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm">₦{item.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseQty(item.id)}
            className="px-2 bg-gray-200"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => increaseQty(item.id)}
            className="px-2 bg-gray-200"
          >
            +
          </button>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 ml-2"
          >
            ✕
          </button>
        </div>
      </div>
    ))}

    {/* TOTAL */}
    <div className="border-t pt-4 mt-4">
      <p className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₦{total.toLocaleString()}</span>
      </p>

      <Link href="/services/LeadwoodsFuniture/leadwoods-funitures/order" className="block w-full mt-4">
  <button
    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
  >
    Order Now
  </button>
</Link>
    </div>
  </div>
</div>
    </div>
  );
}

