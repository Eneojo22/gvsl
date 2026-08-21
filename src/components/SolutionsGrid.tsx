import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Briefcase, Key, ArrowRight, X, CheckCircle2, MessageCircle, Mail, Building2, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BlueprintPattern } from './Decorations';

interface SolutionItem {
  id: string;
  title: string;
  persona: string;
  icon: React.ReactNode;
  description: string;
  points: string[];
  image: string;
  targetRoute: string;
  modalDetails: {
    badge: string;
    headline: string;
    subheadline: string;
    deliverables: { title: string; desc: string }[];
    timeline: string;
    recommendedFor: string[];
    actionLabel: string;
    actionRoute: string;
  };
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'assignee',
    title: "For the Corporate Assignee",
    persona: "Moving for work",
    icon: <Compass className="w-6 h-6" />,
    description: "Focus on your role while we handle your relocation, housing, and local integration. Seamless transition from day one.",
    points: ["Meet & Greet arrival", "Housing identification", "Local orientation guides"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    targetRoute: "/leadwood-homes",
    modalDetails: {
      badge: "Executive Relocation Suite",
      headline: "Seamless Corporate Soft-Landing in Lagos",
      subheadline: "Tailored for international directors, expatriates, and corporate executives relocating to Nigeria.",
      deliverables: [
        {
          title: "VIP Airport Meet & Greet",
          desc: "Dedicated chauffeur and arrival liaison from Murtala Muhammed International Airport directly to your suite."
        },
        {
          title: "Vetted Luxury Residences",
          desc: "Curated portfolio of prime apartments and penthouses in Ikoyi, Banana Island, and Victoria Island with 24/7 power and security."
        },
        {
          title: "Turnkey Interior Fit-Out",
          desc: "Bespoke Leadwood furniture and essential appliances fully set up before your arrival."
        },
        {
          title: "Local Orientation & Concierge",
          desc: "Personalized neighborhood walkthroughs, banking setup support, SIM/connectivity activation, and dining recommendations."
        }
      ],
      timeline: "Immediate onboarding • 48-hour viewing turnaround",
      recommendedFor: ["Multinational Directors", "Expatriate Consultants", "Diplomatic Personnel"],
      actionLabel: "Explore Ikoyi & Island Homes",
      actionRoute: "/leadwood-homes"
    }
  },
  {
    id: 'hr-manager',
    title: "For the HR & Mobility Manager",
    persona: "Managing global mobility",
    icon: <Briefcase className="w-6 h-6" />,
    description: "A single point of delivery for all your team's relocation needs. We reduce administrative burden and ensure employee satisfaction.",
    points: ["Compliance support", "Furniture logistics", "Ongoing settling-in support"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    targetRoute: "/corporate",
    modalDetails: {
      badge: "Enterprise Mobility Partnership",
      headline: "End-to-End Staff Relocation & Facilities Management",
      subheadline: "Zero-stress logistics and unified corporate SLA for enterprise teams, embassies, and scaling organizations.",
      deliverables: [
        {
          title: "Single Point of Contact (SPOC)",
          desc: "A dedicated mobility manager handling all paperwork, housing leases, inventory logs, and vendor coordination."
        },
        {
          title: "Corporate Lease & Compliance",
          desc: "Streamlined corporate lease negotiation, vetting of titles, legal compliance, and tax invoice structuring."
        },
        {
          title: "Bulk Furnishing & Office Fit-Out",
          desc: "Direct-from-factory Leadwood ergonomic workstations, executive suites, and staff housing furniture packages."
        },
        {
          title: "Ongoing Maintenance & 24/7 Helpdesk",
          desc: "Scheduled maintenance, generator backup support, rapid plumbing/electrical repairs, and employee care."
        }
      ],
      timeline: "Dedicated enterprise SLA • Tier-1 corporate billing",
      recommendedFor: ["HR Directors", "Global Mobility Officers", "Facilities Managers"],
      actionLabel: "View Corporate Solutions",
      actionRoute: "/corporate"
    }
  },
  {
    id: 'family',
    title: "For the Global Family",
    persona: "Settling into a new life",
    icon: <Key className="w-6 h-6" />,
    description: "Creating a home away from home. We help families find the right schools, communities, and fully furnished spaces.",
    points: ["Family-sized housing", "School search assistance", "Full home furnishing"],
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
    targetRoute: "/leadwood-homes",
    modalDetails: {
      badge: "Family Settling-in Care",
      headline: "Your Family's Safe, Beautiful Haven in Lagos",
      subheadline: "Holistic relocation for families seeking spacious gated communities, child-safe environments, and warm interiors.",
      deliverables: [
        {
          title: "Gated Community Housing",
          desc: "Secure family homes and villas in Parkview, Old Ikoyi, and Banana Island with swimming pools, gardens, and playgrounds."
        },
        {
          title: "School Search & Admissions Liaison",
          desc: "Comprehensive guidance on premier British, American, and International schools in Lagos with enrollment assistance."
        },
        {
          title: "Custom Family Furnishing",
          desc: "Child-friendly, durable Leadwood dining sets, cozy nursery/kids bedroom setups, and master bedroom luxury pieces."
        },
        {
          title: "Domestic Staff Sourcing Support",
          desc: "Vetted recommendations for trusted domestic help, private drivers, and medical clinic registrations."
        }
      ],
      timeline: "Full family setup within 7 to 14 days",
      recommendedFor: ["Relocating Families", "Diplomatic Families", "Returning Diaspora"],
      actionLabel: "Find Family Residences",
      actionRoute: "/leadwood-homes"
    }
  }
];

export function SolutionsGrid() {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setSelectedSolution(null);
  };

