import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveLeft, MoveRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return url.startsWith('data:video/') || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('.mov') || url.toLowerCase().includes('.ogg');
  };

  const renderMedia = (src?: string, alt?: string, extraStyle?: React.CSSProperties) => {
    if (!src) return null;
    if (isVideoUrl(src)) {
      return (
        <video 
          src={src} 
          className="w-full h-full object-cover pointer-events-none absolute inset-0"
          style={extraStyle}
          muted 
          loop 
          autoPlay 
          playsInline 
          controls={false}
        />
      );
    }
    return (
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover pointer-events-none absolute inset-0"
        style={extraStyle}
      />
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden select-none cursor-ew-resize border border-neutral-100 shadow-xl group bg-neutral-100"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Before Image */}
      <div className="absolute inset-0 w-full h-full grayscale">
        {renderMedia(before, "Before Transformation")}
        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white/90 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full select-none">
          BEFORE (Raw State)
        </div>
      </div>

      {/* After Image with overlay clipping */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        {renderMedia(after, "After Transformation", { width: containerRef.current?.getBoundingClientRect().width, maxWidth: 'none' })}
        <div className="absolute top-6 left-6 bg-orange-500/90 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full select-none shadow-lg">
          AFTER (Leadwood Touch)
        </div>
      </div>

      {/* Vertical Slider Bar */}
      <div 
        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div 
          className={`w-10 h-10 -ml-5 rounded-full bg-white text-black shadow-2xl flex items-center justify-center absolute border border-neutral-200/50 transition-transform duration-300 ${
            isDragging ? 'scale-110 bg-orange-500 text-white border-orange-400' : 'group-hover:scale-105'
          }`}
        >
          <div className="flex gap-0.5 items-center justify-center">
            <MoveLeft size={10} className="opacity-60" />
            <MoveRight size={10} className="opacity-60" />
          </div>
        </div>
      </div>

      {/* Subtle bottom helper */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white/80 text-[8px] tracking-[0.2em] font-sans font-medium px-4 py-1.5 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
        DRAG OR SLIDE HARMONY
      </div>
    </div>
  );
}
