import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const transformations = [
  {
    title: 'Vintage Lounge Chair',
    description: 'Complete reupholstery and wood refinishing.',
    before: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Executive Desk',
    description: 'Structural repair and modern charcoal finish.',
    before: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop',
  }
];

export function BeforeAfterGallery() {
  const [index, setIndex] = useState(0);

  return (
    <section className="py-16 md:py-32 bg-neutral-900 text-white overflow-hidden rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 md:mx-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500">
              The Power of Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-medium tracking-tight">
              Furniture <br />
              <span className="italic font-serif text-neutral-500">Reimagined.</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-base sm:text-lg leading-relaxed">
            See how we breathe new life into worn-out pieces, combining traditional craftsmanship with modern aesthetics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-white/5 border border-white/10 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem]">
              <h3 className="text-2xl sm:text-3xl font-display font-medium mb-1 sm:mb-2">{transformations[index].title}</h3>
              <p className="text-sm text-neutral-500 mb-6 sm:mb-8">{transformations[index].description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 block">Before</span>
                  <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden grayscale">
                    <img src={transformations[index].before} className="w-full h-full object-cover" alt="Before" />
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 block">After</span>
                  <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-orange-500/30">
                    <img src={transformations[index].after} className="w-full h-full object-cover" alt="After" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIndex((i) => (i === 0 ? transformations.length - 1 : i - 1))}
                className="p-3.5 sm:p-4 rounded-full border border-white/10 hover:bg-orange-500 hover:border-orange-500 transition-all cursor-pointer"
                title="Previous Transformation"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setIndex((i) => (i === transformations.length - 1 ? 0 : i + 1))}
                className="p-3.5 sm:p-4 rounded-full border border-white/10 hover:bg-orange-500 hover:border-orange-500 transition-all cursor-pointer"
                title="Next Transformation"
              >
                <ChevronRight size={20} />
              </button>
              <div className="flex-1 h-[1px] bg-white/10 ml-2 sm:ml-4" />
              <span className="text-xs font-mono text-neutral-600">0{index + 1} / 0{transformations.length}</span>
            </div>
          </motion.div>

          <div className="relative group">
            <div className="absolute inset-0 bg-orange-500/20 blur-[100px] group-hover:bg-orange-500/30 transition-all rounded-full" />
            <div className="relative aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
               <img 
                 src={transformations[index].after} 
                 className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" 
                 alt="Main reveal" 
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
