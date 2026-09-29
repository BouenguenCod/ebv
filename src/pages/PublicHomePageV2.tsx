import React, { useState, useEffect, memo } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { WhatsAppWidget } from '../components/public/WhatsAppWidget';
import { CustomVideoPlayer } from '../components/public/CustomVideoPlayer';
import { useData } from '../context/DataContext';
import { 
  Play, MapPin, Clock, Heart, Users, BookOpen, 
  Sparkles, Compass, Radio, Award, ChevronRight, X,
  Calendar, Quote, ArrowRight, UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Optimized carousel image URLs (compressed for fast loading)
const HERO_BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=75'
];

// Isolated Countdown Component so 1-second ticks DO NOT re-render the whole page
const SundayCountdownBox: React.FC = memo(() => {
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
    <div className="grid grid-cols-4 gap-3 text-center mb-6">
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3">
        <span className="block text-2xl sm:text-3xl font-black text-slate-900">{timeLeft.days}</span>
        <span className="text-[10px] uppercase font-bold text-slate-500">Jours</span>
      </div>
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3">
        <span className="block text-2xl sm:text-3xl font-black text-teal-700">{timeLeft.hours}</span>
        <span className="text-[10px] uppercase font-bold text-teal-600">Heures</span>
      </div>
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3">
        <span className="block text-2xl sm:text-3xl font-black text-emerald-700">{timeLeft.minutes}</span>
        <span className="text-[10px] uppercase font-bold text-emerald-600">Min</span>
      </div>
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3">
        <span className="block text-2xl sm:text-3xl font-black text-rose-600">{timeLeft.seconds}</span>
        <span className="text-[10px] uppercase font-bold text-rose-500">Sec</span>
      </div>
    </div>
  );
});

