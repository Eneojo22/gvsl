"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./component/navbar2";
import { Footer } from "./component/footer";
import { LoaderThree } from "./component/uiforcomponent/loader";
import { CartProvider } from "./services/LeadwoodFunitures/cartContext";

export default function RootLayoutShell({
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
              <LoaderThree />
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
  );
}
