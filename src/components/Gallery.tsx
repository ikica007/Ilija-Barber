import { useState, useEffect, useRef, TouchEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const galleryImages = [
  { src: '/gallery/IMG_9964.jpeg', alt: 'Barber Ilija rad - Elegancija i klasično šišanje' },
  { src: '/gallery/IMG_9963.jpeg', alt: 'Barber Ilija rad - Precizno stilizovanje i profil' },
  { src: '/gallery/IMG_9962.jpeg', alt: 'Barber Ilija rad - Vrhunski fade prelaz i zadnji rez' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457461/Screenshot_2026-08-11_at_16.10.01_ragkye.png', alt: 'Barber Ilija Work 1' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457461/Screenshot_2026-08-11_at_16.10.08_mqyiso.png', alt: 'Barber Ilija Work 2' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457461/Screenshot_2026-08-11_at_16.09.53_km5z1d.png', alt: 'Barber Ilija Work 3' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457460/Screenshot_2026-08-11_at_16.09.29_ra7jxu.png', alt: 'Barber Ilija Work 4' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457461/Screenshot_2026-08-11_at_16.09.45_ihinn5.png', alt: 'Barber Ilija Work 5' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457460/Screenshot_2026-08-11_at_16.10.15_kgynr9.png', alt: 'Barber Ilija Work 6' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457460/Screenshot_2026-08-11_at_16.09.12_sumsj4.png', alt: 'Barber Ilija Work 7' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457461/Screenshot_2026-08-11_at_16.09.37_yrk726.png', alt: 'Barber Ilija Work 8' },
  { src: 'https://res.cloudinary.com/ipekjdii/image/upload/v1786457460/Screenshot_2026-08-11_at_16.09.20_q3m3in.png', alt: 'Barber Ilija Work 9' },
];

export default function Gallery({ preview = false }: { preview?: boolean }) {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const displayImages = preview ? galleryImages.slice(0, 3) : galleryImages;

  // Open modal for clicked image
  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPrev = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === null || prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const showNext = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === null || prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, displayImages.length]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showNext();
      else showPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="gallery" className={`py-12 md:py-16 bg-brand-dark px-4 sm:px-6 ${preview ? 'pb-16 md:pb-20' : 'pb-12'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.1em] mb-3 uppercase">
            {language === 'sr' ? <>NAŠ <span className="font-medium text-brand-orange">RAD</span></> : <>OUR <span className="font-medium text-brand-orange">WORK</span></>}
          </h2>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto"></div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openImage(index)}
              className="group overflow-hidden rounded-xl relative aspect-[3/4] sm:aspect-square bg-white/5 border border-white/10 shadow-lg cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Uvećaj sliku: ${image.alt}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openImage(index);
                }
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="self-end w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-white font-medium tracking-wide drop-shadow-md block">
                    {image.alt}
                  </span>
                  <span className="text-[10px] text-brand-orange uppercase tracking-wider font-semibold mt-1 inline-block">
                    {language === 'sr' ? 'Kliknite za uvećanje' : 'Click to enlarge'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {preview && (
          <div className="mt-16 text-center">
            <Link to="/gallery" className="inline-block bg-brand-orange text-white px-8 py-4 tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-colors duration-300 rounded-sm uppercase font-heading shadow-xl">
              {language === 'sr' ? 'Cijela Galerija' : 'Full Gallery'}
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Image Viewer Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeImage}
            className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-30 pointer-events-none">
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-white/80 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm pointer-events-auto">
                {selectedIndex + 1} / {displayImages.length}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeImage();
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-brand-orange text-white border border-white/20 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer pointer-events-auto hover:scale-105 active:scale-95"
                aria-label="Zatvori"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-brand-orange text-white border border-white/20 flex items-center justify-center transition-all duration-200 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 group"
              aria-label="Prethodna slika"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-brand-orange text-white border border-white/20 flex items-center justify-center transition-all duration-200 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 group"
              aria-label="Sledeća slika"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Centered Modal Image & Details */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={displayImages[selectedIndex].src}
                alt={displayImages[selectedIndex].alt}
                className="max-h-[75vh] w-auto max-w-[92vw] object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {/* Caption */}
              <div className="mt-3 text-center px-4">
                <p className="text-sm sm:text-base text-white font-medium drop-shadow-md">
                  {displayImages[selectedIndex].alt}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {language === 'sr' ? 'Koristite strelice ili prevucite prstom za pregled' : 'Use arrows or swipe to navigate'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
