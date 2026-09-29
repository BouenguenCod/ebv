import React, { useState, useEffect, memo } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { WhatsAppWidget } from '../components/public/WhatsAppWidget';
import { CustomVideoPlayer } from '../components/public/CustomVideoPlayer';
import { useData } from '../context/DataContext';
import { 
  Play, MapPin, Clock, Heart, Users, BookOpen, 
  Sparkles, Compass, Award, ChevronRight, X,
  Calendar, Quote, ArrowRight, UserCheck, Globe, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Optimized background carousel images (official & church community theme)
const V3_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&w=1400&q=75',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=75'
];

// Isolated Countdown Component for 60 FPS performance (no main component re-renders)
const V3SundayCountdown: React.FC = memo(() => {
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
    <div className="grid grid-cols-4 gap-3 text-center my-4">
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-black text-amber-400">{timeLeft.days}</span>
        <span className="text-[10px] uppercase font-bold text-slate-400">Jours</span>
      </div>
      <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-black text-teal-300">{timeLeft.hours}</span>
        <span className="text-[10px] uppercase font-bold text-slate-400">Heures</span>
      </div>
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-black text-emerald-300">{timeLeft.minutes}</span>
        <span className="text-[10px] uppercase font-bold text-slate-400">Min</span>
      </div>
      <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-black text-rose-400">{timeLeft.seconds}</span>
        <span className="text-[10px] uppercase font-bold text-slate-400">Sec</span>
      </div>
    </div>
  );
});

