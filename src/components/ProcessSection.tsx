import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { BlueprintPattern } from './Decorations';

const PROCESS_STEPS = [
  {
    id: "research",
    title: "Pre-Arrival Strategy",
    text: "Before you even land, we've already secured your soft landing. Tailored housing options and personalized relocation strategies based on your specific profile.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "arrival",
    title: "Arrival & Integration",
    text: "Airport pick-up, local SIM registration, and a direct transfer to your new home. We minimize the 'foreigner disconnect' from the first hour.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "homing",
    title: "Home & Life Setup",
    text: "Full furnishing within 72 hours, utility connections, and school coordination. Your new life in Nigeria is operational while you sleep.",
    image: "https://images.unsplash.com/photo-1556912177-f5835948967b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "ongoing",
    title: "Ongoing Support",
    text: "Our relationship doesn't end at move-in. 24/7 maintenance support and periodic check-ins to ensure sustained comfort and security.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "#ffffff", // Start: Clean White
      "#fdfcfb", // Step 1: Soft Pearl
      "#fff7ed", // Step 2: Warm Amber/Cream
      "#fefce8", // Step 3: Subtle Sun-kissed Yellow
      "#ffffff"  // End: Clean White
    ]
  );

  const innerParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <motion.section 
      ref={containerRef} 
      style={{ backgroundColor }}
      className="relative py-40 px-6 overflow-hidden transition-colors duration-700"
    >
      {/* Fixed Background Image with Parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: innerParallax }}
          className="absolute inset-0 opacity-[0.08]"
        >
          <img 
            src="https://images.unsplash.com/photo-1517733925043-4731f0bb1c1b?auto=format&fit=crop&q=80&w=2000" 
            alt="" 
            className="w-full h-[120%] object-cover"
          />
        </motion.div>
        
        {/* Soft edge masking for background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
        <div 
          className="absolute inset-0" 
          style={{ background: 'radial-gradient(circle at center, transparent 0%, white 95%)' }} 
        />
      </div>

      <BlueprintPattern className="opacity-[0.015]" />
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-8"
          >
            The Journey
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-display font-medium text-black leading-tight"
          >
            A seamless path from <span className="italic font-serif text-neutral-400">global</span> to <span className="italic font-serif text-neutral-400">local.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-100 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-40">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.id} className="relative grid md:grid-cols-2 gap-12 lg:gap-32 items-center">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-orange-500 z-10 hidden md:block" />
                
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`space-y-8 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
                >
                  <div className="space-y-4">
                    <span className="text-6xl font-display font-bold text-black mb-4 block">0{idx + 1}</span>
                    <h3 className="text-3xl md:text-4xl font-display font-medium text-black">{step.title}</h3>
                    <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
                      {step.text}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                >
                  <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-orange-900/10 group-hover:bg-transparent transition-all duration-500" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
