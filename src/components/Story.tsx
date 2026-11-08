import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { storySections } from '../data/story';

export default function Story() {
  const { language, t } = useLanguage();

  return (
    <section id="story" className="bg-brand-dark min-h-screen pt-32 pb-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-brand-orange tracking-[0.2em] text-sm font-medium mb-4 uppercase">
            {t('story.subtitle')}
          </h2>
          <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-8 text-white">
            {t('story.title')}
          </h3>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto"></div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {storySections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/story/${section.id}`}
                className="group block bg-[#111] hover:bg-[#1a1a1a] border border-white/5 hover:border-brand-orange/30 transition-all duration-300 p-6 md:p-8 rounded-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-brand-orange/50 font-light text-xl sm:text-2xl group-hover:text-brand-orange transition-colors duration-300">
                      0{index + 1}
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl text-white font-light tracking-wide group-hover:tracking-wider transition-all duration-300">
                        {section.title[language]}
                      </h4>
                      {section.image && (
                        <span className="inline-flex items-center gap-1 text-[11px] tracking-wider text-brand-orange font-semibold uppercase mt-0.5">
                          ✦ {section.image.badge[language]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {section.image && (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-brand-orange/40 shrink-0 shadow-md">
                        <img src={section.image.src} alt={section.image.alt} className="w-full h-full object-cover object-top" />
                      </div>
                    )}
                    <span className="text-gray-500 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
