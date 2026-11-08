import ilijaImg from '../assets/images/cartoon_barber_ilija_1794143517966.jpg';
import markoImg from '../assets/images/cartoon_barber_marko_1794143533729.jpg';
import nikolaImg from '../assets/images/cartoon_barber_nikola_1794143552238.jpg';

export interface BarberService {
  name: {
    sr: string;
    en: string;
  };
  duration?: string;
  price: string;
  description?: {
    sr: string;
    en: string;
  };
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: {
    sr: string;
    en: string;
  };
  levelBadge: string;
  tagline: {
    sr: string;
    en: string;
  };
  image: string;
  services: BarberService[];
}

export const BARBERS: Barber[] = [
  {
    id: 'ilija',
    name: 'ILIJA',
    role: {
      sr: 'MASTER BERBER',
      en: 'MASTER BARBER',
    },
    levelBadge: 'Master Barber & Osnivač',
    tagline: {
      sr: 'Vrhunski zanat, tradicija i neprikosnovena preciznost za svakog klijenta.',
      en: 'Master craftsmanship, tradition, and uncompromising precision for every client.',
    },
    image: ilijaImg,
    services: [
      {
        name: {
          sr: 'ŠIŠANJE',
          en: 'HAIRCUT',
        },
        duration: '30 min',
        price: '25 €',
        description: {
          sr: 'Precizno šišanje prilagođeno obliku lica, pranje i stilizovanje.',
          en: 'Precision haircut tailored to facial structure, wash, and styling.',
        },
      },
      {
        name: {
          sr: 'ŠIŠANJE I BRADA',
          en: 'HAIRCUT & BEARD',
        },
        duration: '40 min',
        price: '25 €',
        popular: true,
        description: {
          sr: 'Kompletno šišanje uz precizno oblikovanje i stilizovanje brade.',
          en: 'Complete haircut combined with beard styling and razor outlining.',
        },
      },
      {
        name: {
          sr: 'KRALJEVSKO BRIJANJE',
          en: 'ROYAL SHAVE',
        },
        duration: '20 min',
        price: '15 €',
        description: {
          sr: 'Tradicionalni ritual sa toplim peškirom, parom i britvom.',
          en: 'Traditional ritual with hot towels, steam, and straight razor.',
        },
      },
      {
        name: {
          sr: 'KOMPLET USLUGA (VOSAK, HEDONISTIČKI TRETMAN, BRIJANJE I ŠIŠANJE)',
          en: 'FULL SERVICE PACKAGE (WAX, HEDONISTIC, SHAVE & CUT)',
        },
        duration: '45 min',
        price: '30 €',
        popular: true,
        description: {
          sr: 'Vrhunsko hedonističko iskustvo – kompletna nega za kosu, bradu i lice.',
          en: 'The ultimate hedonistic package – full grooming for hair, beard, and facial skin.',
        },
      },
      {
        name: {
          sr: 'JUNIOR',
          en: 'JUNIOR (KIDS)',
        },
        duration: '25 min',
        price: '17 €',
        description: {
          sr: 'Stilsko i pažljivo šišanje za mlađe generacije (do 12 godina).',
          en: 'Stylish and gentle haircut for younger gents (up to 12 years).',
        },
      },
    ],
  },
  {
    id: 'marko',
    name: 'MARKO',
    role: {
      sr: 'SENIOR BERBER',
      en: 'SENIOR BARBER',
    },
    levelBadge: 'Senior Barber',
    tagline: {
      sr: 'Moderan pristup, besprekorni prelazi i posvećenost svakom detalju.',
      en: 'Modern approach, flawless fades, and dedication to every single detail.',
    },
    image: markoImg,
    services: [
      {
        name: {
          sr: 'ŠIŠANJE',
          en: 'HAIRCUT',
        },
        duration: '30 min',
        price: '17 €',
        description: {
          sr: 'Klasični ili moderni fade rez, pranje kose i završni styling.',
          en: 'Classic cut or modern skin fade, wash, and premium finish.',
        },
      },
      {
        name: {
          sr: 'ŠIŠANJE I BRADA',
          en: 'HAIRCUT & BEARD',
        },
        duration: '40 min',
        price: '20 €',
        popular: true,
        description: {
          sr: 'Kombinacija modernog šišanja i pedantnog oblikovanja brade.',
          en: 'Harmonious haircut and meticulous beard sculpting.',
        },
      },
      {
        name: {
          sr: 'KRALJEVSKO BRIJANJE',
          en: 'ROYAL SHAVE',
        },
        duration: '20 min',
        price: '13 €',
        description: {
          sr: 'Ugodno brijanje britvom sa toplim oblogama i hranljivim uljima.',
          en: 'Comfortable straight razor shave with warm compresses and nourishing oils.',
        },
      },
      {
        name: {
          sr: 'KOMPLET USLUGA (VOSAK, HEDONISTIČKI TRETMAN, BRIJANJE I ŠIŠANJE)',
          en: 'FULL SERVICE PACKAGE (WAX, HEDONISTIC, SHAVE & CUT)',
        },
        duration: '45 min',
        price: '25 €',
        popular: true,
        description: {
          sr: 'Sveobuhvatan tretman za kompletnu transformaciju i opuštanje.',
          en: 'All-inclusive grooming session for total relaxation and sharp look.',
        },
      },
      {
        name: {
          sr: 'JUNIOR',
          en: 'JUNIOR (KIDS)',
        },
        duration: '25 min',
        price: '13 €',
        description: {
          sr: 'Precizno i strpljivo šišanje za dečake uz trendi stil.',
          en: 'Precise and patient styling for young gentlemen.',
        },
      },
      {
        name: {
          sr: 'HEDONISTIČKI TRETMAN',
          en: 'HEDONISTIC TREATMENT',
        },
        duration: '1 h',
        price: '15 €',
        description: {
          sr: 'Dubinsko čišćenje i opuštajući tretman lica parom i aromaterapijom.',
          en: 'Deep facial cleansing, warm steam treatment, and relaxation therapy.',
        },
      },
    ],
  },
  {
    id: 'nikola',
    name: 'NIKOLA',
    role: {
      sr: 'SENIOR BERBER',
      en: 'SENIOR BARBER',
    },
    levelBadge: 'Senior Barber',
    tagline: {
      sr: 'Oštar pogled, geometrijska preciznost i vrhunski tretmani za bradu.',
      en: 'Sharp eye, geometric precision, and premier beard treatments.',
    },
    image: nikolaImg,
    services: [
      {
        name: {
          sr: 'ŠIŠANJE',
          en: 'HAIRCUT',
        },
        duration: '30 min',
        price: '17 €',
        description: {
          sr: 'Prilagođeno šišanje za sve tipove kose, fade ili klasična forma.',
          en: 'Tailored haircut for all hair textures, fade or classic architecture.',
        },
      },
      {
        name: {
          sr: 'ŠIŠANJE I BRADA',
          en: 'HAIRCUT & BEARD',
        },
        duration: '40 min',
        price: '20 €',
        popular: true,
        description: {
          sr: 'Usklađeno šišanje i konturisanje brade britvom.',
          en: 'Synchronized hair styling and sharp razor beard contouring.',
        },
      },
      {
        name: {
          sr: 'KRALJEVSKO BRIJANJE',
          en: 'ROYAL SHAVE',
        },
        duration: '20 min',
        price: '13 €',
        description: {
          sr: 'Glatko tradicionalno brijanje uz umirujuće balsame.',
          en: 'Smooth traditional shave with soothing after-care balms.',
        },
      },
      {
        name: {
          sr: 'KOMPLET USLUGA (VOSAK, HEDONISTIČKI TRETMAN, BRIJANJE I ŠIŠANJE)',
          en: 'FULL SERVICE PACKAGE (WAX, HEDONISTIC, SHAVE & CUT)',
        },
        duration: '45 min',
        price: '25 €',
        popular: true,
        description: {
          sr: 'Kompletan paket sa voskom za neželjene dlačice i tretmanom lica.',
          en: 'Complete package with facial waxing, grooming, and luxury care.',
        },
      },
      {
        name: {
          sr: 'JUNIOR',
          en: 'JUNIOR (KIDS)',
        },
        duration: '25 min',
        price: '13 €',
        description: {
          sr: 'Uredno i moderno šišanje za mlađe uzraste.',
          en: 'Clean, modern haircut for kids.',
        },
      },
      {
        name: {
          sr: 'HEDONISTIČKI TRETMAN',
          en: 'HEDONISTIC TREATMENT',
        },
        duration: '1 h',
        price: '15 €',
        description: {
          sr: 'Ekskluzivni ritual nege kože lica, tople obloge i masaža glave.',
          en: 'Exclusive facial skin ritual, hot towel wrap, and relaxing scalp massage.',
        },
      },
    ],
  },
];
