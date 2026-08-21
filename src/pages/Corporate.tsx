import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, TrendingUp, Wrench, Building2, CheckCircle2, Loader2, Send } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export function CorporatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      businessName: formData.get('businessName'),
      email: formData.get('email'),
      projectType: 'corporate-audit',
      description: formData.get('needs'),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'leads'), data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting audit request', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-24">
      {/* Hero */}
      <section className="py-32 px-6 md:px-12 bg-neutral-900 text-white rounded-b-[4rem]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">
              Business Solutions
            </span>
            <h1 className="text-5xl md:text-[5.5rem] font-display font-medium leading-[1] tracking-tight">
              Furniture that Reflects your <span className="italic font-serif text-neutral-500">Brand Status.</span>
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
              We supply, restore, and maintain furniture for Lagos' most prestigious offices, restaurants, and hotels.
            </p>
            <div className="pt-4">
               <a href="#audit-form" className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all inline-block">
                 Request a Free Furniture Audit
               </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Office Furniture" />
             </div>
             <div className="aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden translate-y-12">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Restaurant Furniture" />
             </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Brand Reputation', desc: 'Worn-out furniture tells a negative story about your business. We ensure you always look polished.' },
              { icon: TrendingUp, title: 'ROI Framing', desc: 'Restoration costs up to 60% less than full replacement. Extend the life of your premium assets.' },
              { icon: Wrench, title: 'Zero Maintenance Stress', desc: 'Emergency repairs are expensive. Our care plans prevent breakdowns before they happen.' }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-neutral-50 rounded-[3rem] space-y-6">
                <div className="w-16 h-16 bg-white text-orange-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-medium">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-medium">Partnership Tiers</h2>
            <p className="text-neutral-500">Choosing the right care for your facility.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Basic', 
                price: 'Custom', 
                features: ['Quarterly inspections', 'Minor structural repairs', 'Basic cleaning & polishing'],
                color: 'bg-white'
              },
              { 
                name: 'Standard', 
                price: 'Premium', 
                features: ['Bimonthly inspections', 'Re-oiling & finishing', 'Deep cleaning & sanitization', 'Priority emergency repair'],
                color: 'bg-white border-2 border-orange-500 shadow-xl'
              },
              { 
                name: 'Premium', 
                price: 'Elite', 
                features: ['Monthly inspections', 'Full reupholstery allocation', 'Custom modification services', '24h emergency turnaround'],
                color: 'bg-black text-white'
              }
            ].map((tier, i) => (
              <div key={i} className={`p-12 rounded-[3.5rem] space-y-8 flex flex-col justify-between ${tier.color}`}>
                <div className="space-y-6">
                  <h3 className="text-3xl font-display font-medium">{tier.name}</h3>
                  <ul className="space-y-4">
                    {tier.features.map((feat, j) => (
                      <li key={j} className="flex gap-3 text-sm font-medium">
                        <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] ${tier.name === 'Premium' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  Select {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Form */}
      <section id="audit-form" className="py-32 px-6">
        <div className="max-w-3xl mx-auto bg-neutral-900 rounded-[4rem] p-12 md:p-20 text-white text-center">
           <AnimatePresence mode="wait">
            {!isSubmitted ? (
               <motion.div
                 key="form"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="space-y-12"
               >
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-display font-medium">Request Audit</h2>
                    <p className="text-neutral-400">Get a free furniture health assessment for your business.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="grid gap-6 text-left">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-4">Full Name</label>
                        <input required name="name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-500 outline-none" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-4">Business Name</label>
                        <input required name="businessName" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-500 outline-none" placeholder="Acme Hotels" />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-4">Official Email</label>
                        <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-500 outline-none" placeholder="facility@acme.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-4">Facility Needs</label>
                        <textarea required name="needs" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-500 outline-none resize-none" placeholder="I am looking for a maintenance plan for 40 restaurant chairs..." />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="bg-orange-500 py-6 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Request Assessment</>}
                    </button>
                  </form>
               </motion.div>
            ) : (
              <motion.div
                 key="success"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="space-y-8"
              >
                <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-4xl font-display font-medium">Audit Requested</h3>
                <p className="text-neutral-400">Our B2B team will contact your facility manager within 24 hours.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-orange-500 font-bold uppercase tracking-widest text-xs underline">Send another request</button>
              </motion.div>
            )}
           </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
