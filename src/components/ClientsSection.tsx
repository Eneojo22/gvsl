import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

interface ClientBrand {
  name: string;
  tagline?: string;
  renderLogo?: () => React.ReactNode;
}

const CLIENTS: ClientBrand[] = [
  { 
    name: 'LG Electronics',
    tagline: 'Global Leader',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#A50034] text-white flex items-center justify-center font-bold text-xs shadow-xs">
          LG
        </div>
        <span className="font-display font-extrabold tracking-wider text-base md:text-lg text-neutral-800">
          LG
        </span>
      </div>
    )
  },
  { 
    name: 'Samsung',
    tagline: 'Innovation & Tech',
    renderLogo: () => (
      <div className="flex items-center">
        <span className="font-sans font-black tracking-[0.25em] text-base md:text-xl text-[#1428A0] uppercase">
          SAMSUNG
        </span>
      </div>
    )
  },
  { 
    name: 'Reckitt Benckiser',
    tagline: 'Consumer Health & Hygiene',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E5007D]" />
        <span className="font-sans font-bold tracking-tight text-sm md:text-base text-neutral-900">
          Reckitt <span className="font-light text-neutral-500">Benckiser</span>
        </span>
      </div>
    )
  },
  { 
    name: 'Leadwood Homes',
    tagline: 'Luxury Residences',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rotate-45 bg-[#E5A85C]" />
        <span className="font-display font-bold tracking-[0.15em] text-xs md:text-sm text-neutral-900 uppercase">
          Leadwood <span className="text-[#E5A85C] font-light">Homes</span>
        </span>
      </div>
    )
  },
  { 
    name: 'Rangewell',
    tagline: 'Enterprise Capital',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-4 bg-neutral-900 rounded-[2px]" />
        <span className="font-display font-extrabold tracking-[0.18em] text-xs md:text-sm text-neutral-900 uppercase">
          RANGE<span className="text-orange-500">WELL</span>
        </span>
      </div>
    )
  },
];

export function ClientsSection() {
  const { t } = useLanguage();
  
  // Create a triple-length array for a seamless continuous loop
  const marqueeItems = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-20 bg-white overflow-hidden select-none">
      <div className="container mx-auto px-6 mb-14 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold uppercase tracking-[0.35em] text-neutral-400"
        >
          Trusted by Industry Leaders, Global Brands & Luxury Estates
        </motion.p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 28, 
            repeat: Infinity, 
            ease: "linear"
          }}
          className="flex gap-8 md:gap-16 flex-nowrap pr-8 md:pr-16 items-center"
        >
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 px-6 py-4 rounded-2xl bg-neutral-50/70 hover:bg-neutral-100/80 transition-all duration-300 flex items-center justify-center group opacity-70 hover:opacity-100 cursor-default"
            >
              {client.renderLogo ? (
                client.renderLogo()
              ) : (
                <span className="text-black font-display font-bold uppercase tracking-[0.2em] text-[12px] md:text-sm">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
        
        {/* Soft edge masks */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

