import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();

  return (
    <section id="contact" className="py-10 md:py-14 bg-brand-dark relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.1em] mb-2 uppercase">
            {language === 'sr' ? <>STUPITE U <span className="font-medium text-brand-orange">KONTAKT</span></> : <>GET IN <span className="font-medium text-brand-orange">TOUCH</span></>}
          </h2>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full"
          >
            <div className="bg-brand-blue/50 p-8 rounded-t-sm border border-white/5 border-b-0 space-y-8 flex-grow">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1 tracking-wider uppercase">{language === 'sr' ? 'LOKACIJA' : 'LOCATION'}</h4>
                      <p className="text-gray-400 text-sm">Njegoševa 12<br />81000 Podgorica</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1 tracking-wider uppercase">{language === 'sr' ? 'POZOVITE NAS' : 'CALL US'}</h4>
                      <p className="text-gray-400 text-sm">+382 67 123 456</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1 tracking-wider uppercase">{language === 'sr' ? 'RADNO VRIJEME' : 'HOURS'}</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li className="flex justify-between w-full gap-4"><span>{language === 'sr' ? 'Pon-Pet:' : 'Mon-Fri:'}</span> <span>09:00 - 20:00</span></li>
                        <li className="flex justify-between w-full gap-4"><span>{language === 'sr' ? 'Sub:' : 'Sat:'}</span> <span>09:00 - 16:00</span></li>
                        <li className="flex justify-between w-full gap-4 text-gray-500"><span>{language === 'sr' ? 'Ned:' : 'Sun:'}</span> <span>{language === 'sr' ? 'Zatvoreno' : 'Closed'}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/5 flex gap-4">
                <a href="#" className="w-12 h-12 bg-brand-dark border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300 rounded-sm">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-brand-dark border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300 rounded-sm">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            {/* Map iframe */}
            <div className="w-full h-64 sm:h-80 border border-white/5 rounded-b-sm overflow-hidden relative">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.3824497495393!2d19.258836512130312!3d42.44101183017409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134deb336c53e02f%3A0xc3440cc07ed2541b!2sNjego%C5%A1eva%2C%20Podgorica%2C%20Montenegro!5e0!3m2!1sen!2s!4v1707248102146!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) hue-rotate(180deg) brightness(0.8)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            id="book"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-brand-blue p-8 md:p-12 rounded-sm border border-white/5 relative h-full flex flex-col justify-center"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange/20 via-brand-orange to-brand-orange/20"></div>
            <div className="mb-10 text-center">
              <h3 className="text-2xl md:text-3xl font-light tracking-widest mb-2 uppercase">
                {language === 'sr' ? <>ZAKAŽITE<br/><span className="font-bold">TERMIN</span></> : <>REQUEST<br/><span className="font-bold">APPOINTMENT</span></>}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'sr' ? 'Popunite formu ispod i kontaktiraćemo vas radi potvrde.' : 'Fill out the form below and we will contact you to confirm.'}
              </p>
            </div>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'sr' ? 'Ime' : 'First Name'}</label>
                  <input type="text" className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm placeholder:text-gray-600" placeholder={language === 'sr' ? 'Petar' : 'John'} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'sr' ? 'Prezime' : 'Last Name'}</label>
                  <input type="text" className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm placeholder:text-gray-600" placeholder={language === 'sr' ? 'Petrović' : 'Doe'} />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'sr' ? 'Broj telefona' : 'Phone Number'}</label>
                <input type="tel" className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm placeholder:text-gray-600" placeholder="+382 6X XXX XXX" />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'sr' ? 'Izaberite uslugu' : 'Select Service'}</label>
                <div className="relative">
                  <select className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm appearance-none cursor-pointer">
                    <option className="bg-brand-dark">{language === 'sr' ? 'Šišanje (€15)' : 'Haircut (€15)'}</option>
                    <option className="bg-brand-dark">{language === 'sr' ? 'Sređivanje brade (€10)' : 'Beard Trim (€10)'}</option>
                    <option className="bg-brand-dark">{language === 'sr' ? 'Puni paket (€22)' : 'The Full Package (€22)'}</option>
                    <option className="bg-brand-dark">{language === 'sr' ? 'Topli peškir i brijanje (€12)' : 'Hot Towel Shave (€12)'}</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'sr' ? 'Željeni datum' : 'Preferred Date'}</label>
                  <input type="date" className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-gray-300 text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">{language === 'sr' ? 'Željeno vrijeme' : 'Preferred Time'}</label>
                  <input type="time" className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-gray-300 text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100" />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-white text-brand-dark py-4 tracking-widest text-sm font-bold hover:bg-brand-orange hover:text-white transition-colors duration-300 rounded-sm mt-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                {language === 'sr' ? 'POŠALJI ZAHTJEV' : 'SUBMIT REQUEST'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
