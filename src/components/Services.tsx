import { useState, useEffect, useRef, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, Sparkles, Scissors, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { BARBERS } from '../data/barbers';

export default function Services({ preview = false }: { preview?: boolean }) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const currentBarber = BARBERS[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? BARBERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === BARBERS.length - 1 ? 0 : prev + 1));
  };

  const selectBarber = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation when user uses arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      id="services" 
      className={`relative bg-[#0a0f1d] text-white py-10 sm:py-14 md:py-18 lg:py-20 ${
        preview ? 'pb-16 sm:pb-20' : 'pb-12 sm:pb-16'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-orange/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 text-brand-orange text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-2">
            <Scissors className="w-4 h-4 text-brand-orange" />
            <span>{language === 'sr' ? 'Cjenovnik & Berberi' : 'Price List & Barbers'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase font-heading">
            {language === 'sr' ? 'NAŠE USLUGE' : 'OUR SERVICES'}
          </h2>
          <p className="mt-2.5 text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {language === 'sr' 
              ? 'Izaberite svog barbera i pogledajte detaljne opcije i cijene za svakog majstora.'
              : 'Choose your preferred barber and view detailed service options and prices.'}
          </p>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto mt-3 sm:mt-4" />
        </div>

        {/* Barber Selector Tabs / Switcher Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide py-1.5 px-1 -mx-2 sm:mx-0">
          {BARBERS.map((barber, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={barber.id}
                onClick={() => selectBarber(index)}
                className={`shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2.5 sm:gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-orange/25 via-brand-orange/15 to-brand-orange/10 border-2 border-brand-orange text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white'
                }`}
                aria-pressed={isActive}
              >
                {/* Mini avatar */}
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border ${isActive ? 'border-brand-orange ring-2 ring-brand-orange/40' : 'border-white/20'}`}>
                  <img src={barber.image} alt={barber.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-left leading-tight">
                  <span className={`text-[9px] sm:text-[10px] tracking-widest block font-normal ${isActive ? 'text-brand-orange' : 'text-gray-400'}`}>
                    {barber.role[language]}
                  </span>
                  <span className="font-bold text-xs sm:text-sm">{barber.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase with Left & Right Arrows */}
        <div 
          className="relative max-w-5xl mx-auto px-0 sm:px-6 md:px-8"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop & Tablet Floating Arrow Buttons */}
          <button
            onClick={handlePrev}
            aria-label={language === 'sr' ? 'Prethodni barber' : 'Previous barber'}
            className="hidden sm:flex absolute -left-2 sm:-left-3 md:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-brand-blue/90 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 group cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            aria-label={language === 'sr' ? 'Sledeći barber' : 'Next barber'}
            className="hidden sm:flex absolute -right-2 sm:-right-3 md:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-brand-blue/90 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 group cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Card Container with animated slide */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentBarber.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-gradient-to-b from-[#11192d] to-[#0c1222] rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
                
                {/* Column 1: Animated 3D Cartoon Character */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div className="relative group w-full max-w-[280px] sm:max-w-[320px] mx-auto">
                    {/* Glowing backlight */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/30 via-brand-orange/10 to-transparent rounded-2xl blur-xl" />
                    
                    {/* Character Card Frame with subtle float */}
                    <motion.div 
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative rounded-2xl overflow-hidden border-2 border-brand-orange/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#0a0f1c] via-[#0f172a] to-[#090d18]"
                    >
                      <img
                        src={currentBarber.image}
                        alt={`${currentBarber.name} - ${currentBarber.role[language]}`}
                        className="w-full h-auto max-h-[300px] sm:max-h-[360px] md:max-h-[420px] object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Character role overlay ribbon */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/90 to-transparent p-3 sm:p-4 pt-8 text-center">
                        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-brand-orange uppercase block">
                          {currentBarber.role[language]}
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white uppercase font-heading">
                          {currentBarber.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-400 mt-1 line-clamp-2">
                          {currentBarber.tagline[language]}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile Navigation Arrows Row (Right below the character for easy thumb access) */}
                  <div className="flex sm:hidden items-center justify-between w-full max-w-[280px] mt-4 px-2">
                    <button
                      onClick={handlePrev}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold active:bg-brand-orange transition-colors"
                      aria-label="Prethodni barber"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{language === 'sr' ? 'Prethodni' : 'Prev'}</span>
                    </button>

                    <span className="text-xs font-bold text-brand-orange uppercase tracking-widest font-heading">
                      {currentIndex + 1} / {BARBERS.length}
                    </span>

                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold active:bg-brand-orange transition-colors"
                      aria-label="Sledeći barber"
                    >
                      <span>{language === 'sr' ? 'Sledeći' : 'Next'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Column 2: Exact Services & Price List */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  {/* Top Header of Cjenovnik */}
                  <div className="border-b border-white/10 pb-3 mb-4 sm:mb-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
                          {language === 'sr' ? 'CJENOVNIK' : 'PRICE LIST'}
                        </span>
                        <span className="text-gray-600">·</span>
                        <span className="text-brand-orange text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                          {currentBarber.role[language]}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-wide text-white font-heading mt-0.5">
                        {currentBarber.name}
                      </h3>
                    </div>

                    {/* Barber level badge */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentBarber.levelBadge}</span>
                    </div>
                  </div>

                  {/* List of Services with Comfortable Breathing Room */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {currentBarber.services.map((service, sIdx) => (
                      <motion.div
                        key={service.name.sr}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: sIdx * 0.04 }}
                        className="group relative p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-brand-orange/30 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-white uppercase group-hover:text-brand-orange transition-colors">
                                {service.name[language]}
                              </h4>
                              {service.duration && (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-300 bg-black/45 px-2 py-0.5 rounded border border-white/10 shrink-0">
                                  <Clock className="w-3 h-3 text-brand-orange" />
                                  {service.duration}
                                </span>
                              )}
                              {service.popular && (
                                <span className="text-[9px] sm:text-[10px] font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20 shrink-0">
                                  {language === 'sr' ? 'Popularno' : 'Popular'}
                                </span>
                              )}
                            </div>

                            {service.description && (
                              <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                                {service.description[language]}
                              </p>
                            )}
                          </div>

                          {/* Price Tag */}
                          <div className="shrink-0 text-right pt-0.5">
                            <span className="text-lg sm:text-xl md:text-2xl font-black text-brand-orange font-heading tracking-tight">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                      {language === 'sr'
                        ? 'Želite termin kod ovog berbera? Zakažite odmah online.'
                        : 'Book an appointment with this barber online.'}
                    </div>
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-white text-white hover:text-brand-dark px-6 py-3 rounded-xl font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-brand-orange/30 active:scale-95 cursor-pointer shrink-0"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{language === 'sr' ? 'Zakaži Termin' : 'Book Appointment'}</span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2.5 mt-5 sm:mt-6">
            {BARBERS.map((barber, idx) => (
              <button
                key={barber.id}
                onClick={() => selectBarber(idx)}
                aria-label={`Barber ${barber.name}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-8 h-2 bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Optional preview link */}
        {preview && (
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors duration-200 border-b border-transparent hover:border-brand-orange pb-1"
            >
              <span>{language === 'sr' ? 'Pogledaj sve detalje i cjenovnik' : 'View full details & price list'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
