import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { language } = useLanguage();
  return (
    <section id="home" className="relative h-screen min-h-[520px] max-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero_team.jpeg"
          alt="Tim Barber Ilija"
          className="w-full h-full object-cover object-[center_25%] scale-105 filter brightness-[0.68] contrast-[1.08]"
        />
        {/* Base dark tint */}
        <div className="absolute inset-0 bg-[#0a0f1d]/50 mix-blend-multiply" />
        {/* Left/right side vignette to frame the team and center text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d]/80 via-[#0a0f1d]/35 to-[#0a0f1d]/80" />
        {/* Vertical gradient: subtle dark top, transparent center, dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d]/80 via-transparent to-[#0a0f1d]" />
        {/* Deep bottom fade blending directly into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-64 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/90 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12 sm:mt-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-orange tracking-[0.3em] text-xs sm:text-sm md:text-base font-medium mb-4 sm:mb-6 uppercase"
        >
          {language === 'sr' ? 'PREMIUM BARBER ISKUSTVO' : 'PREMIUM GROOMING EXPERIENCE'}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-tight font-heading uppercase"
        >
          {language === 'sr' ? <>22 GODINE <br /> U BARBERINGU</> : <>22 YEARS <br /> IN BARBERING</>}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 font-heading"
        >
          <Link
            to="/contact"
            className="bg-brand-orange text-white px-8 py-4 tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-colors duration-300 rounded-sm w-full sm:w-auto"
          >
            {language === 'sr' ? 'ZAKAŽI TERMIN' : 'BOOK AN APPOINTMENT'}
          </Link>
          <Link
            to="/services"
            className="border border-white/30 text-white px-8 py-4 tracking-widest text-sm hover:bg-white/10 transition-colors duration-300 rounded-sm w-full sm:w-auto"
          >
            {language === 'sr' ? 'POGLEDAJ USLUGE' : 'VIEW SERVICES'}
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] text-gray-400">SCROLL</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-orange"
          />
        </div>
      </motion.div>
    </section>
  );
}
