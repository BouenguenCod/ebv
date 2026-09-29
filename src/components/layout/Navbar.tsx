import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Church, Calendar, Heart, Menu, X, Shield, MapPin, Clock, Phone, ChevronDown, Compass, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenDonate?: () => void;
  onOpenVisitModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonate, onOpenVisitModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [churchLifeDropdownOpen, setChurchLifeDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ebv_theme') === 'dark' || document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ebv_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ebv_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'sermons', 'esi', 'gallery', 'events', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setChurchLifeDropdownOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Bar Info (Address, Service Hours, Admin Login) */}
      <div className={`hidden lg:block border-b transition-all ${
        scrolled 
          ? 'bg-[rgb(55,69,90)] text-slate-200 border-slate-700/50 py-1.5 text-xs' 
          : 'bg-slate-950/90 backdrop-blur-md text-slate-200 border-white/10 py-2 text-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-[11px] font-medium">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[rgb(73,155,152)] shrink-0" />
              <span>138 Ave Anatole France, Vitry-sur-Seine</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Culte les Dimanches à 10h30</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[rgb(73,155,152)] shrink-0" />
              <span>01 46 80 12 34</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-200 text-xs px-3 py-0.5 rounded-full border border-emerald-500/30">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-[11px]">Admin Connecté</span>
                <span className="text-white/30">•</span>
                <button 
                  onClick={() => navigate('/admin')}
                  className="hover:underline font-bold text-white text-[11px]"
                >
                  Tableau de bord
                </button>
                <span className="text-white/30">•</span>
                <button 
                  onClick={logout}
                  className="text-rose-300 hover:text-rose-100 text-[10px] uppercase font-bold tracking-wider"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-300 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition"
              >
                <Shield className="w-3 h-3 text-amber-400" />
                <span>Espace Admin</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Reference White Menu Bar */}
      <div className={`transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-md shadow-md py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
          
          {/* Logo & Brand Name */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 shrink-0 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgb(53,125,122)] to-[rgb(55,69,90)] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Church className="w-6 h-6" />
            </div>
            <div className="whitespace-nowrap">
              <span className="block font-extrabold text-base sm:text-lg leading-tight tracking-tight text-[rgb(55,69,90)]">
                Église Baptiste <span className="text-[rgb(53,125,122)]">Vitry</span>
              </span>
              <span className="block text-[9px] tracking-wider uppercase font-bold text-slate-500">
                Fondée en 1963 • Vitry-sur-Seine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (EXACT UPPERCASE STYLE matching eglisebaptistevitry.fr) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-bold text-xs tracking-wider uppercase">
            
            {/* ACCUEIL */}
            <button
              onClick={() => handleNavClick('/#hero')}
              className={`py-2 border-b-2 transition-colors whitespace-nowrap ${
                location.pathname === '/' && activeSection === 'hero'
                  ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)]'
                  : 'border-transparent text-slate-700 hover:text-[rgb(53,125,122)]'
              }`}
            >
              ACCUEIL
            </button>

            {/* A PROPOS ⌄ Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('/about-us')}
                className={`flex items-center space-x-1 border-b-2 transition-colors whitespace-nowrap ${
                  location.pathname.includes('/about') || location.pathname.includes('/notre-') || (location.pathname === '/' && activeSection === 'about')
                    ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)]'
                    : 'border-transparent text-slate-700 hover:text-[rgb(53,125,122)]'
                }`}
              >
                <span>A PROPOS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutDropdownOpen ? 'rotate-180 text-[rgb(53,125,122)]' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 text-xs normal-case tracking-normal animate-fadeIn z-50">
                  <button
                    onClick={() => handleNavClick('/about-us')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-[rgb(53,125,122)] font-semibold border-b border-slate-100"
                  >
                    Notre Histoire & Confession de Foi
                  </button>
                  <button
                    onClick={() => handleNavClick('/notre-vision')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-[rgb(53,125,122)] font-semibold"
                  >
                    Notre Vision & Mission
                  </button>
                  <button
                    onClick={() => handleNavClick('/notre-equipe-2')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-[rgb(53,125,122)] font-bold"
                  >
                    Notre Équipe Pastorale
                  </button>
                </div>
              )}
            </div>

            {/* SERMONS */}
            <button
              onClick={() => handleNavClick('/predications')}
              className={`py-2 border-b-2 transition-colors whitespace-nowrap ${
                location.pathname.includes('/predications') || (location.pathname === '/' && activeSection === 'sermons')
                  ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)]'
                  : 'border-transparent text-slate-700 hover:text-[rgb(53,125,122)]'
              }`}
            >
              SERMONS
            </button>

            {/* VIE DE L'EGLISE ⌄ Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setChurchLifeDropdownOpen(true)}
              onMouseLeave={() => setChurchLifeDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('/vie-de-leglise')}
                className={`flex items-center space-x-1 border-b-2 transition-colors whitespace-nowrap ${
                  location.pathname.includes('/vie-de-leglise') || (location.pathname === '/' && ['esi', 'gallery', 'faq'].includes(activeSection))
                    ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)]'
                    : 'border-transparent text-slate-700 hover:text-[rgb(53,125,122)]'
                }`}
              >
                <span>VIE DE L'EGLISE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${churchLifeDropdownOpen ? 'rotate-180 text-[rgb(53,125,122)]' : ''}`} />
              </button>

              {churchLifeDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 text-xs normal-case tracking-normal animate-fadeIn z-50">
                  <button
                    onClick={() => handleNavClick('/vie-de-leglise')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-[rgb(53,125,122)] font-bold border-b border-slate-100"
                  >
                    Groupes & Ministères de l'Église
                  </button>
                  <button
                    onClick={() => handleNavClick('/#esi')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-[rgb(53,125,122)] font-semibold"
                  >
                    Formation Théologique ESI (3 ans)
                  </button>
                  <button
                    onClick={() => handleNavClick('/#gallery')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-[rgb(53,125,122)] font-semibold"
                  >
                    Galerie Photos de l'Église
                  </button>
                </div>
              )}
            </div>

            {/* EVENEMENTS */}
            <button
              onClick={() => handleNavClick('/events')}
              className={`py-2 border-b-2 transition-colors whitespace-nowrap ${
                location.pathname.includes('/events') || location.pathname.includes('/evenements') || (location.pathname === '/' && activeSection === 'events')
                  ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)]'
                  : 'border-transparent text-slate-700 hover:text-[rgb(53,125,122)]'
              }`}
            >
              EVENEMENTS
            </button>

            {/* CONTACT */}
            <button
              onClick={() => handleNavClick('/contact-us')}
              className={`py-2 border-b-2 transition-colors whitespace-nowrap ${
                location.pathname.includes('/contact') || (location.pathname === '/' && activeSection === 'contact')
                  ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)]'
                  : 'border-transparent text-slate-700 hover:text-[rgb(53,125,122)]'
              }`}
            >
              CONTACT
            </button>

            {/* DONS */}
            <button
              onClick={onOpenDonate || (() => handleNavClick('/#contact'))}
              className="py-2 text-[rgb(53,125,122)] hover:text-[rgb(38,92,90)] font-extrabold whitespace-nowrap"
            >
              DONS
            </button>

          </nav>

          {/* Action CTAs */}
          <div className="hidden xl:flex items-center space-x-2 shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 hover:text-[rgb(53,125,122)] rounded-lg hover:bg-slate-100 transition"
              title={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={onOpenVisitModal || (() => handleNavClick('/#faq'))}
              className="px-3.5 py-2 text-xs font-bold rounded-lg border border-[rgb(53,125,122)] text-[rgb(53,125,122)] hover:bg-[rgb(53,125,122)] hover:text-white transition-all shadow-xs whitespace-nowrap flex items-center space-x-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Planifiez votre visite</span>
            </button>

            <button
              onClick={onOpenDonate || (() => handleNavClick('/#contact'))}
              className="px-4 py-2 text-xs font-extrabold rounded-lg bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white flex items-center space-x-1.5 whitespace-nowrap shadow-md hover:shadow-lg transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-300" />
              <span>Faire un don</span>
            </button>
          </div>

          {/* Mobile Actions & Hamburger Button */}
          <div className="flex items-center space-x-1 lg:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              title={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-slate-900 border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="space-y-1 mb-4 font-bold text-xs uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('/#hero')}
              className="w-full text-left px-3 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-[rgb(53,125,122)] rounded-md"
            >
              ACCUEIL
            </button>
            <button
              onClick={() => handleNavClick('/#about')}
              className="w-full text-left px-3 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-[rgb(53,125,122)] rounded-md"
            >
              A PROPOS
            </button>
            <button
              onClick={() => handleNavClick('/predications')}
              className={`w-full text-left px-3 py-2.5 rounded-md ${
                location.pathname.includes('/predications') ? 'text-[rgb(53,125,122)] bg-slate-50 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-[rgb(53,125,122)]'
              }`}
            >
              SERMONS
            </button>
            <button
              onClick={() => handleNavClick('/#esi')}
              className="w-full text-left px-3 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-[rgb(53,125,122)] rounded-md"
            >
              VIE DE L'EGLISE
            </button>
            <button
              onClick={() => handleNavClick('/events')}
              className="w-full text-left px-3 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-[rgb(53,125,122)] rounded-md"
            >
              EVENEMENTS
            </button>
            <button
              onClick={() => handleNavClick('/#contact')}
              className="w-full text-left px-3 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-[rgb(53,125,122)] rounded-md"
            >
              CONTACT
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDonate?.() || handleNavClick('/#contact'); }}
              className="w-full text-left px-3 py-2.5 text-[rgb(53,125,122)] hover:bg-slate-100 rounded-md"
            >
              DONS
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVisitModal?.() || handleNavClick('/#faq'); }}
              className="w-full py-2.5 text-xs font-bold rounded-lg border border-[rgb(53,125,122)] text-[rgb(53,125,122)] text-center bg-[rgb(53,125,122)]/10"
            >
              Planifiez votre visite
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); handleNavClick('/#events'); }}
                className="py-2.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center space-x-1"
              >
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Calendrier</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDonate?.() || handleNavClick('/#contact'); }}
                className="py-2.5 text-xs font-bold rounded-lg bg-[rgb(53,125,122)] text-white flex items-center justify-center space-x-1"
              >
                <Heart className="w-4 h-4 text-rose-300" />
                <span>Faire un don</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-[rgb(53,125,122)] py-1"
              >
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Connexion Back-Office Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
