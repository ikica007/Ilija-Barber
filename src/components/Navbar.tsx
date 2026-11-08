import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/ILIJA_BARBER_transparent.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'sr' ? 'en' : 'sr');
  };

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.story'), href: '/story' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-dark/95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center group">
          <img 
            src={logo} 
            alt="Barber Ilija Logo" 
            className={`w-auto object-contain hover:scale-105 transition-all duration-300 ${isScrolled ? 'h-10 md:h-12' : 'h-16 md:h-20'}`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest font-heading">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-300 hover:text-white transition-colors relative after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-brand-orange hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray-300 hover:text-brand-orange transition-colors"
            title="Switch Language"
          >
            <Globe size={18} />
            <span>{language === 'sr' ? 'EN' : 'SR'}</span>
          </button>
          
          <Link
            to="/contact"
            className="ml-4 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-6 py-2.5 transition-all duration-300 rounded-sm"
          >
            {language === 'sr' ? 'ZAKAŽI TERMIN' : 'BOOK NOW'}
          </Link>
        </nav>

        {/* Mobile Menu Toggle & Language */}
        <div className="md:hidden flex items-center gap-4 font-heading">
          <button 
            onClick={toggleLanguage}
            className="text-gray-300 hover:text-brand-orange transition-colors"
          >
            <span className="text-sm font-medium">{language === 'sr' ? 'EN' : 'SR'}</span>
          </button>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-md shadow-lg border-t border-white/5 md:hidden font-heading"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-white py-2 tracking-widest text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="inline-block text-center bg-brand-orange text-white px-6 py-3 tracking-widest text-sm mt-2 rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'sr' ? 'ZAKAŽI TERMIN' : 'BOOK NOW'}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
