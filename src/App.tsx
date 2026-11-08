/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Story from './components/Story';
import StoryChapter from './components/StoryChapter';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroVideo from './components/IntroVideo';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <IntroVideo />
      <Router>
        <div className="min-h-screen bg-brand-blue font-body selection:bg-brand-orange selection:text-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<div className="pt-16 md:pt-20"><Services /></div>} />
              <Route path="/gallery" element={<div className="pt-16 md:pt-20"><Gallery /></div>} />
              <Route path="/story" element={<Story />} />
              <Route path="/story/:chapterId" element={<StoryChapter />} />
              <Route path="/contact" element={<div className="pt-16 md:pt-20"><Contact /></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
