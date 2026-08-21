import { motion, useScroll, useTransform } from 'motion/react';

export function BlueprintPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-[0.03] select-none ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5"/>
          </pattern>
          <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="black" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.3" />
      </svg>
      
      {/* Technical Drawing Accents */}
      <div className="absolute top-20 left-20 border-l border-t border-black/20 w-32 h-32">
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-orange-500 rounded-full" />
      </div>
      <div className="absolute bottom-20 right-20 border-r border-b border-black/20 w-32 h-32">
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
      </div>
    </div>
  );
}

export function FloatingGeometry() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D-like Sphere */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-[15%] left-[5%] w-32 h-32 rounded-full bg-gradient-to-tr from-neutral-200 to-white shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] md:block hidden"
      />
      
      {/* Technical Square */}
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-[25%] right-[10%] w-48 h-48 border border-neutral-100 rounded-3xl md:block hidden"
      >
        <div className="absolute inset-4 border border-orange-500/10 rounded-2xl flex items-center justify-center">
          <div className="w-1 h-1 bg-orange-500 rounded-full" />
        </div>
      </motion.div>

      {/* Floating Pill */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[15%] w-40 h-12 rounded-full bg-black/[0.02] backdrop-blur-sm border border-black/[0.05] md:block hidden"
      />
    </div>
  );
}
