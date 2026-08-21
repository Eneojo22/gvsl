import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

interface ProductItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

export function ProductSection() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShowcaseItems() {
      try {
        const q = query(
          collection(db, 'projects'),
          orderBy('createdAt', 'desc'),
          limit(8)
        );
        const snapshot = await getDocs(q);
        const fetched: ProductItem[] = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.title || 'Leadwood Exclusive',
            category: d.category || (d.type === 'home' ? 'Homes' : 'Furniture'),
            image: d.image || d.after || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200'
          };
        });
        setProducts(fetched);
      } catch (error) {
        console.error('Error loading showcase items from Firestore:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchShowcaseItems();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-orange-500" size={32} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Loading catalog showcase...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-white overflow-hidden">
        <div className="py-24 px-6 text-center bg-gray-50 border-y border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-4 block">Product Showcase</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-black">
                Tailored <span className="italic font-serif text-neutral-400">Experiences.</span>
            </h2>
        </div>
      {products.map((product, index) => (
        <ProductSlide key={product.id} product={product} index={index} totalCount={products.length} />
      ))}
    </section>
  );
}

interface ProductSlideProps {
  product: ProductItem;
  index: number;
  totalCount: number;
  key?: string | number;
}

function ProductSlide({ product, index, totalCount }: ProductSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.fromTo(imageRef.current, 
      { scale: 1.3, opacity: 0.7, y: 100 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "none" }
    ).to(imageRef.current, 
      { scale: 1.3, opacity: 0.7, y: -100, duration: 0.5, ease: "none" }
    );

    tl.fromTo(contentRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      0.1
    ).to(contentRef.current,
      { y: -100, opacity: 0, duration: 0.4, ease: "power2.in" },
      0.6
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-white border-b border-neutral-100">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Image Container */}
        <div 
          ref={imageRef} 
          className="absolute inset-0 z-0 flex items-center justify-center p-6 md:p-24"
        >
          <div className="relative w-full h-full max-w-6xl overflow-hidden rounded-[3rem] shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        {/* Content Overlay */}
        <div 
          ref={contentRef}
          className="relative z-10 text-center space-y-8 px-6"
        >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-2 rounded-full text-white">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
            </div>
            
            <h3 className="text-4xl md:text-7xl font-display font-medium text-white drop-shadow-2xl max-w-4xl tracking-tight">
                {product.name}
            </h3>

            <Link 
              to={`/contact?piece=${encodeURIComponent(product.name)}`}
              className="bg-white text-black px-10 sm:px-12 py-4.5 sm:py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl inline-flex items-center gap-4 mx-auto group select-none"
            >
              <span>Inquire & Details</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
        </div>

        {/* Progress Indicator */}
        <div className="absolute left-12 bottom-12 text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-4">
            <span className="text-black">0{index + 1}</span>
            <div className="w-12 h-[1px] bg-neutral-200">
                <div 
                    className="h-full bg-orange-500" 
                    style={{ width: `${((index + 1) / totalCount) * 100}%` }} 
                />
            </div>
            <span>0{totalCount}</span>
        </div>
      </div>
    </div>
  );
}
