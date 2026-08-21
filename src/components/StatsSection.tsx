import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Users, Clock, MapPin, Award, Heart } from 'lucide-react';

export function StatsSection() {
  const { t } = useLanguage();
  
  const STATS = [
    { value: "50+", label: t('stats.clients'), sub: "Across housing and relocation", icon: <Users size={20} />, color: "bg-orange-500" },
    { value: "10+", label: t('stats.experience'), sub: "Helping clients make confident decisions", icon: <Award size={20} />, color: "bg-blue-500" },
    { value: "98%", label: t('stats.satisfaction'), sub: "Trusted for people-first delivery", icon: <Heart size={20} />, color: "bg-pink-500" },
    { value: "7+", label: t('stats.locations'), sub: "Service points across Nigeria", icon: <MapPin size={20} />, color: "bg-emerald-500" },
    { value: "< 24h", label: t('stats.response'), sub: "Fast answers when timelines are tight", icon: <Clock size={20} />, color: "bg-purple-500" },
  ];

  return (
    <section className="py-24 px-6 bg-neutral-950 text-white overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500">Global Performance</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white max-w-xl leading-tight">
            Our track record in <span className="italic font-serif text-neutral-500">Nigeria.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[240px]">
          
          {/* Large Card: Clients */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group hover:bg-neutral-900 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                {STATS[0].icon}
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                High Growth
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-7xl font-display font-medium tracking-tighter text-white group-hover:scale-105 transition-transform origin-left duration-500">
                {STATS[0].value}
              </h3>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-white">{STATS[0].label}</p>
                <p className="text-xs text-neutral-500 mt-1">{STATS[0].sub}</p>
              </div>
            </div>
          </motion.div>

          {/* Response Time Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-purple-500/10 transition-colors group border-purple-500/5"
          >
             <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                {STATS[4].icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-5xl font-display font-medium tracking-tighter text-white group-hover:text-purple-400 transition-colors">
                  {STATS[4].value}
                </h3>
                 <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{STATS[4].label}</p>
                  <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest leading-relaxed">
                    {STATS[4].sub}
                  </p>
                </div>
              </div>
          </motion.div>

          {/* Locations Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group hover:bg-emerald-500/10 transition-colors border-emerald-500/5"
          >
             <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                {STATS[3].icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-6xl font-display font-medium tracking-tighter text-white">
                  {STATS[3].value}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{STATS[3].label}</p>
              </div>
          </motion.div>

           {/* Satisfaction Card */}
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group hover:bg-pink-500/10 transition-colors border-pink-500/5"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                {STATS[2].icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-6xl font-display font-medium tracking-tighter text-white">
                  {STATS[2].value}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{STATS[2].label}</p>
                <p className="text-[10px] text-neutral-600 font-bold uppercase mt-2 tracking-widest">{STATS[2].sub}</p>
              </div>
            </div>
          </motion.div>

           {/* Experience Card */}
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-4 bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-blue-500/10 transition-colors group border-blue-500/5"
          >
             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                {STATS[1].icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-6xl font-display font-medium tracking-tighter text-white">
                  {STATS[1].value}
                </h3>
                 <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{STATS[1].label}</p>
                  <p className="text-[10px] text-blue-500/60 font-bold uppercase tracking-widest">
                    {STATS[1].sub}
                  </p>
                </div>
              </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