  // Lock background scrolling and handle ESC key when modal is open
  useEffect(() => {
    if (selectedSolution) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedSolution]);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-neutral-50 overflow-hidden">
      <BlueprintPattern className="opacity-[0.02]" />
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="max-w-3xl mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-600 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6"
          >
            Tailored Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-black mb-4 sm:mb-6"
          >
            We define success by how quickly you feel <span className="italic font-serif text-neutral-400">at home.</span>
          </motion.h2>
          <p className="text-neutral-500 text-sm sm:text-base max-w-xl">
            Choose your transition profile below to explore our tailored packages, service deliverables, and dedicated support teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SOLUTIONS.map((solution, idx) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-neutral-100 flex flex-col h-full group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img 
                  src={solution.image} 
                  alt={solution.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/10 transition-all duration-500" />
                <div className="absolute top-5 left-5 w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                  {solution.icon}
                </div>
                <div className="absolute bottom-4 left-5">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[9px] font-extrabold uppercase tracking-widest border border-white/10">
                    {solution.persona}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-1 justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-black group-hover:text-orange-600 transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {solution.description}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {solution.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold text-black/80 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedSolution(solution)}
                    className="flex items-center gap-3 text-black hover:text-orange-600 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] group-hover:gap-4 transition-all cursor-pointer py-2"
                    aria-label={`Explore deeper into ${solution.title} solutions`}
                  >
                    <span>Explore deeper</span>
                    <div className="w-7 h-7 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                  
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                    View Package
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🚀 Mobile-Responsive Interactive Deep-Dive Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
            {/* Backdrop with dedicated dismiss */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-[2rem] sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 z-10 flex flex-col my-0 sm:my-6"
            >
              {/* Header Hero Banner */}
              <div className="relative h-36 sm:h-52 md:h-56 shrink-0 overflow-hidden">
                <img 
                  src={selectedSolution.image} 
                  alt={selectedSolution.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Prominent High-Contrast Close / Cancel Button for Mobile & Desktop */}
                <button 
                  onClick={handleClose}
                  type="button"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black text-white hover:text-orange-400 border border-white/25 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-30 shadow-lg active:scale-90"
                  aria-label="Close dialog"
                >
                  <X size={20} className="stroke-[2.5]" />
                </button>

                {/* Header Content */}
                <div className="absolute bottom-3 sm:bottom-5 left-4 sm:left-6 right-14 sm:right-16 text-white space-y-1 sm:space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-orange-500 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    {selectedSolution.modalDetails.badge}
                  </div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-medium text-white tracking-tight leading-snug">
                    {selectedSolution.modalDetails.headline}
                  </h3>
                </div>
              </div>

              {/* Modal Body - Smooth Independent Scroll */}
              <div className="p-4 sm:p-8 md:p-10 space-y-5 sm:space-y-6 overflow-y-auto overscroll-contain flex-1">
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {selectedSolution.modalDetails.subheadline}
                </p>

                {/* Deliverables Grid */}
                <div className="space-y-2.5 sm:space-y-3">
                  <h4 className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#C88A3E] flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-[#C88A3E] shrink-0" /> 
                    <span>Key Deliverables & Scope</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    {selectedSolution.modalDetails.deliverables.map((item, idx) => (
                      <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900">
                          <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed pl-5 sm:pl-5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline & Highlights - No text truncation */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start sm:items-center gap-2 font-bold text-orange-950">
                    <Clock size={15} className="text-orange-500 shrink-0 mt-0.5 sm:mt-0" />
                    <span className="leading-snug">Timeline: {selectedSolution.modalDetails.timeline}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSolution.modalDetails.recommendedFor.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-full bg-white text-orange-800 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider border border-orange-200 shadow-2xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
                {/* Mobile Cancel / Dismiss Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="order-3 sm:order-1 px-5 py-3 rounded-xl sm:rounded-2xl bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer active:scale-98 text-center"
                >
                  Cancel / Close
                </button>

                <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <a
                    href={`https://wa.me/2348137167298?text=${encodeURIComponent(`Hello Leadwood & G&V Support, I would like to inquire about the "${selectedSolution.title}" (${selectedSolution.modalDetails.badge}) package.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#25D366] text-white hover:bg-[#1ebd59] font-extrabold text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Concierge</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const route = selectedSolution.modalDetails.actionRoute;
                      handleClose();
                      navigate(route);
                    }}
                    className="px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-neutral-900 text-white hover:bg-orange-500 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
                  >
                    <span>{selectedSolution.modalDetails.actionLabel}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

