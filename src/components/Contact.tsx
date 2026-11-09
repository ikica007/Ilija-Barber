import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Instagram, Facebook, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BARBERS } from '../data/barbers';

export default function Contact() {
  const { language } = useLanguage();

  const [selectedBarberId, setSelectedBarberId] = useState<string>('ilija');
  const selectedBarber = BARBERS.find((b) => b.id === selectedBarberId) || BARBERS[0];

  const [selectedServiceName, setSelectedServiceName] = useState<string>(
    selectedBarber.services[0]?.name.sr || ''
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Kada se promeni berber, resetujemo uslugu na prvu uslugu tog berbera
  const handleBarberChange = (barberId: string) => {
    setSelectedBarberId(barberId);
    const targetBarber = BARBERS.find((b) => b.id === barberId) || BARBERS[0];
    if (targetBarber && targetBarber.services.length > 0) {
      setSelectedServiceName(targetBarber.services[0].name.sr);
    }
  };

  // Trenutno odabrana usluga sa tačnom cenom i trajanjem
  const currentServiceObj =
    selectedBarber.services.find((s) => s.name.sr === selectedServiceName) ||
    selectedBarber.services[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

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
            {language === 'sr' ? (
              <>
                STUPITE U <span className="font-medium text-brand-orange">KONTAKT</span>
              </>
            ) : (
              <>
                GET IN <span className="font-medium text-brand-orange">TOUCH</span>
              </>
            )}
          </h2>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Informacije o kontaktu & Mapa */}
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
                      <h4 className="font-semibold text-lg mb-1 tracking-wider uppercase">
                        {language === 'sr' ? 'LOKACIJA' : 'LOCATION'}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Njegoševa 12<br />81000 Podgorica
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1 tracking-wider uppercase">
                        {language === 'sr' ? 'POZOVITE NAS' : 'CALL US'}
                      </h4>
                      <p className="text-gray-400 text-sm">+382 67 123 456</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1 tracking-wider uppercase">
                        {language === 'sr' ? 'RADNO VRIJEME' : 'HOURS'}
                      </h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li className="flex justify-between w-full gap-4">
                          <span>{language === 'sr' ? 'Pon-Pet:' : 'Mon-Fri:'}</span>{' '}
                          <span>09:00 - 20:00</span>
                        </li>
                        <li className="flex justify-between w-full gap-4">
                          <span>{language === 'sr' ? 'Sub:' : 'Sat:'}</span>{' '}
                          <span>09:00 - 16:00</span>
                        </li>
                        <li className="flex justify-between w-full gap-4 text-gray-500">
                          <span>{language === 'sr' ? 'Ned:' : 'Sun:'}</span>{' '}
                          <span>{language === 'sr' ? 'Zatvoreno' : 'Closed'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-brand-dark border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300 rounded-sm"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-brand-dark border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300 rounded-sm"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Google Mapa */}
            <div className="w-full h-64 sm:h-80 border border-white/5 rounded-b-sm overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.3824497495393!2d19.258836512130312!3d42.44101183017409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134deb336c53e02f%3A0xc3440cc07ed2541b!2sNjego%C5%A1eva%2C%20Podgorica%2C%20Montenegro!5e0!3m2!1sen!2s!4v1707248102146!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'grayscale(1) invert(0.9) hue-rotate(180deg) brightness(0.8)',
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Lokacija Barber Ilija"
              ></iframe>
            </div>
          </motion.div>

          {/* Forma za zakazivanje */}
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
                {language === 'sr' ? (
                  <>
                    ZAKAŽITE<br />
                    <span className="font-bold">TERMIN</span>
                  </>
                ) : (
                  <>
                    REQUEST<br />
                    <span className="font-bold">APPOINTMENT</span>
                  </>
                )}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'sr'
                  ? 'Popunite formu ispod i kontaktiraćemo vas radi potvrde.'
                  : 'Fill out the form below and we will contact you to confirm.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-brand-orange/15 border border-brand-orange rounded-sm text-center">
                <CheckCircle2 className="w-10 h-10 text-brand-orange mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-1">
                  {language === 'sr' ? 'Zahtev je poslat!' : 'Request Sent!'}
                </h4>
                <p className="text-gray-300 text-sm">
                  {language === 'sr'
                    ? 'Uskoro ćemo vas pozvati radi potvrde željenog termina.'
                    : 'We will call you shortly to confirm your requested appointment.'}
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                      {language === 'sr' ? 'Ime' : 'First Name'}
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm placeholder:text-gray-600"
                      placeholder={language === 'sr' ? 'Petar' : 'John'}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                      {language === 'sr' ? 'Prezime' : 'Last Name'}
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm placeholder:text-gray-600"
                      placeholder={language === 'sr' ? 'Petrović' : 'Doe'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                    {language === 'sr' ? 'Broj telefona' : 'Phone Number'}
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm placeholder:text-gray-600"
                    placeholder="+382 6X XXX XXX"
                  />
                </div>

                {/* Dinamički izbor berbera */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                    {language === 'sr' ? 'Izaberite berbera' : 'Select Barber'}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBarberId}
                      onChange={(e) => handleBarberChange(e.target.value)}
                      className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm appearance-none cursor-pointer"
                    >
                      {BARBERS.map((barber) => (
                        <option key={barber.id} className="bg-brand-dark" value={barber.id}>
                          {barber.name} ({barber.role[language]})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Dinamički izbor usluge vezane za selektovanog berbera sa njegovim tačnim cijenama */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      {language === 'sr' ? 'Izaberite uslugu' : 'Select Service'}
                    </label>
                    <span className="text-[10px] uppercase tracking-wider text-brand-orange font-semibold">
                      {selectedBarber.name} · {selectedBarber.role[language]}
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedServiceName}
                      onChange={(e) => setSelectedServiceName(e.target.value)}
                      className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm appearance-none cursor-pointer"
                    >
                      {selectedBarber.services.map((service) => (
                        <option
                          key={service.name.sr}
                          className="bg-brand-dark"
                          value={service.name.sr}
                        >
                          {service.name[language]} — {service.price}
                          {service.duration ? ` (${service.duration})` : ''}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Prikaz tačne cene i trajanja odabrane usluge */}
                  {currentServiceObj && (
                    <div className="mt-2.5 px-3.5 py-2 rounded bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        {language === 'sr' ? 'Cijena usluge:' : 'Price:'}
                      </span>
                      <div className="flex items-center gap-2">
                        {currentServiceObj.duration && (
                          <span className="text-gray-400 text-[11px]">
                            {currentServiceObj.duration}
                          </span>
                        )}
                        <span className="font-bold text-brand-orange text-sm font-heading">
                          {currentServiceObj.price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                      {language === 'sr' ? 'Željeni datum' : 'Preferred Date'}
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-gray-300 text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                      {language === 'sr' ? 'Željeno vrijeme' : 'Preferred Time'}
                    </label>
                    <input
                      required
                      type="time"
                      className="w-full bg-brand-dark/30 border border-white/5 px-4 py-3.5 text-gray-300 text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-brand-dark/80 transition-all rounded-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-brand-dark py-4 tracking-widest text-sm font-bold hover:bg-brand-orange hover:text-white transition-colors duration-300 rounded-sm mt-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer"
                >
                  {language === 'sr' ? 'POŠALJI ZAHTJEV' : 'SUBMIT REQUEST'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
