import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Church, ChevronRight, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const NotreEquipePage: React.FC = () => {
  const team = [
    {
      name: 'Marcelo BELITARDO',
      role: 'Président du Conseil & Pasteur',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/pasteur.png',
      badge: 'Direction Pastorale'
    },
    {
      name: 'Brice ALINE',
      role: 'Prédicateur & Membre du Conseil',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/pasteur-1.png',
      badge: 'Conseil & Enseignement'
    },
    {
      name: 'David CAROTHERS',
      role: 'Prédicateur',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/pasteur-2.png',
      badge: 'Ministère de la Parole'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-32 pb-16 bg-[rgb(55,69,90)] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        {/* Glow background */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(53,125,122)]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-300 font-semibold uppercase tracking-wider">
            <span>Accueil</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-teal-200">Notre Équipe</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            NOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">ÉQUIPE</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez l’équipe pastorale et les membres du conseil qui accompagnent et guident spirituellement la communauté de Vitry-sur-Seine.
          </p>
        </div>
      </div>

      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pt-12">

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="relative h-80 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="emerald" className="px-3 py-1 text-[11px] font-extrabold shadow">
                        {member.badge}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-2 text-center">
                    <h3 className="text-xl font-extrabold text-[rgb(55,69,90)] dark:text-white group-hover:text-[rgb(53,125,122)] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[rgb(53,125,122)] dark:text-teal-300 uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 text-center">
                  <div className="py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-[rgb(53,125,122)]" />
                    <span>Église Baptiste Vitry-sur-Seine</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* SECTION: À PROPOS DE NOTRE ÉGLISE */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl text-center max-w-4xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[rgb(53,125,122)] text-white flex items-center justify-center mx-auto shadow-lg">
              <Church className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-extrabold text-[rgb(55,69,90)] dark:text-white">
              À PROPOS DE NOTRE ÉGLISE
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <strong className="text-[rgb(53,125,122)] dark:text-teal-300 font-extrabold">Depuis 1963</strong>, nous sommes une communauté accueillante et dynamique, dédiée à la foi, à la communion et au service. Notre église est un lieu où chacun peut trouver un soutien spirituel et grandir dans sa relation avec Dieu.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};
