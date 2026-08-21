import { motion } from 'motion/react';
import { Logo } from './Logo';

export function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative">
        {/* Outer pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl"
        />
        
        {/* Spinning Logo Container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative z-10"
        >
          <Logo className="scale-[2.5]" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-12 flex flex-col items-center gap-2"
      >
        <div className="flex flex-col items-center -gap-1">
          <span className="text-[18px] font-extrabold text-black tracking-tighter uppercase leading-none">
            G&V Support
          </span>
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em] opacity-80 leading-none">
            Services Limited
          </span>
        </div>
        
        {/* Loading Bar */}
        <div className="mt-8 w-32 h-[1px] bg-black/5 overflow-hidden">
          <motion.div
            animate={{
              x: [-128, 128],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full bg-orange-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
