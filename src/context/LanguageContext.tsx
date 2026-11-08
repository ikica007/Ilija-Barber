import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sr: {
    'nav.home': 'POČETNA',
    'nav.services': 'USLUGE',
    'nav.gallery': 'GALERIJA',
    'nav.story': 'O NAMA',
    'nav.contact': 'KONTAKT',
    'hero.title': 'PREMIUM BARBER ISKUSTVO',
    'hero.subtitle': 'Više od frizure. Tradicija, stil i preciznost.',
    'hero.book': 'ZAKAŽI TERMIN',
    'services.title': 'NAŠE USLUGE',
    'gallery.title': 'NAŠ RAD',
    'contact.title': 'KONTAKT',
    'story.read_more': 'Pročitaj više',
    'story.back': 'Nazad na priče',
    'story.title': 'NAŠA PRIČA',
    'story.subtitle': 'Od zanata do brenda.',
  },
  en: {
    'nav.home': 'HOME',
    'nav.services': 'SERVICES',
    'nav.gallery': 'GALLERY',
    'nav.story': 'ABOUT',
    'nav.contact': 'CONTACT',
    'hero.title': 'PREMIUM BARBER EXPERIENCE',
    'hero.subtitle': 'More than a haircut. Tradition, style, and precision.',
    'hero.book': 'BOOK APPOINTMENT',
    'services.title': 'OUR SERVICES',
    'gallery.title': 'OUR WORK',
    'contact.title': 'CONTACT',
    'story.read_more': 'Read more',
    'story.back': 'Back to stories',
    'story.title': 'OUR STORY',
    'story.subtitle': 'From craft to brand.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sr');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['sr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
