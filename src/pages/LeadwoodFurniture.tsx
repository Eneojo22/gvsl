import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'motion/react';
import { Sofa, LayoutGrid, Truck, ChevronRight, PenTool as PinTool, Hammer, Heart, Upload, Ruler, Send, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, addDoc } from 'firebase/firestore';
import { ServiceSnapshot } from '../components/ServiceSnapshot';
import { BeforeAfterGallery } from '../components/BeforeAfterGallery';
import { BlueprintPattern } from '../components/Decorations';

function FurnitureHeroBlob({ color, size, initialX, initialY, animateX, animateY, duration, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, scale: 0.8, opacity: 0 }}
      animate={{ 
        x: animateX, 
        y: animateY, 
        scale: [0.8, 1.25, 0.8],
        opacity: [0.25, 0.55, 0.25]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={`absolute rounded-full blur-[100px] pointer-events-none mix-blend-multiply ${color} ${size}`}
    />
  );
}

interface FurnitureGalleryProps {
  activeCategory?: string | null;
  activeSub?: string | null;
}

function FurnitureGallery({ activeCategory, activeSub }: FurnitureGalleryProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const q = query(
          collection(db, 'projects'), 
          where('type', '==', 'furniture'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(data);
      } catch (error) {
        console.error('Error fetching furniture showcase', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFurniture();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="animate-spin text-[#E5A85C]" size={40} />
      </div>
    );
  }

  // Multi-tier smart match
  const filteredItems = items.filter(item => {
    if (!activeCategory) return true;
    const cat = activeCategory.toUpperCase();
    const sub = activeSub ? activeSub.toUpperCase() : null;

    // Search target string
    const searchStr = `${item.category || ''} ${item.title || ''} ${item.description || ''} ${item.portfolioType || ''}`.toUpperCase();
    
    const matchesCat = searchStr.includes(cat) || (cat === 'BEDROOM' && searchStr.includes('BED'));
    if (sub) {
      const matchesSub = searchStr.includes(sub);
      return matchesCat || matchesSub;
    }
    return matchesCat;
  });

  // Exquisite design choice: switch back to default items if filtered yields zero
  const displayItems = filteredItems.length > 0 ? filteredItems : items;

  if (displayItems.length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed border-neutral-100 rounded-[3rem]">
        <Sofa className="mx-auto text-neutral-100 mb-4" size={48} />
        <p className="text-neutral-300 font-bold uppercase tracking-widest text-xs">No items in signature collection yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredItems.length === 0 && activeCategory && (
        <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-50 px-6 py-3 rounded-2xl inline-block">
          Showing our absolute favorite signature custom pieces
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {displayItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            className="group relative"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-50 shadow-lg relative">
              {item.image && (item.image.startsWith('data:video/') || item.image.toLowerCase().includes('.mp4') || item.image.toLowerCase().includes('.webm') || item.image.toLowerCase().includes('.mov') || item.image.toLowerCase().includes('.ogg')) ? (
                <video 
                  src={item.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  muted 
                  loop 
                  autoPlay 
                  playsInline 
                  controls={false}
                />
              ) : (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-20">
                <h4 className="text-white text-xl font-display font-medium mb-1">{item.title}</h4>
                <p className="text-[#E5A85C] text-[10px] uppercase tracking-widest font-extrabold">{item.category || 'Leadwood Custom'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LeadwoodFurniturePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCat = searchParams.get('category');
  const selectedSub = searchParams.get('sub');

  // Hero carousel state
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title1: "STYLING YOUR",
      title2: "PERFECT ROOM",
      subtitle: "ONLY THE ESSENTIAL, ALWAYS THE EXCEPTIONAL. ELEVATE YOUR HOME CONTEXT WITH PREMIUM BESPOKE PIECES.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
      itemCode: "01",
      name: "Luvon Bouclé Lounge",
      id: "sofa"
    },
    {
      title1: "ESSENTIAL",
      title2: "CRAFTED LUXURY",
      subtitle: "ORGANIC CURVED PROFILES FEATURING RAW INTEGRITY DESIGNED FOR ARCHITECTURAL STATEMENT SPACES.",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
      itemCode: "02",
      name: "Alta Curved Seating",
      id: "alta"
    },
    {
      title1: "EXCEPTIONAL",
      title2: "HANDMADE WOODSTUFF",
      subtitle: "PREMIUM TEAK JOINTS AND EXPERT RESIN FINISH CUSTOM CONFLICTED TO HARMONISE LOBBIES AND STUDIOS.",
      image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=1200",
      itemCode: "03",
      name: "Daily Smoked Oak Set",
      id: "daily"
    }
  ];

  // Auto-play the slider every 10 seconds unless interacted
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Parallax transformations for Hero text/image
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  return (
    <div ref={containerRef} className="bg-white min-h-screen relative">
      
      {/* Sticky Teak-Sunlit Luxury Parallax Hero */}
      <section className="sticky top-0 z-0 h-[85vh] sm:h-screen w-full overflow-hidden bg-[#FAF8F5] flex items-center justify-center pt-16 md:pt-24 px-4 md:px-16 pb-4 md:pb-0">
        
        {/* Sunlit Varnish & Teak colored blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FurnitureHeroBlob 
            color="bg-amber-500/5" 
            size="w-[600px] h-[600px]" 
            initialX="-5%" 
            initialY="10%" 
            animateX={["-5%", "15%", "-5%"]} 
            animateY={["10%", "25%", "10%"]}
            duration={16}
          />
          <FurnitureHeroBlob 
            color="bg-[#E5A85C]/10" 
            size="w-[500px] h-[500px]" 
            initialX="65%" 
            initialY="-5%" 
            animateX={["65%", "45%", "65%"]} 
            animateY={["-5%", "15%", "-5%"]}
            duration={22}
            delay={2}
          />
        </div>

        {/* Sophisticated glass layer */}
        <div className="absolute inset-0 bg-[#FAF8F5]/30 backdrop-blur-[80px] z-[1]" />

        <motion.div 
          style={{ opacity, scale, y }}
          className="w-full max-w-5xl mx-auto relative z-10 h-full flex items-center justify-center pt-2 md:pt-0"
        >
          {/* Main Visual Carousel Layout Centered Overlay */}
          <div className="w-full relative aspect-auto h-[65vh] max-h-[460px] md:aspect-[16/9] md:min-h-[520px] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-[#241318] shadow-[0_30px_70px_rgba(36,19,25,0.25)] border border-neutral-100/10 group flex items-center justify-center">
            
            {/* Sliding Image Background */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].name}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </AnimatePresence>
            </div>

            {/* Dark contrast-enhancing gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#241318]/50 via-[#241318]/45 to-[#241318]/70 z-10 transition-colors duration-500" />

            {/* Inner text content directly centered & overlaid on the image */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-16 py-6 sm:py-12 max-w-2xl mx-auto space-y-4 sm:space-y-8 text-white">
              
              {/* Big overlaid heading (both elements centered as requested) */}
              <h1 className="text-2xl min-[400px]:text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-light uppercase leading-[0.95] tracking-tighter select-none drop-shadow-xl">
                <span className="block italic font-serif font-light text-neutral-200 capitalize normal-case mb-1 sm:mb-2 text-base sm:text-4xl md:text-5xl lg:text-[4rem]">
                  {slides[activeSlide].title1.toLowerCase() === 'styling your' ? 'Styling Your' : slides[activeSlide].title1}
                </span>
                <motion.span 
                  key={activeSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-black tracking-tight text-[#E5A85C]"
                >
                  {slides[activeSlide].title2}
                </motion.span>
              </h1>

              {/* Slider description text */}
              <motion.p 
                key={`para-${activeSlide}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-[8px] sm:text-[11px] md:text-xs text-white/95 font-bold tracking-widest font-sans leading-relaxed uppercase max-w-sm sm:max-w-md mx-auto drop-shadow-sm"
              >
                {slides[activeSlide].subtitle}
              </motion.p>

              {/* Overlaid Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <button 
                  onClick={() => window.location.href = '/shop'}
                  className="bg-[#E5A85C] text-[#241318] hover:bg-white hover:text-[#241318] px-5 py-2.5 sm:px-8 sm:py-4 rounded-full text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  Explore Available Showroom
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('custom');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/25 hover:border-[#E5A85C] hover:bg-white/20 px-5 py-2.5 sm:px-8 sm:py-4 rounded-full text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  Custom Build
                </button>
              </div>

            </div>

            {/* Status indicators inside overlay image (top-left/top-right margins) */}
            <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-center z-20 pointer-events-none">
              <span className="px-2.5 py-1 sm:px-3.5 sm:py-2 bg-[#241318]/70 border border-white/10 text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm shadow-sm">
                Showroom Model: {slides[activeSlide].name}
              </span>
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/15 text-[#E5A85C] text-[8px] sm:text-[9px] font-extrabold flex items-center justify-center font-mono shadow-md border border-white/10 backdrop-blur-sm">
                {slides[activeSlide].itemCode}
              </span>
            </div>

            {/* Left/Right controls (small dot indicators at the bottom inside card) */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center gap-1.5 font-sans">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      activeSlide === idx 
                        ? 'w-6 bg-[#E5A85C]' 
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Side Vertical Decors of the overlay block */}
            <div className="absolute -right-1 flex top-1/2 -translate-y-1/2 translate-x-12 transform rotate-90 origin-center hidden xl:flex gap-4 items-center z-20 text-white/20 select-none">
              <span className="text-[7px] font-extrabold uppercase tracking-[0.3em]">INTRODUCING</span>
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-[#E5A85C]">PLACES & SPACES</span>
              <span className="text-[7px] font-extrabold uppercase tracking-[0.3em]">FURNITURE</span>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Rolls over with beautiful shadow in corporate tone */}
      <div className="relative z-10 bg-white rounded-t-[2.5rem] sm:rounded-t-[4.5rem] shadow-[0_-50px_100px_rgba(36,19,24,0.12)] overflow-hidden">
        
        {/* Visual Snapshot */}
        <div className="border-t border-neutral-100">
          <ServiceSnapshot />
        </div>

        {/* Visual Gallery */}
        <BeforeAfterGallery />

        {/* Detailed Sections below */}
        {/* 1. Custom Furniture Making Section */}
      <section id="custom" className="py-16 md:py-40 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7 relative group">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10 aspect-[16/10] rounded-[2rem] sm:rounded-[4rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1544453535-429931752402?q=80&w=1200&auto=format&fit=crop" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                  alt="Craftsmanship" 
                />
              </motion.div>
              {/* Overlapping small image */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -bottom-16 -right-16 w-1/2 aspect-square rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl z-20 hidden md:block"
              >
                <img src="https://images.unsplash.com/photo-1621253272045-81498b8c8d8b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detail" />
              </motion.div>
              
              {/* Technical Indicator Floating */}
              <div className="absolute -top-4 -left-2 sm:-top-8 sm:-left-8 bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl z-20 border border-neutral-100 flex items-center gap-3 sm:gap-6">
                 <div className="w-1 h-10 sm:w-1.5 sm:h-16 bg-orange-500 rounded-full" />
                 <div>
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-1">Moisture Test</span>
                    <span className="text-sm sm:text-3xl font-display font-medium text-black tracking-tighter">8.4% Optimal</span>
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-8 sm:space-y-12">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-5xl font-serif italic text-neutral-200">01.</span>
                  <div className="h-[1px] w-8 sm:w-12 bg-neutral-100" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">Bespoke Creation</span>
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-medium text-black leading-[0.9] tracking-tight">
                  The <br /> Build.
                </h2>
              </div>
              
              <p className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-medium max-w-md">
                We design and build furniture from scratch to your exact specifications. Our "Make" service is for those who refuse to compromise on dimensions or materials.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-2">
                 {[
                   { label: 'Wood', val: 'Kiln-Dried Hardwood' },
                   { label: 'Finish', val: 'Hand-Rubbed Oils' },
                   { label: 'Joints', val: 'Mortise & Tenon' },
                   { label: 'Warranty', val: 'Limited Lifetime' }
                 ].map((spec, i) => (
                   <div key={i} className="space-y-1">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-300">{spec.label}</span>
                      <p className="text-xs sm:text-sm font-bold text-black">{spec.val}</p>
                   </div>
                 ))}
              </div>

              <div className="pt-4 sm:pt-8">
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-black text-white px-8 py-5 sm:px-12 sm:py-6 rounded-2xl font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-orange-500 transition-all flex items-center gap-3 shadow-xl w-full sm:w-auto justify-center cursor-pointer"
                >
                  Configure Custom Order <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Furniture Revamping Section */}
      <section id="revamp" className="py-16 md:py-40 px-4 sm:px-6 bg-neutral-950 text-white rounded-[2rem] sm:rounded-[5rem] mx-3 sm:mx-6 md:mx-12 relative overflow-hidden">
        <BlueprintPattern className="opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 sm:space-y-12">
               <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-5xl font-serif italic text-neutral-800">02.</span>
                  <div className="h-[1px] w-8 sm:w-12 bg-neutral-800" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">Master Restoration</span>
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-medium leading-[0.9] tracking-tight text-white">
                  The <br /> <span className="italic text-neutral-600">Revamp.</span>
                </h2>
              </div>

              <p className="text-lg sm:text-xl text-neutral-400 font-medium leading-relaxed">
                We take worn, outdated, or damaged furniture and bring it fully back to life. Restoration isn't just about paint—it's about reclaiming structural integrity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                 <div className="p-6 sm:p-8 bg-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 space-y-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange-500">
                       <LayoutGrid size={20} />
                    </div>
                    <h4 className="text-base sm:text-lg font-display font-medium">Individuals</h4>
                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-medium">Breathe new life into family heirlooms without the cost of replacement.</p>
                 </div>
                 <div className="p-6 sm:p-8 bg-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 space-y-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange-500">
                       <Truck size={20} />
                    </div>
                    <h4 className="text-base sm:text-lg font-display font-medium">Corporate</h4>
                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-medium">Worn restaurant chairs or office desks — we restore your brand's presence.</p>
                 </div>
              </div>

              <button className="w-full sm:w-auto bg-orange-500 py-5 px-8 sm:py-6 sm:px-12 rounded-2xl font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-white hover:text-black transition-all shadow-xl shadow-orange-500/20 cursor-pointer">
                Get Your Revamp Quote
              </button>
            </div>

            <div className="relative group mt-8 lg:mt-0">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                     <div className="aspect-[4/5] rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden grayscale relative">
                        <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format" className="w-full h-full object-contain" alt="Revamp Before" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                           <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-400">Before</span>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4 mt-8 sm:mt-12">
                     <div className="aspect-[4/5] rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden relative border-2 sm:border-4 border-orange-500/20 shadow-2xl shadow-orange-500/20">
                        <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format" className="w-full h-full object-contain" alt="Revamp After" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                           <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-500">After</span>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Detail Overlay */}
               <div className="absolute -bottom-4 -left-2 sm:-bottom-8 sm:-left-8 bg-neutral-900 border border-white/10 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                     <Hammer size={20} />
                  </div>
                  <div>
                     <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-500 block">Restoration State</span>
                     <span className="text-base sm:text-xl font-display font-medium text-white">Full Structural Rebuild</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Business Care Plans Section - Moved and Redesigned for Luxury */}
      <section className="py-16 md:py-40 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-12 md:mb-24">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-5xl font-serif italic text-neutral-100">03.</span>
                  <div className="h-[1px] w-8 sm:w-12 bg-neutral-100" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">Facility Support</span>
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-medium text-black leading-[0.9] tracking-tight">
                  Business <br /> <span className="italic text-neutral-400">Care.</span>
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-neutral-500 font-medium leading-relaxed max-w-sm">
                Corporate longevity depends on asset maintenance. Our expert plans ensure your furniture stays in showroom condition, year-round.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
               {[
                 { 
                   name: 'Quarterly', 
                   title: 'The Essential',
                   desc: 'Ideal for small offices or low-traffic executive suites.',
                   features: ['Deep cleaning', 'Joint tightening', 'Surface buffing'],
                   color: 'bg-neutral-50' 
                 },
                 { 
                   name: 'Bimonthly', 
                   title: 'Executive',
                   desc: 'High-traffic commercial spaces and busy restaurants.',
                   features: ['Spot repair', 'Structural audit', 'Monthly polish'],
                   color: 'bg-white border border-neutral-100 shadow-2xl shadow-black/5 ring-1 ring-neutral-100' 
                 },
                 { 
                   name: 'Monthly', 
                   title: 'Elite Plan',
                   desc: 'Zero-downtime maintenance for premium establishments.',
                   features: ['Priority support', '24h emergency repairs', 'Full restoration credit'],
                   color: 'bg-neutral-900 text-white' 
                 }
               ].map((tier, i) => (
                 <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }}
                    className={`p-6 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] flex flex-col h-full ${tier.color}`}
                 >
                   <div className="flex flex-col h-full">
                     <div className="space-y-6 sm:space-y-8 flex-1">
                        <div className="space-y-2">
                           <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">{tier.name} Support</span>
                           <h3 className="text-2xl sm:text-4xl font-display font-medium">{tier.title}</h3>
                        </div>
                        <p className={`text-xs sm:text-sm ${tier.name === 'Monthly' ? 'text-neutral-400' : 'text-neutral-500'} leading-relaxed`}>
                           {tier.desc}
                        </p>
                        <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-8">
                           {tier.features.map(f => (
                             <div key={f} className="flex items-center gap-3">
                               <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                               <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">{f}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="pt-8 sm:pt-12">
                        <button className={`w-full py-5 sm:py-6 rounded-2xl font-bold uppercase tracking-widest text-[9px] sm:text-[10px] transition-all cursor-pointer ${tier.name === 'Monthly' ? 'bg-white text-black hover:bg-orange-500 hover:text-white' : 'bg-black text-white hover:bg-orange-500'}`}>
                           Inquire Plan
                        </button>
                     </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Furniture Reselling Section */}
      <section id="resell" className="py-16 md:py-48 px-4 sm:px-6 bg-neutral-50 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-12 mb-10 md:mb-20 text-center lg:text-left">
               <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-3xl sm:text-5xl font-serif italic text-neutral-200">04.</span>
                <div className="h-[1px] w-8 sm:w-12 bg-neutral-200" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">Retail Inventory</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-medium text-black leading-[0.9] tracking-tight">
                The <br /> <span className="italic text-neutral-400">Stock.</span>
              </h2>
            </div>

            <div className="lg:col-span-11 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-10 md:mb-20">
              <div className="lg:col-span-7 relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="aspect-square bg-white rounded-[2rem] sm:rounded-[4rem] overflow-hidden shadow-xl"
                    >
                      <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format" className="w-full h-full object-cover" alt="Stock item 1" />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="aspect-[3/4] bg-white rounded-[2rem] sm:rounded-[4rem] overflow-hidden shadow-xl mt-6 sm:mt-12"
                    >
                      <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format" className="w-full h-full object-cover" alt="Stock item 2" />
                    </motion.div>
                </div>
                
                {/* Floater Badge */}
                <motion.div 
                  initial={{ rotate: -15, scale: 0.8 }}
                  whileInView={{ rotate: -10, scale: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-12 rounded-full shadow-2xl border border-neutral-100 flex flex-col items-center justify-center text-center z-20 w-32 h-32 sm:w-48 sm:h-48"
                >
                    <span className="text-2xl sm:text-4xl font-display font-medium text-black">Vetted.</span>
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-500">Shop Pieces</span>
                </motion.div>
              </div>

              <div className="lg:col-span-5 space-y-8 sm:space-y-12 order-1 lg:order-2">
                <p className="text-lg sm:text-xl text-neutral-500 font-medium leading-relaxed">
                  Ready-to-use, quality-vetted furniture for your space. Explore our collection of masterfully revamped signature pieces.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    'Quality-vetted authentic vintage',
                    'Prototype custom build deals',
                    'Same-day Lagos delivery',
                    '2-Year Buyback guarantee'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-400">
                        <CheckCircle2 size={16} className="text-[#E5A85C] shrink-0" />
                        <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 sm:pt-8">
                  <button 
                    onClick={() => window.location.href = '/shop'}
                    className="w-full sm:w-auto bg-black text-white px-8 py-5 sm:px-12 sm:py-6 rounded-2xl font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-[#E5A85C] transition-all flex items-center gap-3 shadow-xl justify-center cursor-pointer"
                  >
                    Browse Current Inventory <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Signature Showcase directly connected to the categorised Navigation dropdown triggers */}
            <div className="lg:col-span-12 border-t border-neutral-200/50 pt-10 sm:pt-20 mt-6 sm:mt-12 bg-neutral-50/50 p-4 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#E5A85C] block mb-2">LIVE SHOWROOM</span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-neutral-900">
                    Leadwood Master Collection
                  </h3>
                </div>

                <AnimatePresence>
                  {selectedCat && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-3 bg-[#241318] text-[#E5A85C] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md"
                    >
                      <span className="text-white/80">Filtered by: <span className="text-[#E5A85C] font-extrabold">{selectedCat}</span></span>
                      <button 
                        onClick={() => setSearchParams({})}
                        className="hover:text-white transition-colors pl-2 border-l border-white/20 ml-2 font-black cursor-pointer"
                        title="Clear Filter"
                      >
                        Reset ×
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* In-page category filters matching user's request */}
              <div className="flex flex-wrap gap-2 mb-12">
                {['All', 'Bedroom', 'Living', 'Dining', 'Lighting', 'Bathroom'].map(cat => {
                  const isCurrent = (!selectedCat && cat === 'All') || (selectedCat?.toLowerCase() === cat.toLowerCase());
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        if (cat === 'All') {
                          setSearchParams({});
                        } else {
                          setSearchParams({ category: cat });
                        }
                      }}
                      className={`px-5 py-3 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 transform active:scale-95 cursor-pointer ${
                        isCurrent 
                          ? 'bg-[#241318] text-[#E5A85C] shadow-lg shadow-black/10 scale-105' 
                          : 'bg-white border border-neutral-200 text-neutral-600 hover:border-[#E5A85C] hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <FurnitureGallery activeCategory={selectedCat} activeSub={selectedSub} />
            </div>

          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
