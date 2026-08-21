import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Make',
    subtitle: 'BESPOKE CREATION',
    description: 'Custom furniture built from scratch to your exact specifications. Every joint, finish, and dimension tailored to your space.',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800&auto=format&fit=crop',
    link: '#custom'
  },
  {
    title: 'Revamp',
    subtitle: 'MASTER RESTORATION',
    description: 'Breathe new life into tired pieces. Our expert polishers and upholsterers transform "old" into "heirloom".',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop',
    link: '#revamp'
  },
  {
    title: 'Resell',
    subtitle: 'CURATED STOCK',
    description: 'Skip the wait. Browse our ready-to-use, quality-vetted signature pieces and masterfully revamped furniture.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    link: '/shop'
  }
];

export function ServiceSnapshot() {
  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12 sm:mb-24">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500">
              The Woodwork Ecosystem
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight">
              One Workshop. <br />
              <span className="italic font-serif text-neutral-400">Three Identities.</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-500 text-lg leading-relaxed font-medium">
            Whether you are building from scratch, restoring a classic, or looking to buy quality — we handle the lifecycle of fine furniture.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-4 h-full">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className={`relative group ${index === 1 ? 'lg:translate-y-12' : ''}`}
            >
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-neutral-100">
                <img 
                  src={service.image} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  alt={service.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono opacity-50">0{index + 1}</span>
                      <span className="w-10 h-[1px] bg-white/30" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-orange-400">
                        {service.subtitle}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display font-medium leading-none">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-700 opacity-0 group-hover:opacity-100">
                      {service.description}
                    </p>
                    <div className="pt-4">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-transform"
                      >
                        <ArrowUpRight size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
