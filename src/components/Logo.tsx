import { motion } from 'motion/react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-lg transform rotate-12 flex items-center justify-center">
        <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-sm" />
      </div>
    </motion.div>
  );
}
