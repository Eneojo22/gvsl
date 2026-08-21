/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LanguageProvider } from './lib/LanguageContext';
import { Preloader } from './components/Preloader';
import { Home } from './pages/Home';
import { ContactPage } from './pages/Contact';
import { PortfolioPage } from './pages/Portfolio';
import { LeadwoodHomesPage } from './pages/LeadwoodHomes';
import { LeadwoodFurniturePage } from './pages/LeadwoodFurniture';
import { TestimonialsPage } from './pages/Testimonials';
import { TeamPage } from './pages/Team';
import { DesignWorkflowPage } from './pages/DesignWorkflow';
import { ProjectDetailPage } from './pages/ProjectDetail';
import { AdminPage } from './pages/Admin';
import { AboutPage } from './pages/About';
import { CorporatePage } from './pages/Corporate';
import { ShopPage } from './pages/Shop';
import { WhatsAppButton } from './components/WhatsAppButton';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a minimum loading time for the preloader effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="loader" />}
        </AnimatePresence>

        <ScrollToTop />
        <div className="relative min-h-screen bg-white selection:bg-black selection:text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/homes" element={<LeadwoodHomesPage />} />
              <Route path="/furniture" element={<LeadwoodFurniturePage />} />
              <Route path="/corporate" element={<CorporatePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/furniture/design" element={<DesignWorkflowPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </LanguageProvider>
  );
}
