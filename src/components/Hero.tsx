import { motion, MotionValue, useTransform } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface HeroProps {
  scrollYProgress: MotionValue<number>;
}

export function Hero({ scrollYProgress }: HeroProps) {
  const { t } = useLanguage();
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

  return (
    <section className="relative h-screen overflow-hidden bg-white flex flex-col items-center justify-center text-center px-6 w-full">
      {/* Dynamic Background Blobs - Warm & Bright Palette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Blob 
          color="bg-orange-200" 
          size="w-[600px] h-[600px]" 
          initialX="-10%" 
          initialY="10%" 
          animateX={["-10%", "10%", "-10%"]} 
          animateY={["10%", "30%", "10%"]}
          duration={15}
        />
        <Blob 
          color="bg-amber-100" 
          size="w-[500px] h-[500px]" 
          initialX="60%" 
          initialY="-10%" 
          animateX={["60%", "40%", "60%"]} 
          animateY={["-10%", "10%", "-10%"]}
          duration={20}
          delay={2}
        />
        <Blob 
          color="bg-yellow-50" 
          size="w-[400px] h-[400px]" 
          initialX="20%" 
          initialY="50%" 
          animateX={["20%", "30%", "20%"]} 
          animateY={["50%", "40%", "50%"]}
          duration={18}
          delay={5}
        />
        <Blob 
          color="bg-orange-50" 
          size="w-[550px] h-[550px]" 
          initialX="70%" 
          initialY="60%" 
          animateX={["70%", "50%", "70%"]} 
          animateY={["60%", "80%", "60%"]}
          duration={25}
          delay={1}
        />
      </div>

      {/* Glassy overlay to soften blobs further */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[120px] z-[1]" />

      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-5xl relative z-10 space-y-12"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-[1px] w-8 bg-black/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
              Welcome to the Journey
            </span>
            <div className="h-[1px] w-8 bg-black/10" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] xl:text-[8rem] font-display font-medium tracking-tight leading-[1] md:leading-[0.85] text-black"
          >
            WE ARE YOUR <br />
            <span className="italic font-serif text-neutral-400/60">TRANSITION</span> <br />
            PARTNER.
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl font-medium text-black/60 leading-relaxed">
            {t('hero.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            to="/homes"
            className="bg-black text-white hover:bg-orange-500 font-bold px-10 py-5 rounded-full text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 group select-none cursor-pointer"
            aria-label="Search and explore Leadwood residences"
          >
            <div className="w-5 h-5 bg-orange-500 group-hover:bg-white rounded flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform shadow-xs shrink-0">
              <div className="w-2 h-2 bg-black rounded-[2px]" />
            </div>
            <Search size={14} className="text-orange-400 group-hover:text-white transition-colors shrink-0" />
            <span>Search Residences</span>
          </Link>
          <Link 
            to="/shop"
            className="bg-white/80 backdrop-blur-md text-black hover:bg-neutral-100 border border-neutral-200 font-bold px-10 py-5 rounded-full text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 select-none cursor-pointer"
            aria-label="Browse furniture showroom"
          >
            <span>Furniture Showroom</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating indicators like in the video */}
      <div className="absolute bottom-12 left-12 z-20 hidden md:block">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/40"
        >
          <span className="text-black">01</span>
          <div className="w-12 h-[1px] bg-black/10" />
          <span>Home</span>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 z-20 hidden md:block">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/40"
        >
          <span>Social</span>
          <div className="w-12 h-[1px] bg-black/10" />
          <div className="flex gap-4">
             <span className="hover:text-black cursor-pointer transition-colors">IN</span>
             <span className="hover:text-black cursor-pointer transition-colors">TW</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Blob({ color, size, initialX, initialY, animateX, animateY, duration, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, scale: 0.8, opacity: 0 }}
      animate={{ 
        x: animateX, 
        y: animateY, 
        scale: [0.8, 1.2, 0.8],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        ease: "linear"
      }}
      className={`absolute ${color} ${size} rounded-full blur-[80px] z-0 opacity-30`}
    />
  );
}
