import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Ruler, Info, Loader2, Sofa, Check } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';



const isVideoUrl = (url?: string) => {
  if (!url) return false;
  return url.startsWith('data:video/') || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('.mov') || url.toLowerCase().includes('.ogg');
};

export function ShopPage() {
  const [filter, setFilter] = useState('All');
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Track selected active color swatch in the cards
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  const categories = [
    'All', 
    'Sofas', 
    'Armchairs', 
    'Complementary Furniture', 
    'Table and Chairs', 
    'Beds', 
    'Sofa Beds', 
    'Outdoor'
  ];

  useEffect(() => {
    async function fetchShopItems() {
      try {
        const q = query(
          collection(db, 'projects'),
          where('type', '==', 'furniture'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            isDynamic: true,
            name: d.title || '',
            price: d.price || '',
            promoPrice: d.promoPrice || '',
            dimensions: d.dimensions || 'Custom Size',
            material: d.material || 'Premium Wood',
            condition: d.condition || 'New',
            category: d.category || 'Sofas',
            image: d.image || '',
            description: d.description || '',
            inStock: d.inStock === undefined ? true : d.inStock,
            colors: d.colors || '#E5A85C,#FFFFFF,#241318'
          };
        });
        setDbProducts(fetched);
      } catch (error) {
        console.error('Error loading dynamic shop pieces:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchShopItems();
  }, []);

  const allProducts = dbProducts;

  const filteredProducts = filter === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category?.toLowerCase() === filter.toLowerCase());

  // Padding helper to format the big number counter (e.g., "1" to "01", "12" to "12")
  const formatCount = (count: number) => {
    return count < 10 ? `0${count}` : `${count}`;
  };

  return (
    <div className="bg-white pt-24 min-h-screen">
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Header styled exactly like user's request: elegant thin typography with big side indicator */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 border-b border-neutral-100 pb-16">
            <div className="space-y-4">
              <span className="text-[#E5A85C] font-extrabold uppercase tracking-[0.4em] text-[10px] block">
                SPECIAL COLLECTIONS
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-light text-neutral-800 leading-tight">
                <span className="italic block font-serif font-light text-[#241318]/90">Only the Essential,</span>
                <span className="block font-medium tracking-tight">Always the Exceptional</span>
              </h1>
            </div>
            
            {/* The giant right-side counter as requested (e.g. 03) */}
            <div className="hidden md:block select-none text-right">
              <span className="text-8-xl md:text-9xl font-serif font-light text-neutral-200/90 leading-none">
                {formatCount(filteredProducts.length)}
              </span>
              <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 mt-2">Available Pieces</p>
            </div>
          </div>

          {/* Filtering Pills */}
          <div className="flex flex-wrap gap-2.5 justify-start md:justify-center border-b border-neutral-100/50 pb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 transform active:scale-95 cursor-pointer border ${
                  filter === cat 
                    ? 'bg-[#241318] border-[#241318] text-[#E5A85C] shadow-lg shadow-black/10 scale-105' 
                    : 'bg-white border-neutral-200/70 text-neutral-500 hover:border-[#E5A85C] hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-[#E5A85C]" size={40} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#241318]/50">Checking live showroom inventory...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center border mr-2 border-neutral-100 bg-neutral-50/30 rounded-[3rem] px-8 max-w-lg mx-auto">
              <Sofa className="mx-auto text-neutral-300 mb-4" size={48} />
              <p className="text-[#241318]/50 font-bold uppercase tracking-widest text-[11px] mb-2">No matching pieces right now</p>
              <p className="text-xs text-neutral-400">Our artisans can craft exactly what you desire. Select "Request Custom" below or visit Contact page to custom build.</p>
            </div>
          ) : (
            /* Elegant grid matching user's visual reference */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {filteredProducts.map((product) => {
                const colorsList = product.colors ? product.colors.split(',').map((c: string) => c.trim()) : [];
                const currentSelectedColor = selectedColors[product.id] || colorsList[0] || '#241318';
                const hasPromo = product.promoPrice && product.promoPrice.trim() !== '';

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex flex-col items-center space-y-6 text-center"
                  >
                    {/* Visual container with off-white backdrop */}
                    <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-[#FAF8F5] transition-all duration-700 ease-out border border-neutral-100 hover:border-[#E5A85C]/30 hover:shadow-2xl hover:shadow-[#241318]/5">
                      {isVideoUrl(product.image) ? (
                        <video 
                          src={product.image} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          muted 
                          loop 
                          autoPlay 
                          playsInline 
                          controls={false}
                        />
                      ) : (
                        <img 
                          src={product.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                          alt={product.name} 
                        />
                      )}
                      
                      {/* Top status badges */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2 items-start">
                        {/* Sold out label */}
                        {!product.inStock ? (
                          <span className="px-4 py-2 bg-[#FAF8F5]/90 border border-neutral-300/50 backdrop-blur-md rounded-full text-[8px] font-extrabold uppercase tracking-widest text-[#241318] shadow-sm">
                            Unavailable / Built-to-Order
                          </span>
                        ) : (
                          <span className="px-4 py-2 bg-[#241318] rounded-full text-[8px] font-extrabold uppercase tracking-widest text-[#E5A85C] shadow-md">
                            Ready In-Showroom
                          </span>
                        )}

                        {/* Promotion Sales Tag */}
                        {hasPromo && (
                          <span className="px-4 py-2 bg-orange-500 rounded-full text-[8px] font-extrabold uppercase tracking-widest text-white shadow-md">
                            PROMOTION SALE
                          </span>
                        )}
                      </div>

                      {/* Info & Spec Overlay revealed on Hover */}
                      <div className="absolute inset-0 bg-[#241318]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 text-left text-white">
                        <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5A85C] block">SPECIFICATIONS</span>
                          <div className="space-y-2 pb-4 border-b border-white/10 text-xs">
                            <p className="flex justify-between"><span className="text-white/50">Category:</span> <span className="font-medium font-serif italic text-[#FAF8F5]">{product.category}</span></p>
                            <p className="flex justify-between"><span className="text-white/50">Dimensions:</span> <span className="font-mono text-neutral-300">{product.dimensions}</span></p>
                            <p className="flex justify-between"><span className="text-white/50">Materials:</span> <span className="text-neutral-300 truncate max-w-[150px]">{product.material}</span></p>
                            <p className="flex justify-between"><span className="text-white/50">Condition:</span> <span className="text-neutral-300">{product.condition}</span></p>
                          </div>
                          {product.description && (
                            <p className="text-[11px] text-neutral-300 italic font-light font-serif leading-relaxed line-clamp-3">
                              "{product.description}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Metadata matching user's reference: Title, Price and Color Swatches centered */}
                    <div className="w-full space-y-2">
                      {/* Name */}
                      <h3 className="text-xl md:text-2xl font-serif text-[#241318] tracking-tight">
                        {product.name}
                      </h3>
                      
                      {/* Price formatting matching layout */}
                      <div className="flex items-center justify-center gap-3">
                        {hasPromo ? (
                          <>
                            <span className="text-sm line-through text-neutral-400 font-light">
                              ₦{product.price.toString().replace('₦', '')}
                            </span>
                            <span className="text-sm text-[#241318] font-bold">
                              ₦{product.promoPrice.toString().replace('₦', '')}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-[#241318] font-medium">
                            {product.price ? (product.price.toString().startsWith('₦') ? product.price : `₦${product.price}`) : 'Pricing on Inquiry'}
                          </span>
                        )}
                      </div>

                      {/* Interactive swatches beneath price */}
                      {colorsList.length > 0 && (
                        <div className="flex justify-center items-center gap-2 pt-1.5 pb-4">
                          {colorsList.map((color, i) => {
                            const isSelected = currentSelectedColor === color;
                            return (
                              <button
                                key={i}
                                onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: color }))}
                                className="relative w-5 h-5 rounded-full border border-neutral-300 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                                style={{ backgroundColor: color }}
                                title={`Select Color: ${color}`}
                              >
                                {isSelected && (
                                  <motion.div
                                    layoutId={`check-${product.id}`}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                  >
                                    <Check size={8} className={color.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'} strokeWidth={3} />
                                  </motion.div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Direct Actions */}
                      <div className="pt-2 max-w-[280px] mx-auto grid grid-cols-2 gap-2">
                        <a 
                          href={`https://wa.me/2348137167298?text=${encodeURIComponent(
                            `Hello Leadwood Furniture, I am interested in ordering/inquiring about the "${product.name}" pieces from your showroom.\n\n` + 
                            `- Category: ${product.category}\n` +
                            `- Standard Price: ₦${product.price}\n` +
                            (hasPromo ? `- Live Promotion Price: ₦${product.promoPrice}\n` : '') +
                            `- Selected Custom Color Swatch: ${currentSelectedColor}\n` +
                            `- Dimensions: ${product.dimensions}\n\n` +
                            `Please let me know if it is available or when I can receive booking timeline estimations.`
                          )}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3 px-4 bg-[#241318] text-[#E5A85C] hover:text-white rounded-xl flex items-center justify-center gap-1.5 hover:bg-orange-600 transition-all font-bold uppercase tracking-widest text-[8px] shadow-sm select-none"
                        >
                          <MessageCircle size={12} /> Inquiry
                        </a>
                        <button 
                          onClick={() => window.location.href = `/contact?piece=${encodeURIComponent(product.name)}`}
                          className="py-3 px-4 bg-white border border-neutral-200 text-neutral-600 rounded-xl hover:border-[#E5A85C] hover:text-black transition-all font-bold uppercase tracking-widest text-[8px] select-none"
                        >
                          Request Custom
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Elegant Custom Order Design CTA */}
      <section className="py-28 bg-[#241318] mx-6 md:mx-12 rounded-[3.5rem] mb-16 text-white text-center shadow-2xl relative overflow-hidden select-none">
        <div className="absolute inset-0 border border-white/5 rounded-[3.5rem]" />
        <div className="max-w-3xl mx-auto space-y-8 px-6 relative z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#E5A85C]">
            COMMISSION A BESPOKE CREATION
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight">
            Want something <span className="italic block font-light text-[#E5A85C] mt-1">uniquely yours?</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            We build to precise architectural specifications and personal customisations. Let us design and craft your custom furniture pieces.
          </p>
          <button 
            onClick={() => window.location.href = '/furniture/design'} 
            className="px-10 py-5 bg-[#E5A85C] text-[#241318] rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all text-[10px]"
          >
            Start Your Custom Order
          </button>
        </div>
      </section>
    </div>
  );
}
