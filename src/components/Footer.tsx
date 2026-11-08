import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/ILIJA_BARBER_transparent.png';

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="bg-brand-dark py-12 border-t border-white/5 text-center px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Link to="/" className="flex flex-col items-center group mb-12">
          <img 
            src={logo} 
            alt="Barber Ilija Logo" 
            className="h-28 md:h-40 w-auto object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          />
        </Link>
        
        <p className="text-gray-500 text-sm tracking-wide">
          &copy; {new Date().getFullYear()} Barber Ilija, Montenegro. {language === 'sr' ? 'Sva prava zadržana.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
