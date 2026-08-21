import { useRef, Key } from 'react';
import { SLIDES, Slide } from '../constants';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function FullscreenSlider() {
  return (
    <section className="relative z-10 bg-white">
      {SLIDES.map((slide, index) => (
        <SlideComponent key={slide.id} slide={slide} index={index} />
      ))}
    </section>
  );
}

interface SlideProps {
  key?: Key;
  slide: Slide;
  index: number;
}

function SlideComponent({ slide, index }: SlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !contentRef.current) return;

    // Consolidate all scroll animations for this slide into one timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Image 3D Parallax & Scale
    tl.fromTo(imageRef.current, 
      { 
        scale: 1.2, 
        rotateX: -10, 
        z: -100,
        opacity: 0.8 
      }, 
      { 
        scale: 1, 
        rotateX: 0, 
        z: 0,
        opacity: 1,
        duration: 0.5,
        ease: "none"
      }
    ).to(imageRef.current, 
      { 
        scale: 1.2, 
        rotateX: 10, 
        z: -100,
        opacity: 0.8,
        duration: 0.5,
        ease: "none"
      }
    );

    // Content animation synced with the same timeline/trigger
    tl.fromTo(contentRef.current,
      { y: 60, opacity: 0.2 },
      {
        y: -60,
        opacity: 1,
        duration: 1, // This spans the whole timeline scroll
        ease: "power2.inOut"
      },
      0 // Start at beginning of timeline
    );
  }, { scope: containerRef });

  const serviceIds = ['orientation', 'meet-greet', 'leadwood-homes', 'leadwood-furniture'];

  return (
    <div id={serviceIds[index]} ref={containerRef} className="relative h-[250vh] flex items-start justify-center perspective-[2000px]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Background Image Wrapper with 3D properties */}
        <div 
          ref={imageRef}
          className="absolute inset-0 z-0 origin-center transform-gpu"
          style={{ transformStyle: 'preserve-3d' }} >
          <div className="absolute inset-0 bg-white/20 z-10" />
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center min-h-[60vh] gap-12"
        >
          <div className="space-y-8 flex flex-col items-center">
            <div className="flex items-center gap-4 text-black">
              <span className="text-sm font-mono opacity-80">0{index + 1}</span>
              <div className="flex items-center gap-2 bg-black/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest">{slide.category}</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-medium text-black max-w-2xl leading-[1.1] drop-shadow-sm">
              {t(`slides.s${index + 1}.title`)}
            </h2>

            <p className="text-black/80 text-lg font-semibold max-w-xl leading-relaxed">
              {t(`slides.s${index + 1}.sub`)}
            </p>

            <div className="flex items-center gap-8">
              <button className="group flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-500">
                {t('nav.services')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Vertical */}
        <div className="absolute right-12 h-64 w-[1px] bg-black/10 z-20 flex flex-col justify-end">
            <div className="bg-orange-600 w-full transition-all duration-500" style={{ height: `${(index + 1) * 25}%` }} />
        </div>
      </div>
    </div>
  );
}
