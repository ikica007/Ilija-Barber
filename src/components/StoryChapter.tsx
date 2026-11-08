import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, ZoomIn, Award, Users, Scissors, Sparkles } from 'lucide-react';
import { storySections } from '../data/story';
import { useLanguage } from '../context/LanguageContext';

export default function StoryChapter() {
  const { chapterId } = useParams();
  const { language, t } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const sectionIndex = storySections.findIndex(s => s.id === chapterId);
  const section = storySections[sectionIndex];

  // Close lightbox on Escape key
  useEffect(() => {
    if (!isLightboxOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  if (!section) {
    return <Navigate to="/story" replace />;
  }

  const prevSection = sectionIndex > 0 ? storySections[sectionIndex - 1] : null;
  const nextSection = sectionIndex < storySections.length - 1 ? storySections[sectionIndex + 1] : null;

  return (
    <section className="bg-brand-dark min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 font-heading">
          <Link 
            to="/story" 
            className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors mb-8 sm:mb-12 text-xs sm:text-sm tracking-widest uppercase font-medium"
          >
            <ArrowLeft size={16} />
            {t('story.back')}
          </Link>
          
          <div className="sticky top-28 hidden md:block">
            <h3 className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-6">{t('nav.story')}</h3>
            <nav className="flex flex-col gap-5">
              {storySections.map((s, idx) => (
                <Link 
                  key={s.id} 
                  to={`/story/${s.id}`} 
                  className={`flex items-start gap-3.5 group transition-colors ${s.id === chapterId ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <span className={`text-lg font-light leading-none mt-0.5 ${s.id === chapterId ? 'text-brand-orange font-medium' : 'group-hover:text-brand-orange/70'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-xs tracking-wider uppercase leading-snug">
                    {s.title[language]}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Chapter Content */}
        <div className="flex-1 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Mobile horizontal chapter pills */}
            <div className="md:hidden flex gap-2.5 overflow-x-auto pb-4 mb-6 border-b border-white/5 scrollbar-hide">
              {storySections.map((s, idx) => (
                <Link 
                  key={s.id} 
                  to={`/story/${s.id}`} 
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 border rounded-lg font-heading text-xs ${
                    s.id === chapterId ? 'border-brand-orange bg-brand-orange/15 text-white font-bold' : 'border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className={s.id === chapterId ? 'text-brand-orange' : 'text-gray-500'}>0{idx + 1}</span>
                  <span className="tracking-wide uppercase whitespace-nowrap">{s.title[language]}</span>
                </Link>
              ))}
            </div>

            {/* Chapter Header */}
            <div className="mb-8">
              <span className="text-brand-orange text-xs font-semibold tracking-[0.25em] uppercase block mb-2">
                {language === 'sr' ? `POGLAVLJE 0${sectionIndex + 1}` : `CHAPTER 0${sectionIndex + 1}`}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight font-heading uppercase">
                {section.title[language]}
              </h1>
              <div className="w-16 h-[2px] bg-brand-orange mt-4"></div>
            </div>

            {/* Framed Image Display if present (DANAS team or PARIZ diploma) */}
            {section.image && (
              <div className="my-8 sm:my-10">
                {section.image.type === 'diploma' ? (
                  /* ============================================================
                     MUSEUM-GRADE LUXURY GOLD PICTURE FRAME FOR DIPLOMA
                     ============================================================ */
                  <div className="relative group max-w-lg mx-auto">
                    {/* Atmospheric warm ambient glow behind frame */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#c59b27]/25 via-amber-600/10 to-transparent rounded-2xl blur-2xl transform group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Outer Gilded Wood Frame */}
                    <div className="relative p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#2a1b10] via-[#140b05] to-[#2a1b10] border-4 sm:border-[6px] border-[#d4af37] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.3)]">
                      {/* Inner gold fillet & matting */}
                      <div className="p-2 sm:p-3 bg-[#0a0705] border-2 border-[#b8860b]/60 rounded-md">
                        <div 
                          onClick={() => setIsLightboxOpen(true)}
                          className="relative cursor-pointer overflow-hidden rounded shadow-inner group/img"
                        >
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="w-full h-auto max-h-[500px] object-contain mx-auto select-none transition-transform duration-500 group-hover/img:scale-102"
                          />

                          {/* Glass reflection gradient */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60 group-hover/img:opacity-90 transition-opacity duration-300" />

                          {/* Hover Zoom overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-medium text-xs tracking-wider uppercase">
                            <div className="p-2.5 rounded-full bg-brand-orange shadow-lg text-white">
                              <ZoomIn className="w-4 h-4" />
                            </div>
                            <span className="drop-shadow-md">
                              {language === 'sr' ? 'Kliknite za prikaz u punoj veličini' : 'Click to view full size'}
                            </span>
                          </div>
                        </div>

                        {/* Engraved Brass Award Plaque */}
                        <div className="mt-3 p-3 rounded bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#aa771c] border border-[#8a6116] shadow-md text-center text-[#2b1e06]">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-widest font-heading uppercase">
                            <Award className="w-4 h-4 text-[#8a6116]" />
                            <span>{section.image.badge?.[language] || '5. MJESTO NA SVIJETU'}</span>
                          </div>
                          <p className="text-[11px] font-semibold tracking-wide uppercase mt-0.5 text-[#3d2c0b]">
                            {section.image.title?.[language] || 'HAIRWORLD PARIS 2017 · OMC TEAM WORLD CUP'}
                          </p>
                          <p className="text-[10px] text-[#4d3910] mt-0.5 italic">
                            LJUMOVIĆ ILIJA · MONTENEGRO (GENTS FASHION)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ============================================================
                     LUXURY BARBERSHOP FRAMED PORTRAIT FOR TEAM (DANAS)
                     ============================================================ */
                  <div className="relative group max-w-2xl mx-auto">
                    {/* Warm backlight glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/20 via-brand-orange/5 to-transparent rounded-2xl blur-2xl transform group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Modern Luxury Beveled Frame */}
                    <div className="relative p-2.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#182238] via-[#0d1320] to-[#182238] border-2 sm:border-4 border-brand-orange/60 shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(249,115,22,0.2)]">
                      <div className="p-1 sm:p-1.5 bg-[#090d16] rounded-xl border border-white/10">
                        <div 
                          onClick={() => setIsLightboxOpen(true)}
                          className="relative cursor-pointer overflow-hidden rounded-lg group/img"
                        >
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="w-full h-auto max-h-[500px] object-cover object-top select-none transition-transform duration-500 group-hover/img:scale-102"
                          />

                          {/* Hover Zoom overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-medium text-xs tracking-wider uppercase">
                            <div className="p-2.5 rounded-full bg-brand-orange shadow-lg text-white">
                              <ZoomIn className="w-4 h-4" />
                            </div>
                            <span className="drop-shadow-md">
                              {language === 'sr' ? 'Kliknite za uvećanje' : 'Click to enlarge'}
                            </span>
                          </div>
                        </div>

                        {/* Framed Caption Plaque */}
                        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-brand-orange/15 via-brand-orange/25 to-brand-orange/15 border border-brand-orange/40 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-widest text-brand-orange font-heading uppercase">
                            {section.image.type === 'portrait' ? (
                              <Scissors className="w-4 h-4" />
                            ) : section.image.type === 'runway' ? (
                              <Sparkles className="w-4 h-4" />
                            ) : (
                              <Users className="w-4 h-4" />
                            )}
                            <span>{section.image.badge?.[language] || 'ILIJA BARBER'}</span>
                          </div>
                          {section.image.title && (
                            <p className="text-[11px] font-semibold tracking-wider text-white uppercase mt-0.5">
                              {section.image.title[language]}
                            </p>
                          )}
                          <p className="text-xs text-white/90 font-medium mt-1">
                            {section.image.caption?.[language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chapter Text Content */}
            <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed font-light">
              {section.content[language].map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            {/* Footer Highlights for specific chapter */}
            {section.id === 'tradicija-danas' && (
              <div className="mt-10 p-5 rounded-xl bg-white/[0.02] border-l-4 border-brand-orange space-y-1.5">
                <p className="font-medium text-lg sm:text-xl text-white m-0">
                  {language === 'sr' ? 'Zanat koji traje.' : 'A craft that endures.'}
                </p>
                <p className="font-medium text-lg sm:text-xl text-white m-0">
                  {language === 'sr' ? 'Stil koji se prepoznaje.' : 'A style that is recognized.'}
                </p>
                <p className="font-medium text-lg sm:text-xl text-white m-0">
                  {language === 'sr' ? 'Znanje koje se prenosi.' : 'Knowledge that is passed on.'}
                </p>
              </div>
            )}
            
            {section.id === 'pariz-2019' && (
              <div className="mt-8 p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/30">
                <p className="font-medium italic text-lg sm:text-xl text-brand-orange text-center">
                  „{language === 'sr' ? 'Kvalitetan zanat ne poznaje granice.' : 'Quality craftsmanship knows no borders.'}”
                </p>
              </div>
            )}
          </motion.div>

          {/* Navigation between chapters */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-white/10 gap-4">
            {prevSection ? (
              <Link 
                to={`/story/${prevSection.id}`}
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full sm:w-auto"
              >
                <span className="text-brand-orange group-hover:-translate-x-1 transition-transform">←</span>
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">
                    {language === 'sr' ? 'Prethodno poglavlje' : 'Previous chapter'}
                  </span>
                  <span className="font-light text-sm">{prevSection.title[language]}</span>
                </div>
              </Link>
            ) : <div />}

            {nextSection && (
              <Link 
                to={`/story/${nextSection.id}`}
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full sm:w-auto text-right justify-end ml-auto"
              >
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">
                    {language === 'sr' ? 'Sljedeće poglavlje' : 'Next chapter'}
                  </span>
                  <span className="font-light text-sm">{nextSection.title[language]}</span>
                </div>
                <span className="text-brand-orange group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full-Size Image Viewing */}
      <AnimatePresence>
        {isLightboxOpen && section.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-orange text-white border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
              aria-label="Zatvori"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            >
              <img
                src={section.image.src}
                alt={section.image.alt}
                className="max-h-[80vh] w-auto max-w-[92vw] object-contain rounded-xl shadow-2xl border border-white/15"
              />
              <p className="mt-3 text-xs sm:text-sm text-white/90 text-center font-medium max-w-xl">
                {section.image.caption[language]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}