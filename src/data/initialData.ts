import type { Sermon, ChurchEvent, GalleryItem, Testimonial, ESIModule, ChurchSettings } from '../types';

export const initialSettings: ChurchSettings = {
  churchName: "Église Baptiste de Vitry",
  foundationYear: 1963,
  address: "138 Avenue Anatole France, 94400 Vitry-sur-Seine",
  phone: "+33 1 46 80 12 34",
  email: "contact@eglisebaptistevitry.fr",
  serviceHours: "Chaque dimanche à 10h30 (Culte principal & École du Dimanche)",
  pastorName: "Pasteur Principal",
  pastorLanguages: ["Français", "Anglais", "Portugais", "Espagnol", "Italien"],
  donationLink: "https://pay.sumup.io/b/eglise-baptiste-vitry",
  sumupQrCodeUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com",
  instagramUrl: "https://instagram.com",
  whatsappNumber: "+33612345678"
};

export const initialESIModules: ESIModule[] = [
  { id: 1, year: 1, title: "Module 1 : Panorama & Herméneutique Biblique", description: "Comprendre les principes fondamentaux d'interprétation des Écritures et l'histoire du canon biblique.", duration: "4 mois" },
  { id: 2, year: 1, title: "Module 2 : Théologie Systématique I - Dieu & la Révélation", description: "Étude approfondie de la nature de Dieu, de la Trinité et de la doctrine de la Révélation divine.", duration: "4 mois" },
  { id: 3, year: 1, title: "Module 3 : Histoire de l'Église & Réforme", description: "De l'Église primitive du 1er siècle aux mouvements réformés et baptistes contemporains.", duration: "4 mois" },
  { id: 4, year: 2, title: "Module 4 : Christologie & Sotériologie", description: "La personne et l'œuvre du Christ, l'expiation, la grâce et le salut par la foi.", duration: "4 mois" },
  { id: 5, year: 2, title: "Module 5 : Églésiologie & Sacrements", description: "La nature de l'Église locale, la communion, le baptême des croyants et la gouvernance biblique.", duration: "4 mois" },
  { id: 6, year: 2, title: "Module 6 : Homilétique & Proclamation de la Parole", description: "Art et méthode de préparation et de prédication de sermons textuels et expositoires.", duration: "4 mois" },
  { id: 7, year: 3, title: "Module 7 : Pneumatologie & Eschatologie", description: "Le Saint-Esprit, ses dons dans l'Église, et les événements de la fin des temps selon l'Écriture.", duration: "4 mois" },
  { id: 8, year: 3, title: "Module 8 : Éthique Chrétienne & Relation d'Aide", description: "Accompagnement pastoral, éthique sociale, familiale et spirituelle au quotidien.", duration: "4 mois" },
  { id: 9, year: 3, title: "Module 9 : Missiologie & Implantation d'Églises", description: "Stratégies d'évangélisation interculturelle et leadership de serviteur engagé.", duration: "4 mois" }
];

export const initialSermons: Sermon[] = [
  {
    id: "sermon-1",
    title: "La Fidélité de Dieu à Travers les Générations",
    speaker: "Pasteur Principal",
    date: "2026-09-20",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoType: "youtube",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    audioType: "url",
    mediaFormat: "both",
    description: "Un message poignant sur la constance des promesses divines depuis 1963 jusqu'à nos jours pour notre communauté de Vitry-sur-Seine.",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
    category: "Foi & Persévérance",
    duration: "45 min"
  },
  {
    id: "sermon-2",
    title: "Construire sa Maison sur le Roc Solidement",
    speaker: "Pasteur Invité",
    date: "2026-09-13",
    videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    videoType: "youtube",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    audioType: "url",
    mediaFormat: "both",
    description: "Comment ancrer sa vie chrétienne, son foyer et son service dans la vérité incontournable des Évangiles.",
    thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
    category: "Vie Chrétienne",
    duration: "52 min"
  },
  {
    id: "sermon-3",
    title: "L'Amour Fraternel et le Témoignage dans la Cité",
    speaker: "Pasteur Principal",
    date: "2026-09-06",
    videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    videoType: "youtube",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    audioType: "url",
    mediaFormat: "both",
    description: "Découvrir la puissance de l'unité et de la solidarité chrétienne au cœur de notre ville de Vitry.",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    category: "Évangélisation",
    duration: "38 min"
  }
];

