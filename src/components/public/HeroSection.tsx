import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Compass, Clock, MapPin, Users, BookOpen, ChevronRight } from 'lucide-react';

const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=2000&q=80', // Worship/Church
  'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&w=2000&q=80', // Bible/Study
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=2000&q=80' // Community
];

interface HeroSectionProps {
  onOpenDonate?: () => void;
  onOpenVisitModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDonate, onOpenVisitModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 7000); // Change l'image toutes les 7 secondes

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[rgb(55,69,90)]">
      {/* Background Images Carousel */}
      {BACKGROUND_IMAGES.map((img, index) => (
        <div 
          key={img}
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 transform transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${img}')`
          }}
        />
      ))}
      
      {/* Premium Gradient Overlay with Brand Colors */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgb(55,69,90)]/95 via-[rgb(55,69,90)]/85 to-[rgb(53,125,122)]/90" />
      
      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full text-white pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[rgb(73,155,152)] animate-ping" />
              <span>Depuis 1963 à Vitry-sur-Seine</span>
              <span className="text-white/40">•</span>
              <span className="text-[rgb(73,155,152)]">Église Baptiste Biblique</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Bienvenue à l'Église <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200">
                Baptiste de Vitry
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-light">
              Une communauté chaleureuse, ancrée dans la Parole de Dieu, engagée à servir Jésus-Christ et à transmettre Son amour au cœur du Val-de-Marne.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 items-center">
              <button
                onClick={onOpenVisitModal || (() => {
                  const el = document.getElementById('faq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                })}
                className="px-6 py-3.5 rounded-xl bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white text-sm font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <Compass className="w-4 h-4 text-teal-200" />
                <span>Planifiez votre visite</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('events');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-sm font-semibold transition-all flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Calendrier des événements</span>
              </button>

              <button
                onClick={onOpenDonate || (() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                })}
                className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold shadow-lg transition-all flex items-center space-x-2"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Faire un don</span>
              </button>
            </div>

            {/* Quick Info Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/15">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[rgb(73,155,152)]" />
                </div>
                <div>
                  <span className="block text-xs text-slate-300 font-medium">Culte Principal</span>
                  <span className="block text-sm font-bold text-white">Dimanche 10h30</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="block text-xs text-slate-300 font-medium">Localisation</span>
                  <span className="block text-sm font-bold text-white">Vitry-sur-Seine (94)</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <span className="block text-xs text-slate-300 font-medium">Formation Théologique</span>
                  <span className="block text-sm font-bold text-white">Programme ESI</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Card: Next Sunday Culte Feature */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(53,125,122)]/30 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(53,125,122)] text-white shadow-sm">
                  Prochain Culte
                </span>
                <span className="text-xs text-slate-300 font-medium">Ce Dimanche</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Le Culte Dominical & École du Dimanche
              </h3>
              
              <p className="text-sm text-slate-200 mb-6 leading-relaxed">
                Venez vivre un temps fort de louange contemporaine et d'enseignement biblique édifiant dans un cadre chaleureux et fraternel.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 text-xs sm:text-sm">
                  <span className="text-slate-300 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[rgb(73,155,152)]" />
                    <span>Heure d'ouverture :</span>
                  </span>
                  <span className="font-bold text-white">10h00 (Accueil café)</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 text-xs sm:text-sm">
                  <span className="text-slate-300 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-amber-300" />
                    <span>Pour les enfants :</span>
                  </span>
                  <span className="font-bold text-white">École du dimanche (3 - 12 ans)</span>
                </div>
              </div>

              <a
                href="#faq"
                className="w-full py-3 px-4 rounded-xl bg-white text-[rgb(55,69,90)] hover:bg-slate-100 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <span>Comment nous rejoindre en bus/tram/voiture</span>
                <ChevronRight className="w-4 h-4 text-[rgb(53,125,122)]" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
