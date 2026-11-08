import { useEffect, useRef, useState } from 'react';
import introDesktop from '../assets/intro_desktop.mp4';
import introMobile from '../assets/intro_mobile.mp4';
import logoImg from '../assets/ILIJA_BARBER_transparent.png';

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Choose desktop or mobile video once on mount via matchMedia
  const [videoSrc] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      return introDesktop;
    }
    return introMobile;
  });

  // Phases:
  // 'playing': video playing fullscreen
  // 'navy': video ended on last frame, dark navy overlay fading in (0.8s)
  // 'logo': logo fades in centered and holds for ~1.5s
  // 'fading_out': entire intro container fades out over 0.8s
  // 'ended': intro removed from DOM, scroll unlocked, scrolled to top
  const [phase, setPhase] = useState<'playing' | 'navy' | 'logo' | 'fading_out' | 'ended'>('playing');

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  const unlockScrollAndScrollTop = () => {
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Immediate exit when play() fails or on fatal error
  const skipImmediately = () => {
    clearAllTimeouts();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    unlockScrollAndScrollTop();
    setPhase('ended');
  };

  // Smooth jump to final fade out (for skip button or natural completion)
  const triggerFadeOut = () => {
    clearAllTimeouts();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setPhase('fading_out');

    const t = window.setTimeout(() => {
      unlockScrollAndScrollTop();
      setPhase('ended');
    }, 800);
    timeoutsRef.current.push(t);
  };

  // Lock scroll on mount and try autoplaying
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented or failed - skip intro immediately
          skipImmediately();
        });
      }
    }

    return () => {
      clearAllTimeouts();
      document.body.style.overflow = '';
    };
  }, []);

  const handleVideoEnded = () => {
    // 1. Stay on last frame and fade in dark navy overlay over 0.8s
    setPhase('navy');

    // 2. After 0.8s (800ms), fade in centered logo
    const t1 = window.setTimeout(() => {
      setPhase('logo');

      // 3. Logo holds for ~1.5s, then start final fade out (0.8s)
      const t2 = window.setTimeout(() => {
        triggerFadeOut();
      }, 1500);

      timeoutsRef.current.push(t2);
    }, 800);

    timeoutsRef.current.push(t1);
  };

  if (phase === 'ended') {
    return null;
  }

  const isFadingOut = phase === 'fading_out';
  const showNavyOverlay = phase === 'navy' || phase === 'logo';
  const showLogo = phase === 'logo';

  return (
    <div
      className={`fixed inset-0 z-[99999] h-[100dvh] w-screen overflow-hidden bg-black transition-opacity duration-[800ms] ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isFadingOut}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        onError={skipImmediately}
        className="w-full h-full object-cover"
      />

      {/* Dark Navy Overlay (#0a0f1c) */}
      <div
        className={`absolute inset-0 bg-[#0a0f1c] pointer-events-none transition-opacity duration-[800ms] ease-in-out ${
          showNavyOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Centered Cream Logo */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-[700ms] ease-in-out ${
          showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <img
          src={logoImg}
          alt="ILIJA Barber"
          className="w-[min(80vw,640px)] max-h-[70vh] object-contain drop-shadow-2xl select-none"
        />
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={triggerFadeOut}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-[100000] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase text-white/80 hover:text-white bg-black/45 hover:bg-black/70 border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
        aria-label="Preskoči uvod"
      >
        Preskoči
      </button>
    </div>
  );
}
