import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage, Language } from '../lib/LanguageContext';

import { Logo } from './Logo';

// ... No extra furniture categories in the global navbar ...

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isFurniturePage = location.pathname === '/furniture';

  const services = [
    { name: t('services.leadwoodHomes'), id: 'leadwood-homes', path: '/homes' },
    { name: t('services.leadwoodFurniture'), id: 'leadwood-furniture', path: '/furniture' },
  ];

  const languages: { code: Language; name: string }[] = [
    { code: 'EN', name: 'English' },
    { code: 'KR', name: 'Korean' },
    { code: 'ZH', name: 'Chinese' },
    { code: 'AR', name: 'Arabic' },
    { code: 'ES', name: 'Spanish' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: 'Showroom', path: '/shop' },
    { name: t('nav.testimonials'), path: '/testimonials' },
    { name: 'Meet the Team', path: '/team' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
          isFurniturePage 
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/50 text-neutral-900 shadow-sm' 
            : 'bg-transparent text-black'
        }`}
      >
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-4 p-2 pl-4 hover:opacity-75 transition-all text-left"
            aria-label="G&V Support Services Limited - Home"
          >
            <Logo className={isFurniturePage ? 'brightness-50 saturate-100 font-bold text-orange-500' : ''} />
            <div className="flex flex-col -gap-1">
              <span className={`text-[13px] font-extrabold tracking-tighter uppercase leading-none ${isFurniturePage ? 'text-black' : 'text-black'}`}>G&V Support</span>
              <span className={`text-[8px] font-bold uppercase tracking-[0.2em] leading-none ${isFurniturePage ? 'text-orange-500 opacity-90' : 'text-orange-500 opacity-80'}`}>Services Limited</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className={`hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.1em] ${isFurniturePage ? 'text-neutral-800' : 'text-black'}`}>
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 hover:text-orange-500 hover:font-extrabold transition-all cursor-pointer ${location.pathname === '/' ? 'text-orange-500 font-extrabold' : ''}`}
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
              >
                {t('nav.services')} <ChevronDown size={12} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 top-[100%] pt-4"
                  role="menu"
                >
                  <div className="bg-white shadow-2xl rounded-2xl py-3 min-w-[200px] border border-gray-100">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={service.path}
                        className="block px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 hover:font-extrabold hover:bg-gray-50 transition-all font-sans"
                        role="menuitem"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`transition-all ${
                  isFurniturePage 
                    ? 'hover:text-orange-500 ' + (location.pathname === link.path ? 'text-orange-500 font-extrabold' : 'text-neutral-800')
                    : 'hover:text-orange-500 ' + (location.pathname === link.path ? 'text-orange-500 font-extrabold' : 'text-black')
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.1em] transition-all ${isFurniturePage ? 'text-neutral-800 hover:text-orange-500' : 'text-black hover:text-orange-500'}`}
              aria-haspopup="true"
              aria-expanded={isLangOpen}
              aria-label={`Select language. Current: ${language}`}
            >
              {language} <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-4 bg-white shadow-2xl rounded-xl py-2 min-w-[120px] border border-gray-100"
                role="menu"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest hover:bg-gray-50 transition-colors ${
                      language === lang.code ? 'text-orange-500' : 'text-gray-400'
                    }`}
                    role="menuitem"
                  >
                    {lang.code} — {lang.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors relative z-[60] ${
              isMobileMenuOpen 
                ? 'text-black' 
                : isFurniturePage 
                  ? 'text-neutral-800 hover:bg-neutral-100' 
                  : 'text-black hover:bg-black/10'
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[55] md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex-1 px-8 pt-32 pb-12 overflow-y-auto">
              <nav className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">{t('nav.services')}</span>
                  <div className="space-y-6">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={service.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between text-2xl font-display font-bold text-gray-900 hover:text-orange-500 transition-colors"
                      >
                        {service.name}
                        <ArrowRight size={20} className="text-gray-300" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-col gap-6 text-2xl font-display font-bold">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.path} 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="hover:text-orange-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-12 border-t border-gray-100">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Language</span>
                  <div className="grid grid-cols-2 gap-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest transition-colors ${
                          language === lang.code ? 'text-orange-500' : 'text-gray-400 hover:text-black'
                        }`}
                      >
                        {lang.code} <span className="opacity-40">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            <div className="p-8 border-t border-gray-100 pb-12">
               <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-black text-white py-5 rounded-2xl text-center text-xs font-bold uppercase tracking-widest">
                  Let's Talk
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
