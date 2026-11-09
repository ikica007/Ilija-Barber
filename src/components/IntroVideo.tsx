import { useEffect, useRef, useState } from 'react';
import logoImg from '../assets/ILIJA_BARBER_transparent.png';

export default function IntroVideo() {
  // Faze:
  // 'visible': prikazuje ILIJA BARBER logo 2 sekunde
  // 'fading_out': glatki fade-out prelaz (700ms)
  // 'ended': odjavljuje se iz DOM-a, otključava skrolovanje
  const [phase, setPhase] = useState<'visible' | 'fading_out' | 'ended'>('visible');
  const timerRef = useRef<number | null>(null);

  const unlockScroll = () => {
    document.body.style.overflow = '';
  };

  const triggerFadeOut = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPhase('fading_out');
    window.setTimeout(() => {
      unlockScroll();
      setPhase('ended');
    }, 700);
  };

  useEffect(() => {
    // Zaključava skrol dok traje uvodni logo
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    // Prikazuje logo tačno 2 sekunde, pa pokreće fade-out
    timerRef.current = window.setTimeout(() => {
      triggerFadeOut();
    }, 2000);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      unlockScroll();
    };
  }, []);

  if (phase === 'ended') {
    return null;
  }

  const isFadingOut = phase === 'fading_out';

  return (
    <div
      onClick={triggerFadeOut}
      className={`fixed inset-0 z-[99999] h-[100dvh] w-screen overflow-hidden bg-[#0a0f1d] flex items-center justify-center cursor-pointer transition-opacity duration-700 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Kliknite za ulaz"
    >
      {/* Blagi ambijentalni radijalni sjaj */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.08)_0%,_rgba(10,15,29,0.95)_70%)] pointer-events-none" />

      {/* Diskretni ram */}
      <div className="absolute inset-4 sm:inset-8 border border-white/[0.04] pointer-events-none rounded-2xl" />

      {/* Centrirani ILIJA BARBER Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-xl text-center">
        <div className="relative transform transition-all duration-1000 ease-out scale-100">
          <div className="absolute -inset-6 bg-brand-orange/10 blur-2xl rounded-full pointer-events-none" />
          
          <img
            src={logoImg}
            alt="ILIJA BARBER"
            className="relative w-[min(82vw,460px)] sm:w-[480px] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] filter brightness-105"
          />
        </div>

        {/* Minimalistička linija */}
        <div className="mt-8 sm:mt-10 w-32 sm:w-40 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-transparent via-brand-orange to-transparent w-full animate-[shimmer_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Dugme Preskoči */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          triggerFadeOut();
        }}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 px-3 py-1 rounded-full text-[11px] font-medium tracking-widest uppercase text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Preskoči"
      >
        Preskoči
      </button>
    </div>
  );
}
