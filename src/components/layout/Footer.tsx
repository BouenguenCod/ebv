import React from 'react';
import { Link } from 'react-router-dom';
import { Church, MapPin, Phone, Mail, Clock, Heart, ArrowUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { settings } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[rgb(38,48,63)] text-slate-300 pt-16 pb-8 border-t border-slate-700/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Col 1: Church Presentation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[rgb(53,125,122)] flex items-center justify-center text-white shadow-md">
                <Church className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-bold text-lg text-white leading-tight">
                  Église Baptiste Vitry
                </span>
                <span className="block text-xs text-[rgb(73,155,152)] font-semibold">
                  Fondée en {settings.foundationYear}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Une communauté vivante et accueillante ancrée dans l'Évangile à Vitry-sur-Seine. Nous partageons l'amour du Christ avec passion, enseignons la vérité biblique et servant la cité.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href={settings.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-700/60 hover:bg-[rgb(53,125,122)] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href={settings.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-700/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-700/60 hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Horaires des cultes */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[rgb(53,125,122)]" />
              <span>Cultes & Renseignements</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="block font-bold text-white text-xs uppercase tracking-wider text-[rgb(73,155,152)]">Culte Dominical Principal</span>
                <span className="block text-slate-200 mt-1 font-semibold">Chaque Dimanche à 10h30</span>
                <span className="block text-xs text-slate-400 mt-0.5">Louange, Prédication & École du dimanche</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
                <span className="block font-bold text-slate-200 text-xs">Prière & Intercession</span>
                <span className="block text-xs text-slate-400 mt-0.5">Mercredi à 19h30</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation rapide */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base">Versions de la Page d'Accueil</h3>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 space-y-2 text-xs mb-4">
              <Link to="/" className="flex items-center justify-between text-slate-300 hover:text-teal-300 font-bold transition-colors">
                <span>Version 1 (Classique)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-slate-300">/</span>
              </Link>
              <Link to="/accueil-v2" className="flex items-center justify-between text-slate-300 hover:text-teal-300 font-bold transition-colors">
                <span>Version 2 (Lumineuse)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-teal-900/60 text-teal-300">/accueil-v2</span>
              </Link>
              <Link to="/accueil-v3" className="flex items-center justify-between text-slate-300 hover:text-amber-300 font-bold transition-colors">
                <span>Version 3 (Officielle Vitry)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-900/60 text-amber-300">/accueil-v3</span>
              </Link>
              <Link to="/accueil-v4" className="flex items-center justify-between text-slate-300 hover:text-indigo-300 font-bold transition-colors">
                <span>Version 4 (Expérience Église V4)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-900/60 text-indigo-300">/accueil-v4</span>
              </Link>
            </div>

            <h3 className="text-white font-bold text-base">Navigation Rapide</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about-us" className="hover:text-[rgb(73,155,152)] transition-colors">
                  À propos & Confession de foi
                </Link>
              </li>
              <li>
                <Link to="/notre-vision" className="hover:text-[rgb(73,155,152)] transition-colors">
                  Notre Vision & Mission
                </Link>
              </li>
              <li>
                <Link to="/notre-equipe-2" className="hover:text-[rgb(73,155,152)] transition-colors">
                  Notre Équipe Pastorale
                </Link>
              </li>
              <li>
                <Link to="/vie-de-leglise" className="hover:text-[rgb(73,155,152)] transition-colors">
                  Vie de l'Église & Ministères
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[rgb(73,155,152)] transition-colors">
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link to="/predications" className="hover:text-[rgb(73,155,152)] transition-colors">
                  Dernières prédications
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[rgb(73,155,152)] transition-colors">
                  Événements & Calendrier
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Localisation */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base">Nous Trouver</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[rgb(53,125,122)] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[rgb(53,125,122)] shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[rgb(53,125,122)] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:underline">{settings.email}</a>
              </li>
            </ul>

            <div className="pt-2">
              <a 
                href={settings.donationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <Heart className="w-4 h-4 fill-current text-rose-300" />
                <span>Soutenir notre Église (SumUp)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Église Baptiste de Vitry (EBV). Tous droits réservés.</p>
          <div className="flex items-center space-x-4">
            <span>Vitry-sur-Seine, Val-de-Marne (94)</span>
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-700/60 hover:bg-[rgb(53,125,122)] text-white transition-colors"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
