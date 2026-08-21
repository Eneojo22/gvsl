import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';

import { Logo } from './Logo';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f97316] pt-24 pb-12 px-6">
      <div className="container mx-auto">
        {/* Logo at the top if needed, or just keep the huge one.
            Actually, the user said "this the logo picture", implying it should be the brand identity.
        */}
        <div className="mb-24 flex items-center justify-between">
           <div className="hidden md:block h-[1px] flex-1 bg-white/10 ml-12" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-32">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-12">
             <div className="overflow-hidden">
                <motion.h2 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-none text-white"
                >
                    {t('footer.ctaTitle')}<br />
                    <span className="opacity-40">{t('footer.ctaSub')}</span>
                </motion.h2>
             </div>
             
             <div className="relative max-w-sm">
                <input 
                    type="email" 
                    placeholder="E-mail address" 
                    aria-label="E-mail address for newsletter"
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 focus:border-white outline-none transition-colors text-white placeholder:text-white/40 font-medium"
                />
                <button 
                    className="absolute right-0 top-1/2 -translate-y-1/2 group text-white"
                    aria-label="Subscribe to newsletter"
                >
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 text-white">
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t('footer.sitemap')}</h4>
              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link to="/homes" className="hover:opacity-40 transition-opacity">{t('services.leadwoodHomes')}</Link>
                <Link to="/furniture" className="hover:opacity-40 transition-opacity">{t('services.leadwoodFurniture')}</Link>
                <Link to="/portfolio" className="hover:opacity-40 transition-opacity">{t('nav.portfolio')}</Link>
                <Link to="/locations" className="hover:opacity-40 transition-opacity">{t('nav.locations')}</Link>
                <Link to="/testimonials" className="hover:opacity-40 transition-opacity">{t('nav.testimonials')}</Link>
                <Link to="/contact" className="hover:opacity-40 transition-opacity">{t('nav.contact')}</Link>
              </nav>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t('footer.address')}</h4>
              <div className="text-sm font-medium leading-relaxed opacity-60 space-y-1">
                <p>90, Allen Avenue Ikeja Lagos, Nigeria</p>
                <p>
                  <a href="tel:+2348137167298" className="hover:text-orange-400 hover:opacity-100 transition-colors">
                    +234 813 716 7298
                  </a>
                </p>
                <p>
                  <a href="mailto:info@gvss.ng" className="hover:text-orange-400 hover:opacity-100 transition-colors">
                    info@gvss.ng
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Huge Logo Background Effect */}
        <div className="relative py-24 mb-12 overflow-hidden pointer-events-none">
            <h1 className="text-[20vw] font-display font-black tracking-tighter leading-none opacity-[0.03] select-none whitespace-nowrap">
                G&V SUPPORT SERVICES
            </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10 text-white">
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <span>© 2026 G&V Support</span>
            <a href="#" className="hover:opacity-100">Privacy Policy</a>
            <a href="#" className="hover:opacity-100">Terms of Use</a>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="p-2 hover:bg-white hover:text-black rounded-full transition-all" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" className="p-2 hover:bg-white hover:text-black rounded-full transition-all" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" className="p-2 hover:bg-white hover:text-black rounded-full transition-all" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