export const initialEvents: ChurchEvent[] = [
  {
    id: "evt-jo-2024",
    title: "Campagne d’Évangélisation Spéciale (Jeux Olympiques)",
    date: "2024-09-12",
    time: "du 3 au 12 Septembre 2024",
    location: "Vitry-sur-Seine & Île-de-France",
    description: "Pendant les Jeux Olympiques et Paralympiques, l'évangélisation à Paris a été une occasion exceptionnelle de partager l'espérance du Christ. Retour sur un moment béni avec l'accueil d'une équipe de 25 membres de l'Église Baptiste de São Paulo (Brésil), venus prêter main forte et transmettre la parole de Dieu.",
    status: "past",
    category: "Évangélisation",
    programType: "ponctuel",
    imageUrl: "https://eglisebaptistevitry.fr/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-17.58.31-3.jpeg"
  },
  {
    id: "evt-femmes-soins-2024",
    title: "Rencontre Féminine, Témoignages & Moment Bien-Être",
    date: "2024-09-11",
    time: "14h00 - 18h00",
    location: "Église Baptiste de Vitry-sur-Seine",
    description: "Instant de témoignages, de prière et d'enseignements entre les sœurs brésiliennes et les sœurs de l'Église Baptiste de Vitry. Séance de maquillage, massage et soins offerts pour vivre un véritable moment de communion fraternelle, de délicatesse et d'unité en Christ.",
    status: "past",
    category: "Communion Féminine",
    programType: "ponctuel",
    imageUrl: "https://eglisebaptistevitry.fr/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-17.58.34-1.jpeg"
  },
  {
    id: "evt-travaux-2024",
    title: "Mobilisation pour les Travaux & Rénovation de l'Église",
    date: "2024-09-08",
    time: "09h00 - 17h00",
    location: "119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine",
    description: "Moment de solidarité et d'entraide fraternelle où la communauté s'est rassemblée avec les frères et sœurs brésiliens pour soutenir les travaux internes et externes de notre église (peinture, aménagement, rénovation et nettoyage des locaux).",
    status: "past",
    category: "Service & Entraide",
    programType: "ponctuel",
    imageUrl: "https://eglisebaptistevitry.fr/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-17.58.32-3.jpeg"
  },
  {
    id: "evt-culte-regulier",
    title: "Culte Dominical & École du Dimanche",
    date: "2026-10-04",
    time: "Tous les Dimanches de 10h30 à 12h30",
    location: "119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine",
    description: "Grand moment de louange, d'adoration et de prédication de la Parole de Dieu pour toute la famille. Prise en charge des enfants par l'École du Dimanche et la Garderie.",
    status: "upcoming",
    category: "Services",
    programType: "regulier",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "evt-priere-reguliere",
    title: "Réunion de Prière et d'Intercession",
    date: "2026-10-07",
    time: "Tous les Mercredis de 19h30 à 21h00",
    location: "119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine",
    description: "Un temps privilégié d'intercession communautaire pour les familles, les malades, notre ville et l'avancement de la foi.",
    status: "upcoming",
    category: "Prayers",
    programType: "regulier",
    imageUrl: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "evt-jeunes-regulier",
    title: "Rencontre du Groupe de Jeunes (15 à 25 ans)",
    date: "2026-10-10",
    time: "2ème et 4ème Samedis du mois de 17h30 à 21h00",
    location: "119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine",
    description: "Débats bibliques, thématiques de vie, louange, jeux, sorties et temps de partage entre jeunes.",
    status: "upcoming",
    category: "Jeunesse",
    programType: "regulier",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "evt-esi-regulier",
    title: "Session de Formation Théologique ESI",
    date: "2026-10-17",
    time: "Un Samedi par mois de 14h00 à 17h30",
    location: "Salle de Formation Théologique ESI",
    description: "Parcours de formation biblique et théologique sur 3 ans (9 modules) pour approfondir la parole et équiper les croyants.",
    status: "upcoming",
    category: "Formation ESI",
    programType: "regulier",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Culte dominical de célébration",
    category: "Culte",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80",
    date: "Septembre 2026",
    caption: "Moment de louange vibrant réunissant les familles."
  },
  {
    id: "gal-2",
    title: "Classe d'École du Dimanche pour enfants",
    category: "Communauté",
    imageUrl: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
    date: "Septembre 2026",
    caption: "Apprentissage ludique des récits bibliques par tranches d'âge."
  },
  {
    id: "gal-3",
    title: "Promotion d'étudiants ESI en cours",
    category: "Formation ESI",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    date: "Juin 2026",
    caption: "Session intensive sur l'herméneutique biblique."
  },
  {
    id: "gal-4",
    title: "Rencontre des jeunes de l'église",
    category: "Jeunesse",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    date: "Août 2026",
    caption: "Partage, amitié et approfondissement spirituel."
  },
  {
    id: "gal-5",
    title: "Baptêmes par immersion",
    category: "Événements",
    imageUrl: "https://images.unsplash.com/photo-1509021436468-d510300957cd?auto=format&fit=crop&w=800&q=80",
    date: "Juillet 2026",
    caption: "Témoignage public de foi de nouveaux croyants."
  },
  {
    id: "gal-6",
    title: "Moment de convivialité après le culte",
    category: "Communauté",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    date: "Septembre 2026",
    caption: "Fraternité et accueil chaleureux de nos visiteurs."
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    author: "Marc & Hélène D.",
    role: "Membres depuis 2015",
    content: "Une église accueillante, fidèle aux Écritures et très chaleureuse pour nos trois enfants. L'école du dimanche y est remarquable.",
    date: "2026-08-15"
  },
  {
    id: "test-2",
    author: "Samuel K.",
    role: "Étudiant Formation ESI",
    content: "La formation ESI m'a permis d'approfondir mes connaissances bibliques avec rigueur et clarté. Un véritable équilibre entre doctrine et pratique.",
    date: "2026-09-01"
  }
];
