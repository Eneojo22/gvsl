import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { ArrowRight, Trees, Navigation, Flag } from 'lucide-react';

const iconMap = {
  Trees: Trees,
  Navigation: Navigation,
  Flag: Flag,
};

export function CategorySection() {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="space-y-6 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500">Service Excellence</span>
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight text-neutral-900 leading-[1.1]">
              Seamlessly <span className="italic font-serif text-neutral-300">Arrived.</span>
            </h2>
          </div>
          <p className="text-neutral-500 text-lg max-w-sm pb-2">
            Every detail managed. Every transition perfected. From the airport gates to the keys of your new residence.
          </p>
        </div>

        <div className="space-y-32">
          <ServiceFeature 
            index={1}
            title="Meet and Greet"
            subtitle="Airport arrivals and coordination"
            description="Stress-free airport meet and greet with coordinated arrival support for a seamless entry into Nigeria. We handle the complexity so you can focus on the opportunity."
            tag="Welcome to Nigeria"
            image="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200"
            align="right"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceFeature({ index, title, subtitle, description, tag, image, align = 'right' }: { 
  index: number, 
  title: string, 
  subtitle: string, 
  description: string,
  tag: string,
  image: string,
  align?: 'left' | 'right'
}) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 lg:gap-32`}>
      <motion.div 
        initial={{ opacity: 0, x: align === 'right' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full"
      >
        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden group">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="absolute bottom-8 left-8">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-4 border border-white shadow-2xl">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{tag}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex-1 space-y-10"
      >
        <div className="relative">
          <span className="absolute -top-12 -left-4 text-[12rem] font-display font-bold text-neutral-50 select-none -z-10 leading-none">
            0{index}
          </span>
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
              {subtitle}
            </h4>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 leading-tight">
              {title}
            </h3>
          </div>
        </div>
        
        <p className="text-neutral-500 text-lg leading-relaxed max-w-sm">
          {description}
        </p>

        <div className="pt-4">
          <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black group hover:gap-6 transition-all">
            See Service Details
            <ArrowRight size={16} className="text-orange-500 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
