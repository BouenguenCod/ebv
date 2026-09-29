import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Flame, Users, Globe2, Church, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const NotreVisionPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-32 pb-16 bg-[rgb(55,69,90)] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        {/* Glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[rgb(53,125,122)]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-300 font-semibold uppercase tracking-wider">
            <span>Accueil</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-teal-200">Notre Vision</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            NOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">VISION</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Être des témoins vivants de Jésus-Christ, unis dans l’amour, fortifiés par l’Esprit et engagés localement comme à l’international.
          </p>
        </div>
      </div>

      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pt-12">

          {/* Featured Vision Image Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-[21/9]">
            <img 
              src="https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/WhatsApp-Image-2024-07-31-at-23.07.08-scaled.jpeg" 
              alt="Notre Vision - Église Baptiste Vitry" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex items-end p-8 md:p-12">
              <div className="text-white space-y-2 max-w-3xl">
                <Badge variant="emerald" className="px-3 py-1 text-xs uppercase font-extrabold">Notre Orientation</Badge>
                <h2 className="text-2xl md:text-4xl font-extrabold">Nous avons pour vision de :</h2>
              </div>
            </div>
          </div>

          {/* 3 Main Vision Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <Card className="p-8 hover:shadow-2xl transition duration-300 border-t-8 border-t-[rgb(53,125,122)] flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center font-bold text-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Flame className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-extrabold text-[rgb(55,69,90)] dark:text-white leading-snug">
                  Maintenir notre foi en éveil
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Par la communion avec Dieu, dans l’intimité, mais aussi entre frères et sœurs au travers de nos cultes et rencontres.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-[rgb(53,125,122)] dark:text-teal-300 flex items-center space-x-1">
                  <span>Communion & Cultes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>

            {/* Pillar 2 */}
            <Card className="p-8 hover:shadow-2xl transition duration-300 border-t-8 border-t-amber-500 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center font-bold text-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-extrabold text-[rgb(55,69,90)] dark:text-white leading-snug">
                  Maintenir notre union
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  En priant les uns pour les autres, les uns avec les autres. En agissant dans l’amour, comme Jésus-Christ l’a fait précédemment.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-1">
                  <span>Prière & Fraternité</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>

            {/* Pillar 3 */}
            <Card className="p-8 hover:shadow-2xl transition duration-300 border-t-8 border-t-indigo-600 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-bold text-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Globe2 className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-extrabold text-[rgb(55,69,90)] dark:text-white leading-snug">
                  Maintenir nos actions, fruits de notre foi et du Saint-Esprit agissant en nous
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Par la participation à l’œuvre de Dieu. Nous apportons notre part à l’avancement du royaume, localement par la présence de notre église à Vitry-sur-Seine, par des actions sociales et le lancement d’événements, mais aussi par notre action au niveau international à travers des voyages missionnaires.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                  <span>Action Sociale & Missions</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>

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
