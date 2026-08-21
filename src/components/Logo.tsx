import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  src?: string;
  alt?: string;
}

export function Logo({ className = "", src = "/image/logo.png", alt = "G&V Support Services Logo" }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`}
      whileHover={{ scale: 2.05 }}
    >
      {!imgError && src ? (
        <img 
          src={src} 
          alt={alt}
          onError={() => setImgError(true)}
          className="h-20 sm:h-20 md:h-30 w-auto max-w-[180px] object-contain "
        />
      ) : (
        <div className="w-20 h-20  md:w-20 md:h-20 bg-orange-500 rounded-lg transform rotate-12 flex items-center justify-center shadow-sm border-1">
          <div className="w-20 h-20 md:w-20 md:h-70 bg-black border-1" />
        </div>
      )}
    </motion.div>
  );
}