export const PublicHomePageV2: React.FC = () => {
  const { sermons, events, testimonials, esiModules } = useData();
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'vision' | 'services' | 'history'>('vision');
  
  // Hero Carousel State
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Preload background images once on mount for instant smooth transitions
  useEffect(() => {
    HERO_BACKGROUND_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Latest Sermon for Hero Media Feature
  const latestSermon = sermons[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-600 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar 
        onOpenDonate={() => setShowDonateModal(true)} 
        onOpenVisitModal={() => setShowVisitModal(true)}
      />

      {/* Floating Version Switcher */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-white/95 backdrop-blur-xl border border-teal-500/40 p-2.5 px-4 rounded-2xl shadow-2xl animate-bounce">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <span className="text-xs font-bold text-slate-800">Design V2 Optimisé</span>
        <Link 
          to="/" 
          className="px-3 py-1 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-[11px] font-extrabold transition"
        >
          Retour V1
        </Link>
      </div>

      <main className="flex-grow pt-20">
        
        {/* ================= 1. CINEMATIC HERO WITH HARDWARE ACCELERATED CAROUSEL ================= */}
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 bg-slate-900 text-white">
          
          {/* Background Images Carousel with will-change and transform-gpu */}
          {HERO_BACKGROUND_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform-gpu will-change-opacity transition-opacity duration-1000 ease-in-out ${
                idx === heroImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-[rgb(53,125,122)]/75" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text Block */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Fondée en 1963 • Vitry-sur-Seine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                Bienvenue à l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-200 to-amber-200">Église Baptiste</span> de Vitry
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Une communauté vivante, accueillante et multiculturelle ancrée dans les Évangiles. 
                Rejoignez-nous chaque dimanche à 10h30 pour célébrer, prier et grandir ensemble.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => setShowVisitModal(true)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[rgb(53,125,122)] to-teal-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-teal-950/40 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Compass className="w-5 h-5" />
                  <span>Planifier ma première visite</span>
                </button>

                <a
                  href="#sermons-v2"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center space-x-2 transition-all backdrop-blur-md"
                >
                  <Play className="w-4 h-4 text-teal-300 fill-current" />
                  <span>Voir le dernier culte</span>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/15 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-teal-300">60+ Ans</span>
                  <span className="text-xs text-slate-300 font-medium">Présence à Vitry</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-300">5 Langues</span>
                  <span className="text-xs text-slate-300 font-medium">Communauté</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-amber-300">300+</span>
                  <span className="text-xs text-slate-300 font-medium">Fidèles & Membres</span>
                </div>
              </div>

            </div>

            {/* Right Hero Countdown Box */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Next Service Live Countdown Box */}
              <div className="bg-white/95 border border-white/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-slate-800 relative overflow-hidden group">
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[rgb(53,125,122)] flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Prochain Culte Dominical</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-200">
                    Dimanche 10h30
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-6">Compte à rebours avant le culte</h3>

                {/* Isolated Ultra-Fast Countdown */}
                <SundayCountdownBox />

                <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      <span>Adresse :</span>
                    </span>
                    <span className="font-bold text-slate-900">138 Ave Anatole France</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Enfants :</span>
                    </span>
                    <span className="font-bold text-slate-900">École du Dimanche offerte</span>
                  </div>
                </div>

              </div>

              {/* Quick Donation Card */}
              <div className="bg-white/95 border border-white/50 rounded-3xl p-6 flex items-center justify-between gap-4 shadow-xl text-slate-800">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Soutenir le Ministère</h4>
                  <p className="text-xs text-slate-600 mt-1">Participez à la vie et aux projets d'entraide de l'église.</p>
                </div>
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shrink-0 flex items-center space-x-1.5 shadow-md"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Faire un don</span>
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ================= 2. INTERACTIVE VISION & SERVICES TABS ================= */}
        <section className="py-20 bg-slate-100/80 border-y border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200 inline-block mb-3">
                Découvrir l'Église
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Nos Valeurs & Rassemblements
              </h2>
            </div>

            {/* Tab Selector */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-md gap-2">
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    activeTab === 'vision' ? 'bg-[rgb(53,125,122)] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Notre Vision Spirituelle
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    activeTab === 'services' ? 'bg-[rgb(53,125,122)] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Horaires des Cultes
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    activeTab === 'history' ? 'bg-[rgb(53,125,122)] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Notre Histoire (Depuis 1963)
                </button>
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
              {activeTab === 'vision' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
                  <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black">01</div>
                    <h3 className="text-xl font-bold text-slate-900">Enseignement Biblique</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Proclamer fidèlement la vérité des Écritures avec rigueur, clarté et application pratique au quotidien.
                    </p>
                  </div>
                  <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">02</div>
                    <h3 className="text-xl font-bold text-slate-900">Communion Fraternelle</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Accueillir chaleureusement chaque personne, créer des liens familiaux profonds et s'entraider en Christ.
                    </p>
                  </div>
                  <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black">03</div>
                    <h3 className="text-xl font-bold text-slate-900">Témoignage dans la Ville</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Servir la population de Vitry-sur-Seine et d'Île-de-France par l'amour, l'action sociale et la solidarité.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                    <Clock className="w-8 h-8 text-teal-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Culte Dominical & École du Dimanche</h4>
                      <p className="text-xs text-teal-700 font-semibold mt-1">Tous les Dimanches de 10h30 à 12h30</p>
                      <p className="text-sm text-slate-600 mt-2">Moment fort de célébration, louange vivante et enseignement pour adultes, jeunes et enfants.</p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                    <Heart className="w-8 h-8 text-rose-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Réunion de Prière & Intercession</h4>
                      <p className="text-xs text-rose-700 font-semibold mt-1">Tous les Mercredis de 19h30 à 21h00</p>
                      <p className="text-sm text-slate-600 mt-2">Temps privilégié d'intercession pour nos familles, les malades et la ville de Vitry.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto text-slate-700 leading-relaxed text-sm">
                  <p>
                    Fondée en 1963, l'<strong>Église Baptiste de Vitry-sur-Seine</strong> a traversé plus de six décennies en restant fidèle aux saintes Écritures tout en répondant aux besoins contemporains de la région parisienne.
                  </p>
                  <p>
                    Aujourd'hui, l'église rassemble des personnes de tous horizons et origines, unis par l'amour de Jésus-Christ et engagés dans la formation théologique avec l'École Théologique ESI.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ================= 3. FEATURED LATEST SERMON SPOTLIGHT ================= */}
        <section id="sermons-v2" className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200 inline-block mb-2">
                  Dernier Message Dominical
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Écouter & Visionner les Prédications
                </h2>
              </div>

              <Link
                to="/predications"
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-2 border border-slate-300 transition"
              >
                <span>Voir toutes les archives</span>
                <ChevronRight className="w-4 h-4 text-teal-600" />
              </Link>
            </div>

            {/* Sermon Video Player Container */}
            {latestSermon && (
              <div className="shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
                <CustomVideoPlayer sermon={latestSermon} />
              </div>
            )}

          </div>
        </section>

        {/* ================= 4. THEOLOGICAL ESI ACADEMY SPOTLIGHT ================= */}
        <section className="py-20 bg-gradient-to-br from-teal-50/60 via-slate-50 to-indigo-50/60 border-t border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                Formation Théologique ESI
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Approfondissez votre Foi avec l'École Théologique (3 Ans)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Parcours rigoureux structuré en 9 modules pour équiper les croyants, responsables et serviteurs dans la connaissance de la Parole de Dieu et l'histoire de l'Église.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center space-x-3 shadow-md">
                  <BookOpen className="w-6 h-6 text-teal-600 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-900 text-sm">9 Modules</span>
                    <span className="text-xs text-slate-500">Sur 3 années académiques</span>
                  </div>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center space-x-3 shadow-md">
                  <Award className="w-6 h-6 text-indigo-600 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-900 text-sm">Certification</span>
                    <span className="text-xs text-slate-500">Validation de fin d'études</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {esiModules.slice(0, 3).map((mod) => (
                <div key={mod.id} className="p-5 bg-white border border-slate-200 hover:border-teal-500/50 rounded-2xl transition-all shadow-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800">
                      Année {mod.year}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{mod.duration}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mt-2">{mod.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{mod.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 5. UPCOMING EVENTS SECTION ================= */}
        <section className="py-20 bg-slate-50 relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block mb-2">
                  Vie de la Communauté
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Événements & Rassemblements à Venir
                </h2>
              </div>

              <Link
                to="/events"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-teal-700 text-xs font-bold flex items-center space-x-2 border border-slate-200 shadow-sm transition"
              >
                <span>Tout l'agenda</span>
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.slice(0, 3).map((evt) => (
                <div key={evt.id} className="bg-white border border-slate-200 hover:border-teal-500/40 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between transition-all group">
                  {evt.imageUrl && (
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src={evt.imageUrl} 
                        alt={evt.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/90 text-teal-800 backdrop-blur-md border border-slate-200">
                          {evt.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium mb-2">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>{evt.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-[120px]">{evt.time}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
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
                      <Link to="/events" className="text-teal-700 font-bold hover:underline shrink-0">
                        Détails →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 6. TESTIMONIALS SECTION ================= */}
        <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-100/80 border-t border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 inline-block mb-3">
                Témoignages Vivants
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Ce que vit notre Communauté
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Découvrez l'impact de l'Évangile et de la communion fraternelle dans la vie des fidèles et des familles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-8 relative shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
                  <Quote className="w-10 h-10 text-teal-600/15 absolute top-6 right-6 pointer-events-none" />

                  <p className="text-slate-700 text-sm italic leading-relaxed mb-6 font-normal">
                    "{t.content}"
                  </p>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[rgb(53,125,122)] to-teal-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0">
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
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6 text-slate-800">
            <button
              onClick={() => setShowVisitModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8 text-[rgb(53,125,122)]" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Votre Première Visite à l'Église</h3>
                <p className="text-xs text-slate-500">Tout ce que vous devez savoir pour votre accueil</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-teal-800 block">1. Accès & Transports</span>
                <p className="text-slate-600">138 Avenue Anatole France, 94400 Vitry-sur-Seine. Accès facile via Tramway T9 ou RER C.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800 block">2. Horaires & Déroulement</span>
                <p className="text-slate-600">Le culte débute à 10h30. Nous vous conseillons d'arriver 15 minutes avant pour faire connaissance.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-800 block">3. Accueil des Enfants</span>
                <p className="text-slate-600">Une prise en charge bienveillante est assurée pour les enfants par l'École du Dimanche pendant le message.</p>
              </div>
            </div>

            <button
              onClick={() => setShowVisitModal(false)}
              className="w-full py-3 rounded-xl bg-[rgb(53,125,122)] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              Compris, à bientôt !
            </button>
          </div>
        </div>
      )}

      {/* ================= DONATE MODAL ================= */}
      {showDonateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 text-slate-800">
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
                <span className="text-teal-800 font-bold">Église Baptiste de Vitry</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">IBAN :</span>
                <span className="text-slate-800 font-bold">FR76 1234 5678 9012 3456 7890 123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">BIC :</span>
                <span className="text-slate-800 font-bold">BNPAFRPPXXX</span>
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
