import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { ArrowUpRight, Filter, LayoutGrid, List, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlueprintPattern } from '../components/Decorations';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

const CATEGORIES = ['All', 'Furniture', 'Rooms', 'Residential', 'Commercial', 'Custom Builds'];

const isVideoUrl = (url?: string) => {
  if (!url) return false;
  return url.startsWith('data:video/') || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('.mov') || url.toLowerCase().includes('.ogg');
};

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSwatch, setSelectedSwatch] = useState<{ [projectId: string]: { name: string; desc: string } }>({});

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const q = query(
          collection(db, 'projects'),
          where('type', '==', 'portfolio'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDbProjects(data);
      } catch (error) {
        console.error('Error fetching portfolio from firestore', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const mappedDbProjects = dbProjects.map(p => ({
    id: p.id,
    title: p.title || '',
    category: p.category || 'Residential',
    type: p.portfolioType || 'Custom Builds',
    isFurniture: p.isFurniture ?? (p.category?.toLowerCase() === 'furniture' || p.category?.toLowerCase() === 'custom builds'),
    isRoom: p.isRoom ?? (p.category?.toLowerCase() === 'residential' || p.category?.toLowerCase() === 'homes' || p.category?.toLowerCase() === 'commercial'),
    description: p.description || '',
    before: p.before || p.image || 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop',
    after: p.after || p.image || 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
    client: p.client || 'Leadwood Client',
    testimonial: p.testimonial || '',
    swatches: [
      { name: 'Premium Hardwood', color: '#78350F', desc: 'Kiln-dried high density tropical wood timber' },
      { name: 'Luxury Textile', color: '#F4EBE1', desc: 'Custom tailored design weaving' }
    ]
  }));

  const allProjects = mappedDbProjects;

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : activeCategory === 'Furniture' 
      ? allProjects.filter(p => p.isFurniture)
      : activeCategory === 'Rooms' 
        ? allProjects.filter(p => p.isRoom)
        : allProjects.filter(p => p.category === activeCategory || p.type === activeCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Portfolio Hero */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-white">
        <BlueprintPattern className="opacity-[0.03]" />
        
        {/* Soft designer floating blobs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#E5A85C]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-600 text-[10px] font-bold uppercase tracking-widest shadow-sm"
            >
              <Sparkles size={11} /> The Design Vault
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl min-[450px]:text-6xl md:text-8xl lg:text-[8.5rem] font-display font-medium tracking-tighter text-black leading-none mb-8"
            >
              Our <br />
              <span className="italic font-serif text-orange-500 font-normal">Portfolio.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed font-sans font-medium"
            >
              Our work speaks for itself—explore our outstanding, masterfully executed structural designs and bespoke interior craftsmanship.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative bg-white py-6 border-y border-neutral-100 px-6 shadow-sm shadow-neutral-100/40">
        <div className="container mx-auto">
           <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    // Reset selected swatches tooltips
                    setSelectedSwatch({});
                  }}
                  className={`px-6 sm:px-8 py-3.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-black text-white scale-105 shadow-md shadow-black/10' 
                      : 'bg-neutral-50 text-neutral-400 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* Projects Grid Section with Before and After Interaction */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-36">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const currentSwatch = selectedSwatch[project.id];
                
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 80 }}
                    className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
                  >
                    {/* Left: Dynamic Sliding Before-After Showcase */}
                    <div className="w-full relative z-10">
                      <div className="relative group">
                        {project.before && project.after && project.before !== project.after ? (
                          <BeforeAfterSlider before={project.before} after={project.after} />
                        ) : (
                          <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden select-none border border-neutral-100 shadow-xl group bg-neutral-100">
                            {isVideoUrl(project.after || project.image) ? (
                              <video 
                                src={project.after || project.image} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                muted 
                                loop 
                                autoPlay 
                                playsInline 
                                controls={false}
                              />
                            ) : (
                              <img 
                                src={project.after || project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                              />
                            )}
                          </div>
                        )}
                        
                        {/* Shadow accent below the component */}
                        <div className="absolute inset-x-8 -bottom-6 h-10 bg-black/5 rounded-full blur-2xl -z-10 group-hover:h-12 group-hover:bg-black/10 transition-all duration-500" />
                      </div>
                    </div>

                    {/* Right: Premium Project Description Context */}
                    <div className="space-y-10 lg:pl-4">
                       <div className="space-y-5">
                          <div className="flex flex-wrap gap-2">
                             <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-500/10">
                               {project.category}
                             </span>
                             <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400 border border-neutral-200 px-3.5 py-1.5 rounded-full">
                               {project.type}
                             </span>
                          </div>
                          
                          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-black leading-tight tracking-tighter">
                            {project.title}
                          </h3>
                       </div>

                       <p className="text-lg md:text-xl text-neutral-500 leading-relaxed font-sans font-medium">
                          {project.description}
                       </p>

                       {/* Material Spec Swatch Interactive Customizer (Inspired by shoproof.com) */}
                       {project.swatches && (
                         <div className="p-6 bg-[#FAF8F5] border border-neutral-100 rounded-[2rem] space-y-4">
                            <div className="flex items-center gap-2">
                               <Sparkles size={13} className="text-orange-500 animate-pulse" />
                               <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#241318]/50">Material Customizer Specifications</span>
                            </div>
                            
                            <div className="flex gap-3">
                               {project.swatches.map((sw, sIdx) => {
                                 const isSelected = currentSwatch?.name === sw.name;
                                 return (
                                   <button
                                     key={sIdx}
                                     onClick={() => {
                                       if (isSelected) {
                                         // Toggle off
                                         const copy = { ...selectedSwatch };
                                         delete copy[project.id];
                                         setSelectedSwatch(copy);
                                       } else {
                                         setSelectedSwatch({
                                           ...selectedSwatch,
                                           [project.id]: { name: sw.name, desc: sw.desc }
                                         });
                                       }
                                     }}
                                     className={`w-10 h-10 rounded-full border-2 transition-all relative overflow-hidden flex items-center justify-center ${
                                       isSelected 
                                         ? 'border-orange-500 bg-neutral-200' 
                                         : 'border-neutral-200 hover:border-black hover:scale-105'
                                     }`}
                                     title={`Show detail: ${sw.name}`}
                                     style={{ backgroundColor: sw.color }}
                                   >
                                     <div className={`w-3.5 h-3.5 rounded-full bg-white transition-opacity ${isSelected ? 'opacity-100 shadow-sm' : 'opacity-0'}`} />
                                   </button>
                                 );
                               })}
                            </div>

                            {/* Active Swatch Information Tooltip Box */}
                            <AnimatePresence mode="wait">
                              {currentSwatch ? (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="pt-2"
                                >
                                  <div className="text-xs bg-white p-4 rounded-xl border border-neutral-100 text-left">
                                    <p className="font-extrabold uppercase tracking-wider text-black text-[10px] mb-1">{currentSwatch.name}</p>
                                    <p className="text-neutral-500 text-[11px] leading-relaxed">{currentSwatch.desc}</p>
                                  </div>
                                </motion.div>
                              ) : (
                                <p className="text-[10px] font-medium text-neutral-400 italic">Click on the swatch color circles to check exact material details.</p>
                              )}
                            </AnimatePresence>
                         </div>
                       )}

                       {/* Client Feedback testimonial card */}
                       {project.testimonial && (
                         <div className="p-8 bg-neutral-50/50 rounded-[2rem] border border-neutral-100 italic text-base sm:text-lg text-neutral-600 relative">
                            <span className="absolute top-4 left-6 text-6xl text-orange-200 font-serif leading-none select-none">“</span>
                            <p className="relative z-10 leading-relaxed pl-4">{project.testimonial}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-4 not-italic pl-4">— {project.client}</p>
                         </div>
                       )}

                       <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-6">
                          <div>
                             <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-300 mb-1">Lead Client</p>
                             <p className="text-lg font-display font-medium text-black">{project.client}</p>
                          </div>
                          
                          <button 
                            onClick={() => window.location.href = `/contact?inquire=${encodeURIComponent(project.title)}`}
                            className="bg-black text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-500 transition-all flex items-center gap-3 shadow-md hover:scale-[1.03]"
                          >
                             Inquire about this build <ArrowUpRight size={14} />
                          </button>
                       </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
export default PortfolioPage;
