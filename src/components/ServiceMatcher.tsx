import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Home, Briefcase, Users, Plane, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlueprintPattern } from './Decorations';

type Step = 'profile' | 'need' | 'result';

const PROFILES = [
  { id: 'individual', title: 'Individual', icon: <Plane className="w-5 h-5" />, sub: 'I am moving alone' },
  { id: 'corporate', title: 'Corporate', icon: <Briefcase className="w-5 h-5" />, sub: 'I am managing a team' },
  { id: 'family', title: 'Family', icon: <Users className="w-5 h-5" />, sub: 'We are moving together' },
];

const NEEDS = [
  { id: 'housing', title: 'Finding a Home', sub: 'I need a secure, premium place to live' },
  { id: 'furniture', title: 'Setting up a House', sub: 'I need furniture and utilities managed' },
  { id: 'full', title: 'Complete Relocation', sub: 'I need end-to-end support for everything' },
];

const RESULTS = {
  'individual-housing': {
    title: 'Executive Stay Bundle',
    desc: 'Perfect for professionals. Focused on secure, well-located apartments with basic settling-in support.',
    features: ['Vetted secure housing', 'Local orientation', 'Airport greeting']
  },
  'corporate-full': {
    title: 'Global Mobility Shield',
    desc: 'Our most comprehensive corporate package. We handle the entire staff lifecycle in Nigeria.',
    features: ['Compliance support', 'Logistics management', '24/7 Concierge']
  },
  'family-furniture': {
    title: 'Residency Setup',
    desc: 'Transform a house into a family home within 72 hours. We handle all interiors and logistics.',
    features: ['Custom furniture packages', 'Utility registration', 'School search aid']
  },
  'default': {
    title: 'Premium Concierge Service',
    desc: 'A bespoke solution tailored to your specific timeline and requirements.',
    features: ['Dedicated manager', 'Strategic planning', 'Priority delivery']
  }
};

export function ServiceMatcher() {
  const [step, setStep] = useState<Step>('profile');
  const [selection, setSelection] = useState({ profile: '', need: '' });

  const handleSelect = (key: 'profile' | 'need', value: string) => {
    setSelection(prev => ({ ...prev, [key]: value }));
    setStep(key === 'profile' ? 'need' : 'result');
  };

  const getResult = () => {
    const key = `${selection.profile}-${selection.need}`;
    return RESULTS[key as keyof typeof RESULTS] || RESULTS.default;
  };

  const currentResult = getResult();

  return (
    <section className="py-24 px-6 bg-white overflow-hidden relative">
      <BlueprintPattern className="opacity-[0.015]" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-neutral-50 rounded-[3rem] p-8 md:p-20 relative border border-neutral-100">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">Service Matcher</span>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-black">
                Find your <span className="italic font-serif text-neutral-400">Perfect Fit.</span>
              </h2>
            </div>
            {step !== 'profile' && (
              <button 
                onClick={() => { setStep('profile'); setSelection({ profile: '', need: '' }); }}
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
                aria-label="Restart service matching quiz"
              >
                Restart Quiz
              </button>
            )}
          </div>

          <div className="min-h-[400px] flex items-center justify-center" aria-live="polite">
            <AnimatePresence mode="wait">
              {step === 'profile' && (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid md:grid-cols-3 gap-6 w-full"
                >
                  {PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect('profile', p.id)}
                      className="group bg-white p-10 rounded-[2.5rem] border border-neutral-100 hover:border-orange-500/30 transition-all text-center space-y-6 hover:shadow-2xl hover:shadow-orange-500/5"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto text-neutral-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {p.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-medium text-xl text-black">{p.title}</h3>
                        <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">{p.sub}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 'need' && (
                <motion.div 
                  key="need"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid md:grid-cols-1 gap-4 w-full"
                >
                   <p className="text-center font-bold text-neutral-400 text-xs uppercase tracking-widest mb-4">What is your primary goal?</p>
                  {NEEDS.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => handleSelect('need', n.id)}
                      className="group bg-white p-8 rounded-3xl border border-neutral-100 hover:border-orange-500/30 transition-all text-left flex items-center justify-between gap-6 hover:shadow-xl"
                    >
                      <div className="space-y-1">
                        <h3 className="font-display font-medium text-lg text-black">{n.title}</h3>
                        <p className="text-xs text-neutral-400">{n.sub}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 'result' && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 rounded-[3rem] border border-orange-500/10 shadow-2xl shadow-orange-500/5 w-full max-w-2xl text-center space-y-10"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-bold uppercase tracking-widest">
                       Optimal Match Found
                    </div>
                    <h3 className="text-4xl font-display font-medium text-black">{currentResult.title}</h3>
                    <p className="text-neutral-500 leading-relaxed max-w-sm mx-auto">
                      {currentResult.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentResult.features.map(f => (
                      <div key={f} className="flex items-center justify-center gap-2 text-[10px] font-bold text-black uppercase tracking-widest">
                        <CheckCircle2 size={14} className="text-orange-500" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link 
                      to={`/contact?interest=${encodeURIComponent(currentResult.title)}`}
                      className="w-full sm:w-auto bg-black text-white px-8 sm:px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl group select-none cursor-pointer"
                      aria-label="Consult with an expert about this service"
                    >
                      <span>Consult with an expert</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                    </Link>

                    <a
                      href={`https://wa.me/2348137167298?text=${encodeURIComponent(`Hello Leadwood, I completed your Service Matcher quiz and matched with "${currentResult.title}". I would like to discuss this.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#25D366] text-white px-6 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1ebd59] transition-all flex items-center justify-center gap-2 shadow-md select-none"
                    >
                      <span>Quick WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
