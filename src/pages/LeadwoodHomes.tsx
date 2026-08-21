import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Loader2, 
  Home, 
  Building, 
  DollarSign, 
  ListFilter, 
  Check, 
  Bed, 
  Coins, 
  Smartphone, 
  RefreshCw, 
  Wifi, 
  Briefcase, 
  Utensils, 
  Dumbbell, 
  Users, 
  Sparkles, 
  Phone,
  ShieldCheck
} from 'lucide-react';

// Tab contents for "Luxury Living in Your Favorite Cities" (Screenshot 1)
const CITY_LIVING_TABS = [
  {
    id: 'convenience',
    label: 'Convenience is key',
    title: 'Convenience is key.',
    description: "Discover move-in-ready apartments conveniently located in the heart of major commercial districts across Lagos and Abuja. You'll be minutes away from an abundance of top-tier restaurants, cafes, financial centers, grocery stores, diplomatic hubs, and vibrant cultural destinations.",
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'luxury',
    label: 'Luxury meets comfort',
    title: 'Luxury meets comfort.',
    description: 'Every residence is outfitted with custom-crafted Leadwood furnishings, bespoke wood accents, plush designer seating, and climate-controlled living zones that effortlessly blend modern elegance with warm, inviting comfort.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'workspace',
    label: 'Modern professional workspace',
    title: 'Modern professional workspace.',
    description: 'Designed specifically for global executives and digital professionals, our dedicated workstations boast ergonomic seating, ultra-fast fiber broadband, multi-monitor desks, and whisper-quiet acoustic privacy for high-stakes video calls.',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'flexible',
    label: 'Stay as you please with flexible terms',
    title: 'Stay as you please with flexible terms.',
    description: 'Whether you require an executive residence for a 3-month corporate deployment, a full-year diplomatic lease, or an outright luxury purchase, our flexible terms adapt seamlessly to your changing timeline with zero friction.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  }
];

// Amenities data (Screenshot 2)
const AMENITIES_LIST = [
  {
    name: 'High-Speed Internet',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Equipped Home Offices',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Full Kitchens',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fitness Centers',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Coworking Areas',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Beautiful Lounges',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Professional Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fresh Linens',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600'
  }
];

// Dark section cards (Screenshot 4)
const EXACTLY_AS_SHOWN_CARDS = [
  {
    badge: 'SEPARATE SPACES',
    badgeColor: 'text-blue-400',
    title: 'A real bedroom and a separate workspace.',
    description: 'A door that closes when the workday ends. A desk built for video calls, not the corner of a kitchen table.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800'
  },
  {
    badge: 'BUILT FOR LIFE',
    badgeColor: 'text-blue-400',
    title: 'Fully equipped kitchens and in-unit laundry.',
    description: 'Eat healthier and stay better with all the comforts and conveniences of home.',
    image: 'https://images.unsplash.com/photo-1556912178-8f4c3297a3ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    badge: 'FAMILY AND PET FRIENDLY',
    badgeColor: 'text-blue-400',
    title: 'Bring the whole family, pets included.',
    description: 'Separate rooms for the kids. Pets welcome in selected Leadwood residences.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800'
  },
  {
    badge: 'RESORT-LEVEL AMENITIES',
    badgeColor: 'text-blue-400',
    title: 'Everything you need to stay your best.',
    description: 'A lap in the pool before your first call. A workout in the gym after your last. Every property has its own version of resort luxury.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800'
  }
];

export function LeadwoodHomesPage() {
  const { t } = useLanguage();
  const [dbHomes, setDbHomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Custom interactive search filter states (Lagos Island & Ikoyi focus, no price or tower)
  const [filterRentBuy, setFilterRentBuy] = useState('All');
  const [filterNeighborhood, setFilterNeighborhood] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All Locations');
  const [activeCityTab, setActiveCityTab] = useState('convenience');

  // Interactive dynamic list matching criteria
  const [appliedFilters, setAppliedFilters] = useState({
    rentBuy: 'All',
    neighborhood: 'All',
    type: 'All',
    locationPill: 'All Locations'
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchHomes() {
      try {
        const q = query(
          collection(db, 'projects'), 
          where('type', '==', 'home'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            isDynamic: true,
            title: d.title || 'Executive Suite',
            location: d.location || 'Ikoyi, Lagos',
            image: d.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
            description: d.description || 'Premium residence curated by G&V Support Services.',
            neighborhood: d.neighborhood || (d.location?.toLowerCase().includes('island') ? 'Lagos Island' : (d.location?.toLowerCase().includes('banana') ? 'Banana Island' : 'Ikoyi')),
            rentBuy: d.rentBuy || 'Buy',
            unitType: d.unitType || 'Penthouse'
          };
        });
        setDbHomes(data);
      } catch (error) {
        console.error('Error fetching homes', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomes();
  }, []);

  const allHomes = dbHomes;

  // Filter application action triggered on click
  const handleFindUnits = () => {
    setAppliedFilters({
      rentBuy: filterRentBuy,
      neighborhood: filterNeighborhood,
      type: filterType,
      locationPill: activeLocation
    });

    // Scroll smoothly to property visual showcase context section
    const target = document.getElementById('next-home-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter computation
  const filteredHomes = allHomes.filter(home => {
    const matchesRentBuy = appliedFilters.rentBuy === 'All' || home.rentBuy === appliedFilters.rentBuy;
    const matchesNeighborhood = appliedFilters.neighborhood === 'All' || home.neighborhood === appliedFilters.neighborhood;
    const matchesType = appliedFilters.type === 'All' || home.unitType === appliedFilters.type;
    
    let matchesLocationPill = true;
    if (appliedFilters.locationPill === 'Ikoyi') {
      matchesLocationPill = home.location.toLowerCase().includes('ikoyi') || home.neighborhood === 'Ikoyi';
    } else if (appliedFilters.locationPill === 'Banana Island') {
      matchesLocationPill = home.location.toLowerCase().includes('banana island') || home.neighborhood === 'Banana Island';
    } else if (appliedFilters.locationPill === 'Lagos Island') {
      matchesLocationPill = home.location.toLowerCase().includes('lagos island') || home.location.toLowerCase().includes('marina') || home.location.toLowerCase().includes('onikan') || home.neighborhood === 'Lagos Island';
    }

    return matchesRentBuy && matchesNeighborhood && matchesType && matchesLocationPill;
  });

  // Slide helper scroll functions
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 1.5 
        : scrollLeft + clientWidth / 1.5;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const currentTabContent = CITY_LIVING_TABS.find(t => t.id === activeCityTab) || CITY_LIVING_TABS[0];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 🏡 STUNNING LANDING HERO SECTION (Unchanged) */}
      <section className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-between text-white pt-24 pb-12">
        
        {/* Immersive background photo of comfortable modern kitchen/apartment */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover scale-105 filter brightness-95"
            alt="Leadwood Homes Premium Interior"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette gradient shade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content Centered overlay */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-6 my-auto pt-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white shadow-sm"
          >
            Real Estate & Housing Excellence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight leading-[1.08] max-w-4xl"
          >
            A Better Life Starts <br />
            with the <span className="font-serif italic font-light text-amber-100">Right Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-lg text-white/90 font-light max-w-xl leading-relaxed"
          >
            Discover elevated living at Leadwood. Premium housing solutions custom curated for executives, assignees, and families relocating in Nigeria.
          </motion.p>
        </div>

        {/* 🔍 Interactive Luxury Search Deck */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl md:rounded-full p-3 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-white/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:items-center">
              
              {/* 1. Rent / Buy Selector */}
              <div className="relative flex flex-col px-5 py-2 text-left lg:border-r border-neutral-100 group">
                <label className="text-[9px] font-extrabold uppercase tracking-widest text-[#C88A3E] mb-1 flex items-center gap-1.5">
                  <Home size={11} className="text-[#C88A3E]" /> Rent / Buy
                </label>
                <div className="relative flex items-center">
                  <select
                    value={filterRentBuy}
                    onChange={e => setFilterRentBuy(e.target.value)}
                    className="w-full bg-transparent border-none p-0 pr-6 text-xs sm:text-sm font-bold text-neutral-900 focus:ring-0 cursor-pointer appearance-none outline-none"
                  >
                    <option value="All">All Transactions</option>
                    <option value="Buy">Buy (For Sale)</option>
                    <option value="Rent">Rent (For Lease)</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-0 text-neutral-400 pointer-events-none group-hover:text-neutral-900 transition-colors" />
                </div>
              </div>

              {/* 2. Neighborhood Selector (Ikoyi & Lagos Island) */}
              <div className="relative flex flex-col px-5 py-2 text-left lg:border-r border-neutral-100 group">
                <label className="text-[9px] font-extrabold uppercase tracking-widest text-[#C88A3E] mb-1 flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#C88A3E]" /> Prime Location
                </label>
                <div className="relative flex items-center">
                  <select
                    value={filterNeighborhood}
                    onChange={e => setFilterNeighborhood(e.target.value)}
                    className="w-full bg-transparent border-none p-0 pr-6 text-xs sm:text-sm font-bold text-neutral-900 focus:ring-0 cursor-pointer appearance-none outline-none"
                  >
                    <option value="All">All Prime Areas</option>
                    <option value="Ikoyi">Ikoyi, Lagos</option>
                    <option value="Banana Island">Banana Island, Ikoyi</option>
                    <option value="Lagos Island">Lagos Island / Marina</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-0 text-neutral-400 pointer-events-none group-hover:text-neutral-900 transition-colors" />
                </div>
              </div>

              {/* 3. Unit Type Dropdown Selector */}
              <div className="relative flex flex-col px-5 py-2 text-left lg:border-r border-neutral-100 group">
                <label className="text-[9px] font-extrabold uppercase tracking-widest text-[#C88A3E] mb-1 flex items-center gap-1.5">
                  <ListFilter size={11} className="text-[#C88A3E]" /> Residence Type
                </label>
                <div className="relative flex items-center">
                  <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="w-full bg-transparent border-none p-0 pr-6 text-xs sm:text-sm font-bold text-neutral-900 focus:ring-0 cursor-pointer appearance-none outline-none"
                  >
                    <option value="All">Any Design Type</option>
                    <option value="Penthouse">Penthouse Suite</option>
                    <option value="Executive Suite">Executive Suite</option>
                    <option value="Villa">Diplomatic Villa</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-0 text-neutral-400 pointer-events-none group-hover:text-neutral-900 transition-colors" />
                </div>
              </div>

              {/* 4. Big Action Search Button with Brand Accent */}
              <div className="px-2 pt-2 sm:pt-0">
                <button
                  onClick={handleFindUnits}
                  className="w-full py-4 lg:py-3.5 bg-neutral-900 hover:bg-orange-500 text-white hover:text-black font-extrabold text-[10px] uppercase tracking-[0.2em] rounded-2xl md:rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md select-none flex items-center justify-center gap-3 group"
                >
                  <div className="w-4 h-4 bg-orange-500 group-hover:bg-black rounded flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform shadow-xs shrink-0">
                    <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-[1px]" />
                  </div>
                  <Search size={14} className="text-orange-400 group-hover:text-black transition-colors shrink-0" />
                  <span>Find Homes</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 SECTION 1: FLEXIBLE, FURNISHED APARTMENTS FOR TEAMS (Screenshot 3)      */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-white select-none border-b border-neutral-100">
        <div className="max-w-6xl mx-auto space-y-16 text-center">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-neutral-900 tracking-tight">
              Flexible, furnished apartments for teams
            </h2>
            <p className="text-sm md:text-base text-neutral-500 font-light">
              Empower your executives and relocation assignees with premium, turnkey residences engineered for comfort and productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center">
            
            {/* Feature 1: Elevated Quality */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-150 shadow-xs">
                <Bed size={26} strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                Elevated Quality
              </h3>
              <p className="text-xs md:text-[13px] text-neutral-500 font-light leading-relaxed max-w-xs">
                Our corporate rentals have everything business travelers need: full kitchens, comfortable spaces, fast WiFi, and premium amenities.
              </p>
            </div>

            {/* Feature 2: Cost Effective */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-150 shadow-xs">
                <Coins size={26} strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                Cost Effective
              </h3>
              <p className="text-xs md:text-[13px] text-neutral-500 font-light leading-relaxed max-w-xs">
                Save up to 40% on corporate housing compared to traditional providers. We eliminate hidden fees, providing better value to you.
              </p>
            </div>

            {/* Feature 3: Effortless and Easy */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-150 shadow-xs">
                <Smartphone size={26} strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                Effortless and Easy
              </h3>
              <p className="text-xs md:text-[13px] text-neutral-500 font-light leading-relaxed max-w-xs">
                Easily manage corporate rentals with our comprehensive platform. Plus, access dedicated support for custom requests.
              </p>
            </div>

            {/* Feature 4: Always Flexible */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-900 border border-neutral-150 shadow-xs">
                <RefreshCw size={26} strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                Always Flexible
              </h3>
              <p className="text-xs md:text-[13px] text-neutral-500 font-light leading-relaxed max-w-xs">
                When your business evolves, your housing needs should too. Scale with what works best for your team for maximum flexibility.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌌 SECTION 2: FURNISHED APARTMENTS, EXACTLY AS SHOWN (Screenshot 4)        */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 md:px-12 bg-[#0d1424] text-white select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="space-y-3 max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight">
              Furnished apartments, exactly as shown.
            </h2>
            <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
              Browse every room before you arrive. <br />
              The apartment in the photos is the one you&apos;ll walk into.
            </p>
          </div>

          {/* 4 Vertical High-Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXACTLY_AS_SHOWN_CARDS.map((card, idx) => (
              <motion.div
                key={card.badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white text-neutral-900 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Photo Top Frame */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content Details Bottom Frame */}
                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0066FF] block">
                      {card.badge}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🏙️ SECTION 3: LUXURY LIVING IN YOUR FAVORITE CITIES (Screenshot 1)         */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-[#FAF8F5] select-none border-t border-b border-neutral-150">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Main Title */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#162938] tracking-tight">
              Luxury Living in Your Favorite Cities
            </h2>
          </div>

          {/* Interactive Navigation Tabs with Underline */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-neutral-200/80 pb-3">
            {CITY_LIVING_TABS.map((tab) => {
              const isActive = activeCityTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCityTab(tab.id)}
                  className={`relative text-xs sm:text-sm font-medium pb-2 transition-colors cursor-pointer ${
                    isActive ? 'text-[#2E5948] font-bold' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCityTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2E5948] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display (2 Column Layout) */}
          <div className="pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTabContent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Left Column: Heading + Text */}
                <div className="md:col-span-5 text-left space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#162938]">
                    {currentTabContent.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {currentTabContent.description}
                  </p>
                </div>

                {/* Right Column: Clean Rounded Image */}
                <div className="md:col-span-7">
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/10] shadow-xl border border-neutral-200/60 bg-white">
                    <img 
                      src={currentTabContent.image} 
                      alt={currentTabContent.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🛎️ SECTION 4: AMENITIES (Screenshot 2)                                     */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-[#FAF8F5] select-none">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#162938]">
              Amenities
            </h2>
          </div>

          {/* 8 Amenity Cards Grid (4 columns x 2 rows) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {AMENITIES_LIST.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-2.5 pb-4 shadow-sm hover:shadow-md transition-all border border-neutral-150 flex flex-col group cursor-pointer"
              >
                {/* Amenity Photo */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-neutral-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Amenity Title Label */}
                <span className="text-xs sm:text-[13px] font-bold text-[#162938] text-left px-1.5">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📍 SECTION 5: DISCOVER YOUR NEXT HOME & RESIDENCES LISTINGS                */}
      {/* ========================================================================= */}
      <section id="next-home-section" className="py-24 px-6 md:px-12 bg-white select-none border-t border-neutral-150">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Heading & Location Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-100 pb-10">
            <div className="space-y-4 text-left">
              <h2 className="text-3xl md:text-5xl font-display font-medium text-neutral-800 tracking-tight">
                Discover Your Next Home
              </h2>
              <p className="text-sm md:text-base text-neutral-400 font-light max-w-xl">
                Find everything from cozy executive suites to penthouses tailored to fit your lifestyle and corporate relocation requirements.
              </p>
            </div>

            {/* Configurable Location Pill Indicators */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                'All Locations',
                'Ikoyi',
                'Banana Island',
                'Lagos Island'
              ].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setActiveLocation(loc);
                    setAppliedFilters(prev => ({ ...prev, locationPill: loc }));
                  }}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    activeLocation === loc 
                      ? 'bg-neutral-900 text-white shadow-sm font-extrabold border border-neutral-900' 
                      : 'bg-white text-neutral-500 hover:text-black border border-neutral-200'
                  }`}
                >
                  <MapPin size={12} className={activeLocation === loc ? 'text-[#E5A85C]' : ''} /> {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Showcase Slider Grid container */}
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4 justify-center">
              <Loader2 className="animate-spin text-[#E5A85C]" size={36} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Loading fine-vetted estates...</p>
            </div>
          ) : filteredHomes.length === 0 ? (
            <div className="py-24 text-center border border-neutral-100 bg-neutral-50/50 rounded-[3rem] px-8 max-w-lg mx-auto">
              <Building className="mx-auto text-neutral-300 mb-4 animate-pulse" size={48} />
              <p className="text-[#241318]/80 font-bold uppercase tracking-widest text-[11px] mb-2">No matching listings found</p>
              <p className="text-xs text-neutral-400 leading-relaxed">Adjust your location or residence type criteria to view available properties in our Ikoyi and Lagos Island collection.</p>
              <button 
                onClick={() => {
                  setFilterRentBuy('All');
                  setFilterNeighborhood('All');
                  setFilterType('All');
                  setActiveLocation('All Locations');
                  setAppliedFilters({ rentBuy: 'All', neighborhood: 'All', type: 'All', locationPill: 'All Locations' });
                }}
                className="mt-4 px-6 py-2.5 bg-neutral-900 text-white rounded-full text-[9px] font-extrabold uppercase tracking-widest hover:bg-orange-500 transition-all font-sans cursor-pointer"
              >
                Reset Filter Choices
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Dynamic scroll indicators */}
              <div className="flex justify-end items-center gap-3 pr-2 select-none">
                <button
                  onClick={() => scroll('left')}
                  className="w-11 h-11 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-400 hover:text-neutral-800 transition-all active:scale-90 cursor-pointer bg-white shadow-sm"
                  title="Scroll Left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-11 h-11 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-400 hover:text-neutral-800 transition-all active:scale-90 cursor-pointer bg-white shadow-sm"
                  title="Scroll Right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Slider list */}
              <div 
                ref={sliderRef}
                className="flex gap-8 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
              >
                {filteredHomes.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex-shrink-0 w-80 sm:w-96 snap-start"
                  >
                    <Link to={`/portfolio/${item.id}`} className="group cursor-pointer block space-y-5">
                      
                      {/* Image Frame with Details Hover Centered Overlay */}
                      <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-[#FAF8F5] border border-neutral-100 shadow-xl shadow-black/5 group-hover:shadow-2xl transition-all duration-[600ms]">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Transaction badge */}
                        <div className="absolute top-5 left-5 flex items-center gap-2">
                          <span className="px-3.5 py-1.5 bg-neutral-900/90 text-[8px] font-extrabold uppercase tracking-widest text-[#E5A85C] rounded-full shadow-lg backdrop-blur-sm border border-neutral-700/20">
                            For {item.rentBuy}
                          </span>
                          <span className="px-3.5 py-1.5 bg-black/60 text-[8px] font-bold uppercase tracking-widest text-white rounded-full shadow-lg backdrop-blur-sm">
                            {item.unitType}
                          </span>
                        </div>

                        {/* Centered Details Circle Hover badge */}
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 rounded-full bg-neutral-950/80 backdrop-blur-md flex items-center justify-center text-white text-[9px] font-bold uppercase tracking-widest leading-none shadow-xl border border-white/15"
                          >
                            Details
                          </motion.div>
                        </div>
                      </div>

                      {/* Content details description Under Card */}
                      <div className="space-y-1.5 text-left px-2">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-xl font-display font-medium text-neutral-800 tracking-tight group-hover:text-[#E5A85C] transition-colors leading-tight">
                            {item.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[#E5A85C] pt-0.5">
                          <MapPin size={11} className="shrink-0" />
                          <span>{item.location}</span>
                        </div>

                        <p className="text-[11px] md:text-xs text-neutral-500 font-light leading-relaxed line-clamp-2 pt-1">
                          {item.description}
                        </p>
                      </div>

                    </Link>
                  </motion.div>
                ))}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📞 BESPOKE CONSULTATION & VIEWING AUDIT BANNER                             */}
      {/* ========================================================================= */}
      <section className="py-24 bg-neutral-900 mx-6 md:mx-12 rounded-[3.5rem] mb-20 text-white text-center shadow-2xl relative overflow-hidden select-none">
        <div className="absolute inset-0 border border-white/5 rounded-[3.5rem]" />
        <div className="max-w-2xl mx-auto space-y-8 px-6 relative z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#E5A85C]">
            COMMISSION YOUR RESIDENCE EXPERT
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight">
            Ready to find <span className="italic block font-light text-[#E5A85C] mt-1">your next sanctuary?</span>
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
            Book a private meeting with our G&V support and housing team or connect directly with our concierge on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/2348137167298?text=Hello%20Leadwood%2C%20I%20would%20like%20to%20schedule%20a%20housing%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4.5 bg-[#E5A85C] text-[#241318] rounded-full inline-flex items-center gap-2 font-extrabold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-[10px] select-none shadow-xl"
            >
              <Phone size={14} /> Schedule Private Viewing
            </a>
            <Link
              to="/contact"
              className="px-8 py-4.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full inline-block font-extrabold uppercase tracking-widest transition-all text-[10px] select-none"
            >
              Contact Relocation Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
