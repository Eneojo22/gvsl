import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Hero } from '../components/Hero';

import { ProductSection } from '../components/ProductSection';
import { CategorySection } from '../components/CategorySection';
import { ProcessSection } from '../components/ProcessSection';
import { StatsSection } from '../components/StatsSection';
import { ClientsSection } from '../components/ClientsSection';
import { SolutionsGrid } from '../components/SolutionsGrid';
import { ServiceMatcher } from '../components/ServiceMatcher';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-white transition-colors duration-700">
      {/* 
        Hero remains sticky and creates the initial "curtain" reveal 
        as the rest of the content scrolls up over it.
        Increased height to 180vh to make the scroll transition feel significantly slower and smoother.
      */}
      <div className="sticky top-20 z-0">
        <Hero scrollYProgress={scrollYProgress} />
      </div>

      {/* 
        Main content starts here with a high z-index to overlay the hero.
        Everything from here down follows a normal, readable flow.
      */}
      <div className="relative z-10 bg-white rounded-t-[4rem] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
        <SolutionsGrid />
        
        <div className="relative bg-white pt-20">
          <ProcessSection />
        </div>
        
        <ServiceMatcher />
        
        <ProductSection />

        <div className="py-32 bg-neutral-50/30">
          <ClientsSection />
        </div>
        
        <StatsSection />
      </div>
    </div>
  );
}
