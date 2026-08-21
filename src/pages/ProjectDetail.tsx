import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, Calendar, Shield, Zap, Wind, Share2, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

export function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      description: formData.get('needs'),
      projectType: project?.category === 'Furniture' ? 'furniture' : 'home',
      projectId: project?.id || id,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'leads'), data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry', error);
      alert('Error submitting inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function fetchProject() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProject({
            id: docSnap.id,
            ...data,
            features: data.features || ['Premium Quality', 'Professional Management', 'Bespoke Design'],
            gallery: data.gallery || (data.before && data.after ? [data.before, data.after] : [data.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200'])
          });
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error('Error fetching project detail', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <Loader2 className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center bg-[#FAF8F5]">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-neutral-100 space-y-6">
          <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-medium text-neutral-900">Project Not Found</h2>
            <p className="text-neutral-500 text-sm">
              This item may have been removed or updated in the Admin Catalog.
            </p>
          </div>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center justify-center gap-2 w-full py-4 bg-black text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-all"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Navigation / Header */}
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black transition-colors mb-12">
          <ArrowLeft size={20} />
          <span className="text-sm font-bold uppercase tracking-widest font-display">Back to Portfolio</span>
        </Link>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[16/10] rounded-[3rem] overflow-hidden bg-neutral-100 relative"
            >
              {project.image && (project.image.startsWith('data:video/') || project.image.toLowerCase().includes('.mp4') || project.image.toLowerCase().includes('.webm') || project.image.toLowerCase().includes('.mov') || project.image.toLowerCase().includes('.ogg')) ? (
                <video 
                  src={project.image} 
                  className="w-full h-full object-cover"
                  muted 
                  loop 
                  autoPlay 
                  playsInline 
                  controls
                />
              ) : (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              )}
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i + 1) }}
                  className="aspect-square rounded-[2rem] overflow-hidden bg-neutral-100 relative"
                >
                  {img && (img.startsWith('data:video/') || img.toLowerCase().includes('.mp4') || img.toLowerCase().includes('.webm') || img.toLowerCase().includes('.mov') || img.toLowerCase().includes('.ogg')) ? (
                    <video 
                      src={img} 
                      className="w-full h-full object-cover animate-pulse"
                      muted 
                      loop 
                      autoPlay 
                      playsInline 
                    />
                  ) : (
                    <img src={img} className="w-full h-full object-cover" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">{project.category}</span>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <h1 className="text-5xl md:text-7xl font-display font-medium text-black leading-[0.9]">
                    {project.title}
                  </h1>
                  {(project.price || project.promoPrice) && (
                    <div className="text-left md:text-right pb-1 flex-shrink-0">
                      <p className="text-xs uppercase font-extrabold tracking-widest text-neutral-400 mb-1">Pricing Detail</p>
                      {project.promoPrice ? (
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0">
                          <span className="text-sm line-through text-neutral-400">₦{project.price}</span>
                          <span className="text-2xl font-bold text-orange-500 font-display">₦{project.promoPrice}</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-black font-display">₦{project.price}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-neutral-400 pt-4">
                  <MapPin size={18} />
                  <span className="text-sm font-bold tracking-widest uppercase">{project.location}</span>
                </div>
              </div>

              <p className="text-xl text-neutral-500 leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-8 border-t border-neutral-100">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-black" />
                    <span className="text-sm font-bold text-neutral-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-10">
                <a href="#inquiry" className="w-full py-5 bg-black text-white text-center font-bold uppercase tracking-widest rounded-2xl hover:bg-orange-500 transition-colors">
                  Request a Viewing
                </a>
                <button className="w-full py-5 border border-neutral-200 text-black font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors">
                  <Share2 size={18} />
                  Share Project
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Specs / Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
          {[
            { icon: Shield, label: 'Security', value: '24/7 Guarded' },
            { icon: Zap, label: 'Power', value: 'Dedicated Grid' },
            { icon: Calendar, label: 'Available', value: 'Immediate' },
            { icon: Wind, label: 'Climate', value: 'Fully Centralized' }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-neutral-50 rounded-[2rem] flex flex-col items-center text-center gap-4">
              <item.icon size={24} className="text-neutral-300" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">{item.label}</span>
                <span className="block text-sm font-bold text-black">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Inquiry Form Section */}
        <section id="inquiry" className="py-24 px-8 md:px-20 bg-neutral-900 rounded-[4rem] text-white">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-4xl md:text-6xl font-display font-medium">Interested in this property?</h2>
                  <p className="text-neutral-400 text-lg mb-12">Leave your details below and our client relations team will contact you within 24 hours.</p>
                  
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-4">Full Name</label>
                      <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-4">Email Address</label>
                      <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500 transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-4">Tell us about your needs</label>
                      <textarea required name="needs" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500 transition-colors" placeholder="I am looking for an apartment for 2 senior staff members..." />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="md:col-span-2 py-5 bg-orange-500 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Send Inquiry'}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 p-12 rounded-[3rem]"
                >
                  <CheckCircle2 size={64} className="text-orange-500 mx-auto mb-6" />
                  <h2 className="text-4xl font-display font-medium mb-4">Inquiry Received</h2>
                  <p className="text-neutral-400">Thank you for your interest! Our team will contact you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
