import Hero from './Hero';
import Services from './Services';
import Gallery from './Gallery';
import Contact from './Contact';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  return (
    <>
      <Hero />
      <Services preview={true} />
      <Gallery preview={true} />
      <Contact />
    </>
  );
}
