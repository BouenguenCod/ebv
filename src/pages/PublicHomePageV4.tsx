import React, { useState, useEffect, memo } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { WhatsAppWidget } from '../components/public/WhatsAppWidget';
import { CustomVideoPlayer } from '../components/public/CustomVideoPlayer';
import { useData } from '../context/DataContext';
import { 
  Play, MapPin, Clock, Heart, Users,
  Sparkles, Compass, ChevronRight, X,
  Calendar, ArrowRight, Flame, ChevronDown,
  CheckCircle2, HelpCircle, Quote, UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const V4_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=75'
];

// Isolated Countdown Timer Component for 60 FPS performance (zero main tree re-renders)
const V4SundayCountdown: React.FC = memo(() => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
      nextSunday.setHours(10, 30, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2.5 text-center my-4">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-2.5 shadow-md">
        <span className="block text-xl sm:text-2xl font-black text-indigo-400">{timeLeft.days}</span>
        <span className="text-[9px] uppercase font-extrabold text-slate-400">Jours</span>
      </div>
      <div className="bg-slate-900 border border-teal-500/30 rounded-2xl p-2.5 shadow-md">
        <span className="block text-xl sm:text-2xl font-black text-teal-300">{timeLeft.hours}</span>
        <span className="text-[9px] uppercase font-extrabold text-slate-400">Heures</span>
      </div>
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-2.5 shadow-md">
        <span className="block text-xl sm:text-2xl font-black text-emerald-300">{timeLeft.minutes}</span>
        <span className="text-[9px] uppercase font-extrabold text-slate-400">Min</span>
      </div>
      <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-2.5 shadow-md">
        <span className="block text-xl sm:text-2xl font-black text-rose-400">{timeLeft.seconds}</span>
        <span className="text-[9px] uppercase font-extrabold text-slate-400">Sec</span>
      </div>
    </div>
  );
});

