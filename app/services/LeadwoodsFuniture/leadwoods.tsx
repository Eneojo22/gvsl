"use client";
import Image from "next/image";
import { useState } from "react";
import { products } from "./product";
import { motion } from "framer-motion";
import { useCart } from "./cartContext";
import { InfiniteMovingCard } from "./infinite";
import Link from "next/link";
import OrderPage from "./order/orderpage";

export default function Herowood() {
  
  const [query, setQuery] = useState("");

  const { cartItems, addToCart, increaseQty, decreaseQty, clearCart } = useCart();
//  console.log("Cart Items:", cartItems);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* HERO SECTION */}
      <section className="mt-40 relative h-200 flex flex-col justify-between">
        <Image
          src="/image/funitures.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <p className="text-sm uppercase tracking-widest text-white">New Arrival</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white my-4">
            Refresh Your Space
          </h1>
          <p className="text-white/90 mb-6">
            The latest drops from our Weekly Selection.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-[#dd5500] transition">
              Shop Now
            </button>
            <button className="px-6 py-3 rounded-full bg-[#dd5500] text-black font-medium hover:bg-gray-200 transition">
              5% Off
            </button>
          </div>
        </div>
        <InfiniteMovingCard/>
      </section>
      
      {/* SEARCH + TITLE */}
      <div className="flex items-center justify-between md:max-w-6xl md:mx-auto mt-10 mb-10">
        <p className="text-3xl text-black">Our Collections</p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
          />
          <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-700">
            Search
          </button>
        </div>
      </div>

      {/* PRODUCTS + CART */}
      <div className="flex max-w-6xl mx-auto gap-8">
        {/* PRODUCT GRID */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="shadow-md rounded-xl border-2 p-4 flex flex-col items-center bg-[#09031b]"
              >
                <div className="w-full h-40 bg-white relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-base font-semibold text-white">{product.name}</h3>
                  <p className="text-white font-bold">₦{product.price}</p>
                  <Button value="Order Now" handleBtnClick={() => addToCart(product)} />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-xl">No results found.</p>
          )}
        </div>

        {/* CART SECTION */}
        <div className="w-80 bg-white shadow-md rounded-xl p-4 text-black">
          <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="">Cart is empty</p>
          ) : (
           <ul className="space-y-3">
  {cartItems.map((item) => (
    <li
      key={item.id}
      className="flex justify-between items-center border-b pb-2"
    >
      <div>
        <span className="font-medium">{item.name}</span>
        {item.quantity > 1 && (
          <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-bold">₦{item.price * item.quantity}</span>
        <button
          onClick={() => decreaseQty(item.id)}
          className="px-2 bg-black rounded text-white"
        >
          –
        </button>
        <span>{item.quantity}</span> {/* 👈 show current qty */}
        <button
          onClick={() => increaseQty(item.id)}
          className="px-2 bg-black rounded text-white"
        >
          +
        </button>
      </div>
    </li>
  ))}
</ul>
          )}

          {cartItems.length > 0 && (
            // const total = 
            <div className="mt-4">
              <p className="text-lg font-bold mb-2">
                  Total: ₦{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
              </p>
              <button
                onClick={clearCart}
                className="w-full bg-black text-white py-2 rounded-md"
              >
                Clear Cart
              </button>
              <Link href="/services/LeadwoodsFuniture/order">
              <button className="w-full bg-[#dd5500] text-white py-2 mt-5 rounded-md">Order now </button></Link>
            </div>
          )}
        </div>
      </div>



      {/* <OrderPage/> */}
    </>
  );
}

interface ButtonProps {
  value: string;
  handleBtnClick: () => void;
}

function Button({ value, handleBtnClick }: ButtonProps) {
  return (
    <button
      className="mt-3 px-4 py-2 bg-[#dd5500] text-white rounded-md hover:bg-orange-600 transition"
      onClick={handleBtnClick}
    >
      {value}
    </button>
  );
}