export const PublicHomePageV3: React.FC = () => {
  const { sermons, events, testimonials, esiModules, gallery } = useData();
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Preload images once for fluid hardware-accelerated transitions
  useEffect(() => {
    V3_HERO_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % V3_HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const latestSermon = sermons[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar 
        onOpenDonate={() => setShowDonateModal(true)} 
        onOpenVisitModal={() => setShowVisitModal(true)}
      />

      {/* Floating Version Switcher */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-slate-950/90 border border-amber-500/40 p-2.5 px-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-bounce">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <span className="text-xs font-bold text-amber-300">Design V3 Officiel</span>
        <div className="flex items-center space-x-1 pl-2 border-l border-slate-800">
          <Link to="/" className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-bold">V1</Link>
          <Link to="/accueil-v2" className="px-2 py-0.5 rounded bg-teal-800/80 hover:bg-teal-700 text-[10px] text-teal-200 font-bold">V2</Link>
        </div>
      </div>

      <main className="flex-grow pt-20">
        
        {/* ================= HERO V3 - INSPIRÉ DE EGLISEBAPTISTEVITRY.FR ================= */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 bg-slate-950">
          
          {/* Background Images Carousel */}
          {V3_HERO_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform-gpu will-change-opacity transition-opacity duration-1000 ease-in-out ${
                idx === heroImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}

          {/* Official Royal Blue & Dark Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-teal-950/80" />
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Official Welcome Header */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Depuis 1963 • Vitry-sur-Seine (94)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                Église Baptiste <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-200 to-emerald-300">
                  de Vitry-sur-Seine
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Une communauté protestante évangélique vivante, chaleureuse et multiculturelle. 
                Nous proclamons la parole de Dieu, célébrons la foi en Jésus-Christ et servons notre ville.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => setShowVisitModal(true)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-teal-600 hover:from-amber-500 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/50 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Compass className="w-5 h-5 text-slate-950" />
                  <span>Planifier ma première visite</span>
                </button>

                <a
                  href="#sermon-player-v3"
                  className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700/80 flex items-center space-x-2 transition-all backdrop-blur-md"
                >
                  <Play className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Dernier culte en vidéo</span>
                </a>
              </div>

              {/* Quick Official Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-amber-400">60+ Ans</span>
                  <span className="text-xs text-slate-400 font-medium">Présence à Vitry</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-teal-300">100%</span>
                  <span className="text-xs text-slate-400 font-medium">Fidèle aux Écritures</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-300">ESI</span>
                  <span className="text-xs text-slate-400 font-medium">École Théologique</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Sunday Service Card & Countdown */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Culte Dominical Principal</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Dimanche 10h30
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">Rassemblement de Louange & Prédication</h3>
                <p className="text-xs text-slate-400 mb-4">Rejoignez-nous pour célébrer en famille et écouter la parole de Dieu.</p>

                {/* Ultra Fast Memoized Countdown */}
                <V3SundayCountdown />

                <div className="space-y-2.5 text-xs text-slate-300 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Adresse :</span>
                    </span>
                    <span className="font-bold text-white">138 Ave Anatole France</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-teal-400" />
                      <span>Accueil Enfants :</span>
                    </span>
                    <span className="font-bold text-white">École du Dimanche assurée</span>
                  </div>
                </div>

              </div>

              {/* Quick Donation Link */}
              <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Soutenir l'Église & l'Entraide</h4>
                  <p className="text-xs text-slate-400 mt-1">Participez à la vie spirituelle et aux actions de solidarité.</p>
                </div>
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shrink-0 flex items-center space-x-1.5 shadow-lg"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Faire un don</span>
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ================= SECTION 1: À PROPOS & NOTRE HISTOIRE ================= */}
        <section className="py-20 bg-slate-950 border-y border-slate-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20 inline-block mb-3">
                Qui Sommes-Nous ?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Une Église Évangélique au Cœur de Vitry
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Depuis plus de 60 ans, notre assemblée rassemble des personnes de diverses cultures et générations unies par la foi chrétienne.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg">Foi Biblique</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Attachement ferme à l'autorité des Écritures et enseignement pratique pour la vie quotidienne.
                </p>
              </div>

              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 hover:border-teal-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-300 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg">Accueil Familial</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Communauté chaleureuse proposant des groupes pour enfants, jeunes, femmes et familles.
                </p>
              </div>

              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg">Formation ESI</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  École théologique sur 3 ans (9 modules) pour former des disciples et serviteurs qualifiés.
                </p>
              </div>

              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 hover:border-rose-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-300 flex items-center justify-center font-bold">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg">Évangélisation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Projets d'entraide, campagnes d'évangélisation et présence active dans la cité de Vitry.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION 2: CULTE & PRÉDICATION RÉCENTE ================= */}
        <section id="sermon-player-v3" className="py-20 bg-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/30 inline-block mb-2">
                  Prédication Dominicale
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Écouter le Dernier Message de l'Église
                </h2>
              </div>

              <Link
                to="/predications"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold flex items-center space-x-2 border border-slate-700 transition"
              >
                <span>Toutes les prédications</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </Link>
            </div>

            {/* Custom Video Player Component */}
            {latestSermon && (
              <div className="shadow-2xl rounded-3xl overflow-hidden border border-slate-800">
                <CustomVideoPlayer sermon={latestSermon} />
              </div>
            )}

          </div>
        </section>

        {/* ================= SECTION 3: FORMATION THÉOLOGIQUE ESI ================= */}
        <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-t border-slate-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                École Théologique ESI
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Formation de la Servante & du Serviteur de Dieu (ESI)
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Parcours théologique complet sur 3 ans (9 modules) pour approfondir votre compréhension des Écritures, la théologie systématique et la gestion du ministère.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-white text-sm">9 Modules</span>
                    <span className="text-xs text-slate-400">3 Ans d'Enseignement</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
                  <Award className="w-6 h-6 text-teal-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-white text-sm">Diplôme ESI</span>
                    <span className="text-xs text-slate-400">Validation des Acquis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {esiModules.slice(0, 3).map((mod) => (
                <div key={mod.id} className="p-5 bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300">
                      Année {mod.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{mod.duration}</span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-2">{mod.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{mod.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= SECTION 4: ÉVÉNEMENTS MARQUANTS & ACTIVITÉS ================= */}
        <section className="py-20 bg-slate-950 border-t border-slate-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 inline-block mb-2">
                  Vie de l'Église & Actions
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Événements, Campagnes & Rassemblements
                </h2>
              </div>

              <Link
                to="/events"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center space-x-2 border border-slate-800 transition"
              >
                <span>Agenda complet</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.slice(0, 3).map((evt) => (
                <div key={evt.id} className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition group">
                  {evt.imageUrl && (
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src={evt.imageUrl} 
                        alt={evt.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-950/90 text-amber-300 backdrop-blur-md border border-slate-800">
                          {evt.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium mb-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{evt.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-teal-400" />
                        <span className="truncate max-w-[120px]">{evt.time}</span>
                      </div>

                      <h3 className="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center space-x-1 truncate max-w-[180px]">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </span>
                      <Link to="/events" className="text-amber-400 font-bold hover:underline shrink-0">
                        En savoir plus →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= SECTION 5: GALERIE PHOTOS DE LA COMMUNAUTÉ ================= */}
        <section className="py-20 bg-slate-900 border-t border-slate-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/30 inline-block mb-3">
                Galerie de l'Église
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                La Vie de notre Communauté en Images
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.slice(0, 6).map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video shadow-lg">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                    {item.caption && <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{item.caption}</p>}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= SECTION 6: TÉMOIGNAGES DE LA COMMUNAUTÉ ================= */}
        <section className="py-20 bg-slate-950 border-t border-slate-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30 inline-block mb-3">
                Témoignages
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ce que disent les Membres & Étudiants ESI
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition">
                  <Quote className="w-10 h-10 text-amber-500/20 absolute top-6 right-6 pointer-events-none" />

                  <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                    "{t.content}"
                  </p>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/80">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center space-x-1.5">
                        <span>{t.author}</span>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      </h4>
                      <span className="text-xs text-slate-400">{t.role}</span>
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6 text-slate-200">
            <button
              onClick={() => setShowVisitModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8 text-amber-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Votre Première Visite à l'Église</h3>
                <p className="text-xs text-slate-400">Tout ce que vous devez savoir pour votre accueil</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300 block">1. Accès & Transports</span>
                <p className="text-slate-300">138 Avenue Anatole France, 94400 Vitry-sur-Seine. Accès facile via Tramway T9 ou RER C.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-bold text-teal-300 block">2. Horaires & Déroulement</span>
                <p className="text-slate-300">Le culte débute à 10h30. Nous vous conseillons d'arriver 15 minutes avant pour faire connaissance.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-300 block">3. Accueil des Enfants</span>
                <p className="text-slate-300">Une prise en charge bienveillante est assurée pour les enfants par l'École du Dimanche pendant le message.</p>
              </div>
            </div>

            <button
              onClick={() => setShowVisitModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-teal-600 hover:from-amber-500 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider"
            >
              Compris, à bientôt !
            </button>
          </div>
        </div>
      )}

      {/* ================= DONATE MODAL ================= */}
      {showDonateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 text-slate-200">
            <button
              onClick={() => setShowDonateModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-rose-500 fill-current" />
              <div>
                <h3 className="text-xl font-bold text-white">Soutenir l'Église de Vitry</h3>
                <p className="text-xs text-slate-400">Vos dons permettent de financer le ministère et l'entraide</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Bénéficiaire :</span>
                <span className="text-amber-300 font-bold">Église Baptiste de Vitry</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">IBAN :</span>
                <span className="text-slate-200 font-bold">FR76 1234 5678 9012 3456 7890 123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BIC :</span>
                <span className="text-slate-200 font-bold">BNPAFRPPXXX</span>
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