export const PublicHomePageV4: React.FC = () => {
  const { sermons, events, testimonials, gallery } = useData();
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [activeGroupTab, setActiveGroupTab] = useState<'enfants' | 'jeunesse' | 'esi' | 'priere'>('enfants');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Preload carousel images once on mount for instant smooth hardware-accelerated transitions
  useEffect(() => {
    V4_HERO_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % V4_HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const latestSermon = sermons[0];

  const faqItems = [
    {
      question: "À quoi dois-je m'attendre lors de ma première visite le dimanche ?",
      answer: "Le culte commence à 10h30 et dure environ 1h45. Vous serez accueilli avec le sourire par notre équipe. Le service se compose de louange contemporaine, de prière et d'une prédication vivante ancrée dans la Bible."
    },
    {
      question: "Y a-t-il une prise en charge pour mes enfants pendant le culte ?",
      answer: "Oui ! L'École du Dimanche accueille vos enfants par tranches d'âge dans des salles sécurisées avec des moniteurs qualifiés pendant le temps du message."
    },
    {
      question: "Comment venir en transports en commun à l'église ?",
      answer: "L'église est située au 138 Avenue Anatole France (et 119 Rue Louise Aglaé Crette) à Vitry-sur-Seine. Elle est très facilement accessible via le Tramway T9 (Station Camille Groult ou Musée Mac-Val) ou le RER C (Station Vitry-sur-Seine)."
    },
    {
      question: "Comment s'inscrire à la Formation Théologique ESI ?",
      answer: "La formation ESI (École de la Servante et du Serviteur de Dieu) s'adresse à tous les croyants désirant approfondir la Bible et la doctrine. Les cours ont lieu un samedi par mois. Vous pouvez contacter le secrétariat ou vous inscrire lors des cultes."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Navbar */}
      <Navbar 
        onOpenDonate={() => setShowDonateModal(true)} 
        onOpenVisitModal={() => setShowVisitModal(true)}
      />

      {/* Floating Version Switcher */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-white/95 backdrop-blur-xl border border-indigo-500/40 p-2.5 px-4 rounded-2xl shadow-2xl animate-bounce text-slate-900">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <span className="text-xs font-black text-indigo-950">Design V4 Expérience Église</span>
        <div className="flex items-center space-x-1 pl-2 border-l border-slate-200">
          <Link to="/" className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-700 font-bold">V1</Link>
          <Link to="/accueil-v2" className="px-2 py-0.5 rounded bg-teal-100 hover:bg-teal-200 text-[10px] text-teal-800 font-bold">V2</Link>
          <Link to="/accueil-v3" className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-[10px] text-amber-900 font-bold">V3</Link>
        </div>
      </div>

      <main className="flex-grow pt-20">
        
        {/* ================= 1. HERO V4 : INTENT-DRIVEN & VISITOR FIRST ================= */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 bg-slate-950 text-white">
          
          {/* Background Images Carousel */}
          {V4_HERO_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform-gpu will-change-opacity transition-opacity duration-1000 ease-in-out ${
                idx === heroImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}

          {/* Deep Slate Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-indigo-950/80" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Main Block */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Une Église Vivante & Accueillante à Vitry</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                Un lieu pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-teal-200 to-amber-200">Croire, Grandir</span> et Appartenir
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Que vous cherchiez des réponses spirituelles, un soutien chaleureux ou une communauté pour votre famille, l'Église Baptiste de Vitry vous accueille à bras ouverts.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setShowVisitModal(true)}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-extrabold text-sm shadow-2xl shadow-indigo-950/60 flex items-center space-x-2.5 transition-all transform hover:-translate-y-0.5"
                >
                  <Compass className="w-5 h-5 text-indigo-200" />
                  <span>Planifier ma venue ce dimanche</span>
                </button>

                <a
                  href="#culte-video"
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center space-x-2 transition-all backdrop-blur-md"
                >
                  <Play className="w-4 h-4 text-teal-300 fill-current" />
                  <span>Regarder un culte</span>
                </a>
              </div>

              {/* 3 Quick Steps for First Timers */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                  <span className="text-xs font-bold text-indigo-400 block">1. Culte 10h30</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Louange & Prédication</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                  <span className="text-xs font-bold text-teal-300 block">2. Pour Enfants</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">École du dimanche</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                  <span className="text-xs font-bold text-amber-400 block">3. Transports</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Tram T9 / RER C</span>
                </div>
              </div>

            </div>

            {/* Right Hero Card: Next Sunday Live & Quick Info */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 relative overflow-hidden">
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-700 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Rassemblement Dominical</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-200">
                    Dimanche à 10h30
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">Culte de Louange & Enseignement</h3>
                <p className="text-xs text-slate-600 mb-4">Ouvert à tous sans réservation. Café & accueil dès 10h15.</p>

                {/* Memoized 60 FPS Countdown */}
                <V4SundayCountdown />

                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Lieu du culte :</span>
                    </span>
                    <span className="font-bold text-slate-900">138 Ave Anatole France</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-teal-600" />
                      <span>Garderie / Enfants :</span>
                    </span>
                    <span className="font-bold text-slate-900">Prise en charge offerte</span>
                  </div>
                </div>

              </div>

              {/* Quick Donation Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between gap-4 shadow-lg text-slate-900">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Faire un Don & Soutenir</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Participez à la vie et aux ministères d'entraide.</p>
                </div>
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shrink-0 flex items-center space-x-1.5 shadow-md"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Soutenir</span>
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ================= 2. PARCOURS INTERACTIF "UN GROUPE POUR CHAQUE ÉTAPE DE LA VIE" ================= */}
        <section className="py-20 bg-slate-100/90 border-y border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200 inline-block mb-3">
                Pour Vous & Votre Famille
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Trouvez Votre Place à l'Église
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Des groupes adaptés à chaque âge et chaque étape de votre cheminement spirituel.
              </p>
            </div>

            {/* Interactive Group Tabs */}
            <div className="flex justify-center mb-10 overflow-x-auto pb-2">
              <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-md gap-2">
                <button
                  onClick={() => setActiveGroupTab('enfants')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    activeGroupTab === 'enfants' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🧒 Enfants & Familles
                </button>
                <button
                  onClick={() => setActiveGroupTab('jeunesse')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    activeGroupTab === 'jeunesse' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚡ Jeunes (15-25 ans)
                </button>
                <button
                  onClick={() => setActiveGroupTab('esi')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    activeGroupTab === 'esi' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📖 Formation ESI (3 ans)
                </button>
                <button
                  onClick={() => setActiveGroupTab('priere')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    activeGroupTab === 'priere' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🙏 Prière du Mercredi
                </button>
              </div>
            </div>

            {/* Group Tab Content Display */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
              {activeGroupTab === 'enfants' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                      École du Dimanche (Chaque Dimanche 10h30)
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">Un accueil chaleureux et sécurisé pour vos enfants</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Pendant le culte des adultes, vos enfants participent à des cours vivants adaptés à leur tranche d'âge avec des activités bibliques, chants, bricolages et enseignements bienveillants.
                    </p>
                    <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Encadrement par des moniteurs formés et passionnés</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Salles dédiées propres, chauffées et sécurisées</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80" 
                      alt="École du dimanche" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}

              {activeGroupTab === 'jeunesse' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800">
                      Groupe de Jeunes (2 samedis par mois à 17h30)
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">Amitié, louange vivante et débats passionnants</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Le groupe de jeunes rassemble des lycéens, étudiants et jeunes pro pour aborder sans tabou les questions de foi, de relations, de choix de vie et d'impact dans la société.
                    </p>
                    <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        <span>Débats bibliques pertinents & temps de louange</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        <span>Sorties conviviales, camps d'été et projets sociaux</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" 
                      alt="Groupe de Jeunesse" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}

              {activeGroupTab === 'esi' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900">
                      École Théologique ESI (1 Samedi par mois)
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">Approfondissez votre connaissance des Écritures</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      La formation ESI (École de la Servante et du Serviteur de Dieu) s'étale sur 3 ans (9 modules) pour former des disciples solides capables d'enseigner et de servir fidèlement.
                    </p>
                    <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Théologie systématique, herméneutique & histoire</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Certification et remise de diplôme en fin d'études</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" 
                      alt="Formation ESI" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}

              {activeGroupTab === 'priere' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800">
                      Réunion de Prière (Tous les Mercredis à 19h30)
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">Le moteur spirituel de notre communauté</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Un temps privilégié au milieu de la semaine pour prier les uns pour les autres, intercéder pour la ville de Vitry-sur-Seine et partager les fardeaux et les exaucements.
                    </p>
                    <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-rose-600" />
                        <span>Intercession pour les malades, les familles et la nation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-rose-600" />
                        <span>Ambiance paisible, respectueuse et portée par la foi</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=800&q=80" 
                      alt="Réunion de Prière" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ================= 3. LATEST SERMON SPOTLIGHT ================= */}
        <section id="culte-video" className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200 inline-block mb-2">
                  Média & Enseignement
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Dernier Message Enregistré
                </h2>
              </div>

              <Link
                to="/predications"
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-2 border border-slate-300 transition"
              >
                <span>Accéder à la médiathèque</span>
                <ChevronRight className="w-4 h-4 text-indigo-600" />
              </Link>
            </div>

            {/* SQLite Video Player */}
            {latestSermon && (
              <div className="shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
                <CustomVideoPlayer sermon={latestSermon} />
              </div>
            )}

          </div>
        </section>

        {/* ================= 4. UPCOMING EVENTS TIMELINE ================= */}
        <section className="py-20 bg-slate-50 relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block mb-2">
                  Vie de la Communauté
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Prochains Événements & Calendrier
                </h2>
              </div>

              <Link
                to="/events"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 text-xs font-bold flex items-center space-x-2 border border-slate-200 shadow-sm transition"
              >
                <span>Voir tout l'agenda</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.slice(0, 3).map((evt) => (
                <div key={evt.id} className="bg-white border border-slate-200 hover:border-indigo-500/40 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between transition group">
                  {evt.imageUrl && (
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src={evt.imageUrl} 
                        alt={evt.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/95 text-indigo-900 backdrop-blur-md border border-slate-200">
                          {evt.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium mb-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{evt.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-[120px]">{evt.time}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-700 transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center space-x-1 truncate max-w-[180px]">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </span>
                      <Link to="/events" className="text-indigo-700 font-bold hover:underline shrink-0">
                        S'informer →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 5. FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
        <section className="py-20 bg-white border-t border-slate-200 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center mb-12">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 inline-block mb-3">
                Guide des Nouveaux Visiteurs
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Questions Fréquentes
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Tout ce que vous aimeriez savoir avant de franchir nos portes pour la première fois.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-base hover:text-indigo-600 transition"
                  >
                    <span className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                      <span>{item.question}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  {openFaqIndex === idx && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 bg-white">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 5. GALERIE PHOTOS DE LA COMMUNAUTÉ ================= */}
        <section className="py-20 bg-slate-100/80 border-t border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-200 inline-block mb-3">
                Galerie de l'Église
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                La Vie de Notre Communauté en Images
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Célébration, louange, école du dimanche, jeunesse et fraternité à Vitry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.slice(0, 6).map((item) => (
                <div key={item.id} className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white aspect-video shadow-md hover:shadow-xl transition-all">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-600/90 text-white border border-indigo-400/40 inline-block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                    {item.caption && <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">{item.caption}</p>}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 6. TÉMOIGNAGES DE LA COMMUNAUTÉ ================= */}
        <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white border-t border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 inline-block mb-3">
                Témoignages Vivants
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Ce que Vivent Nos Membres
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Découvrez l'impact de l'Évangile et de la communion fraternelle dans la vie des fidèles et des étudiants ESI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-8 relative shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
                  <Quote className="w-10 h-10 text-indigo-600/15 absolute top-6 right-6 pointer-events-none" />

                  <p className="text-slate-700 text-sm italic leading-relaxed mb-6 font-normal">
                    "{t.content}"
                  </p>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                        <span>{t.author}</span>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </h4>
                      <span className="text-xs text-slate-500">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
      <WhatsAppWidget />

      {/* ================= FIRST VISIT MODAL DRAWER ================= */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6 text-slate-900">
            <button
              onClick={() => setShowVisitModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8 text-indigo-600" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Votre Première Visite à l'Église</h3>
                <p className="text-xs text-slate-500">Tout ce que vous devez savoir pour votre accueil</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-900 block">1. Accès & Transports</span>
                <p className="text-slate-600">138 Avenue Anatole France, 94400 Vitry-sur-Seine. Accès rapide via Tramway T9 ou RER C.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-teal-900 block">2. Horaires & Déroulement</span>
                <p className="text-slate-600">Le culte débute à 10h30. Arrivez 15 minutes avant pour être accueilli avec un café.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-900 block">3. Prise en charge des enfants</span>
                <p className="text-slate-600">École du Dimanche offerte et encadrée par tranches d'âge pendant la prédication.</p>
              </div>
            </div>

            <button
              onClick={() => setShowVisitModal(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Compris, à dimanche !
            </button>
          </div>
        </div>
      )}

      {/* ================= DONATE MODAL ================= */}
      {showDonateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 text-slate-900">
            <button
              onClick={() => setShowDonateModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-rose-600 fill-current" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Soutenir l'Église de Vitry</h3>
                <p className="text-xs text-slate-500">Vos dons permettent de financer le ministère et l'entraide</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Bénéficiaire :</span>
                <span className="text-indigo-900 font-bold">Église Baptiste de Vitry</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">IBAN :</span>
                <span className="text-slate-900 font-bold">FR76 1234 5678 9012 3456 7890 123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">BIC :</span>
                <span className="text-slate-900 font-bold">BNPAFRPPXXX</span>
              </div>
            </div>

            <button
              onClick={() => setShowDonateModal(false)}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
