"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "./component/footer";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { LoaderThree } from "./component/uiforcomponent/loader";
import Navbar from "./component/navbar2";
import { CartProvider } from "./services/LeadwoodsFuniture/cartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const metadata: Metadata = {
  title: "G & V support services Limited",
  description: "travel with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [pathname]); 

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {/* ✅ CartProvider wraps EVERYTHING - never unmounts */}
        <CartProvider>
          <Navbar />

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="global-loader"
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-semibold text-gray-700"
                >
                  <LoaderThree/>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </CartProvider>
      </body>
    </html>
  );
}