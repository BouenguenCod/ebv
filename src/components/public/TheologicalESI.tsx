import React, { useState } from 'react';
import { GraduationCap, Clock, Award, ChevronRight, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { ESIModule } from '../../types';

export const TheologicalESI: React.FC = () => {
  const { esiModules } = useData();
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [activeModuleModal, setActiveModuleModal] = useState<ESIModule | null>(null);

  const filteredModules = esiModules.filter(m => m.year === selectedYear);

  return (
    <section id="esi" className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[rgb(53,125,122)]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Formation Théologique Église</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(55,69,90)] tracking-tight">
            Programme <span className="text-[rgb(53,125,122)]">ESI</span> (Équiper Serviteurs Internationaux)
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Un cursus théologique complet étalé sur <strong>3 ans</strong> comprenant <strong>9 modules spécialisés</strong> pour approfondir la Parole de Dieu et équiper les leaders et chrétiens engagés.
          </p>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[rgb(53,125,122)] text-white flex items-center justify-center font-bold text-xl shrink-0">
              3
            </div>
            <div>
              <span className="block font-bold text-[rgb(55,69,90)] text-base">Années de Cursus</span>
              <span className="block text-xs text-slate-500">Progression pédagogique structurée</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[rgb(55,69,90)] text-white flex items-center justify-center font-bold text-xl shrink-0">
              9
            </div>
            <div>
              <span className="block font-bold text-[rgb(55,69,90)] text-base">Modules Thématiques</span>
              <span className="block text-xs text-slate-500">Biblique, Historique & Pratique</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-bold text-[rgb(55,69,90)] text-base">Certificat de Fin d'Étude</span>
              <span className="block text-xs text-slate-500">Validation et envoi en ministère</span>
            </div>
          </div>

        </div>

        {/* Year Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-2xl bg-slate-200/80 inline-flex space-x-1">
            {[1, 2, 3].map((yearNum) => (
              <button
                key={yearNum}
                onClick={() => setSelectedYear(yearNum)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedYear === yearNum
                    ? 'bg-[rgb(53,125,122)] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Année {yearNum} ({yearNum === 1 ? 'Fondations' : yearNum === 2 ? 'Doctrine & Homilétique' : 'Ministère & Éthique'})
              </button>
            ))}
          </div>
        </div>

        {/* Modules Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredModules.map((mod) => (
            <div 
              key={mod.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)]">
                    Module {mod.id}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mod.duration}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[rgb(55,69,90)] group-hover:text-[rgb(53,125,122)] transition-colors mb-2">
                  {mod.title}
                </h3>

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {mod.description}
                </p>
              </div>

              <button
                onClick={() => setActiveModuleModal(mod)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-[rgb(53,125,122)] text-[rgb(53,125,122)] font-semibold text-xs flex items-center justify-center space-x-1 transition-all group-hover:bg-[rgb(53,125,122)] group-hover:text-white"
              >
                <Info className="w-4 h-4" />
                <span>Détails du module</span>
              </button>
            </div>
          ))}
        </div>

        {/* Registration Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[rgb(55,69,90)] to-[rgb(53,125,122)] text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold">Inscriptions à la Formation ESI</h3>
            <p className="text-slate-200 text-sm max-w-xl">
              Vous souhaitez approfondir vos connaissances bibliques et vous former au service ? Contactez le département de formation de l'église.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shrink-0 shadow-md transition-all flex items-center space-x-2"
          >
            <span>S'inscrire ou se renseigner</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Module Detail Modal */}
      {activeModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[rgb(53,125,122)] text-white">
                Module {activeModuleModal.id} • Année {activeModuleModal.year}
              </span>
              <button 
                onClick={() => setActiveModuleModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-bold text-[rgb(55,69,90)]">
              {activeModuleModal.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeModuleModal.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700 font-semibold">
                <span>Durée du module :</span>
                <span>{activeModuleModal.duration}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-semibold">
                <span>Format :</span>
                <span>Cours du soir & Samedi matin</span>
              </div>
              <div className="flex justify-between text-slate-700 font-semibold">
                <span>Support fourni :</span>
                <span>Polycope de cours & manuel d'étude</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveModuleModal(null)}
                className="w-full py-2.5 bg-[rgb(53,125,122)] text-white font-bold rounded-xl text-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
