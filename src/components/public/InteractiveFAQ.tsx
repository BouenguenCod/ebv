import React, { useState } from 'react';
import { HelpCircle, Clock, Train, Car, Languages, Baby, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const InteractiveFAQ: React.FC = () => {
  const { settings } = useData();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqItems = [
    {
      id: 0,
      icon: Clock,
      title: "Horaires & Déroulement des Cultes",
      subtitle: "Dimanches à 10h30 (Culte principal)",
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            Notre culte principal se tient <strong>chaque dimanche matin de 10h30 à 12h15</strong>. L'accueil des membres et visiteurs se fait dès 10h00 autour d'un café/thé de fraternité.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-[rgb(55,69,90)] block">10h30 - 11h15</span>
              <span className="text-xs">Louange contemporaine & Prière communautaire</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-[rgb(53,125,122)] block">11h15 - 12h15</span>
              <span className="text-xs">Prédication biblique expositoire & bénédiction</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      icon: Train,
      title: "Guide d'Accès Ultra-Détaillé par Transports (RER, Bus, Tram)",
      subtitle: "RER C, Tramway T7, Bus 180, 182, 132, 393",
      content: (
        <div className="space-y-4 text-sm text-slate-600">
          <p>
            L'Église Baptiste de Vitry est idéalement située au <strong>138 Avenue Anatole France, 94400 Vitry-sur-Seine</strong>, très facile d'accès depuis Paris et toute l'Île-de-France.
          </p>
          
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-700 font-bold flex items-center justify-center shrink-0">
                RER
              </div>
              <div>
                <strong className="text-[rgb(55,69,90)]">RER C (Gare Vitry-sur-Seine ou Les Ardoines) :</strong>
                <p className="text-xs mt-0.5">À 10 minutes à pied de la gare de Vitry-sur-Seine ou bus direct 180/182 en direction du centre-ville.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-700 font-bold flex items-center justify-center shrink-0">
                T7
              </div>
              <div>
                <strong className="text-[rgb(55,69,90)]">Tramway T7 (Villejuif - Athis-Mons) :</strong>
                <p className="text-xs mt-0.5">Station Musée MAC VAL ou Moulin Vert, correspondance rapide bus 180.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                BUS
              </div>
              <div>
                <strong className="text-[rgb(55,69,90)]">Lignes de Bus RATP :</strong>
                <ul className="text-xs mt-1 space-y-1 list-disc list-inside">
                  <li><strong>Bus 180 :</strong> Arrêt Anatole France / Maximilien Robespierre.</li>
                  <li><strong>Bus 182 :</strong> Arrêt Vitry RER / Avenue Henri Barbusse.</li>
                  <li><strong>Bus 132 :</strong> Depuis Porte d'Italie (Paris) jusqu'à Vitry.</li>
                  <li><strong>Bus 393 :</strong> Depuis Thiais / Choisy RER jusqu me à Vitry.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: Car,
      title: "Accès en Voiture depuis les Villes Voisines",
      subtitle: "Paris, Choisy-le-Roi, Ivry, Créteil, Villejuif, Orly",
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>Des places de stationnement gratuites et payantes sont disponibles le long de l'Avenue Anatole France et dans les rues adjacentes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-[rgb(55,69,90)] block text-xs">Depuis Paris / Ivry-sur-Seine :</strong>
              <span className="text-xs text-slate-500">Prendre la D148 / Quai Jules Guesde puis remonter vers le centre de Vitry.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-[rgb(55,69,90)] block text-xs">Depuis Choisy / Orly :</strong>
              <span className="text-xs text-slate-500">Prendre l'A86 sortie Vitry-sur-Seine ou suivre la N305.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-[rgb(55,69,90)] block text-xs">Depuis Créteil :</strong>
              <span className="text-xs text-slate-500">Traverser le pont de Créteil via D86 direct vers Anatole France.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-[rgb(55,69,90)] block text-xs">Depuis Villejuif :</strong>
              <span className="text-xs text-slate-500">Descendre par le Bd Maxime Gorki et la D148.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: Languages,
      title: "Langues Parlées par le Pasteur & Ministère Multilingue",
      subtitle: "Français, Anglais, Portugais, Espagnol, Italien",
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            Afin de servir au mieux la communauté cosmopolite de Vitry-sur-Seine, notre pasteur principal et l'équipe d'accueil parlent et communiquent couramment en :
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {settings.pastorLanguages.map(lang => (
              <span key={lang} className="px-3 py-1 bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] font-bold text-xs rounded-lg border border-[rgb(53,125,122)]/20">
                🌐 {lang}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Des traductions ou accompagnements personnalisés peuvent être organisés pour les visiteurs internationaux.
          </p>
        </div>
      )
    },
    {
      id: 4,
      icon: Baby,
      title: "Programme de l'École du Dimanche pour les Enfants",
      subtitle: "De 3 à 12 ans (Groupes par tranches d'âge)",
      content: (
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            Chaque dimanche pendant le culte des adultes (dès 11h00 après la louange), vos enfants sont pris en charge par des monitrices et moniteurs bienveillants et formés.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="font-bold text-[rgb(53,125,122)] block">3 - 5 ans</span>
              <span className="text-xs text-slate-500">Éveil à la foi & Bricolage</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="font-bold text-[rgb(53,125,122)] block">6 - 8 ans</span>
              <span className="text-xs text-slate-500">Récits bibliques & Chant</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="font-bold text-[rgb(53,125,122)] block">9 - 12 ans</span>
              <span className="text-xs text-slate-500">Étude pratique & Jeux</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const toggleAccordion = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Guide Pratique & Informations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(55,69,90)] tracking-tight">
            Questions Fréquentes & <span className="text-[rgb(53,125,122)]">Plan d'Accès</span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Tout ce qu'il faut savoir pour préparer votre première visite à l'Église Baptiste de Vitry.
          </p>
        </div>

        {/* Accordion Items List */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openIndex === item.id;

            return (
              <div 
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-[rgb(53,125,122)] bg-slate-50/50 shadow-md' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[rgb(53,125,122)] text-white' : 'bg-slate-100 text-[rgb(55,69,90)]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[rgb(55,69,90)]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[rgb(53,125,122)]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 animate-fadeIn">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
