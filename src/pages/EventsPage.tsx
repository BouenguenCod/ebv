import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Calendar, Clock, MapPin, ChevronRight, Filter, Church } from 'lucide-react';
import { useData } from '../context/DataContext';
import type { ChurchEvent } from '../types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export const EventsPage: React.FC = () => {
  const { events, eventCategories } = useData();
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'past'>('all');
  const [filterType, setFilterType] = useState<'all' | 'regulier' | 'ponctuel'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);

  const categories = ['all', ...Array.from(new Set([...eventCategories, ...events.map(e => e.category)]))];

  const filteredEvents = events.filter(evt => {
    const matchesStatus = filterStatus === 'all' || evt.status === filterStatus;
    const matchesType = filterType === 'all' || evt.programType === filterType || (!evt.programType && filterType === 'ponctuel');
    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    return matchesStatus && matchesType && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-32 pb-16 bg-[rgb(55,69,90)] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        {/* Glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[rgb(53,125,122)]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-300 font-semibold uppercase tracking-wider">
            <span>Accueil</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-teal-200">Événements & Agenda</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            AGENDA & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">ÉVÉNEMENTS</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Retrouvez tous les programmes réguliers de l'église ainsi que les événements ponctuels, conférences et actions d'évangélisation.
          </p>
        </div>
      </div>

      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 pt-12">

          {/* Filters Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2 text-[rgb(53,125,122)] dark:text-teal-300 font-extrabold text-sm uppercase tracking-wider">
                <Filter className="w-4 h-4" />
                <span>Filtrer les événements</span>
              </div>

              {/* Status Switch (Tous / À venir / Passés) */}
              <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 inline-flex self-start md:self-auto">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'all'
                      ? 'bg-[rgb(53,125,122)] text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilterStatus('upcoming')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'upcoming'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  À venir
                </button>
                <button
                  onClick={() => setFilterStatus('past')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'past'
                      ? 'bg-[rgb(55,69,90)] text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Passés / Retours
                </button>
              </div>

              {/* Program Type Switch (Tous / Réguliers / Ponctuels) */}
              <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 inline-flex self-start md:self-auto">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === 'all'
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Tous types
                </button>
                <button
                  onClick={() => setFilterType('regulier')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === 'regulier'
                      ? 'bg-teal-600 text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Programmes Réguliers
                </button>
                <button
                  onClick={() => setFilterType('ponctuel')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterType === 'ponctuel'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Événements Ponctuels
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2">Catégorie :</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[rgb(53,125,122)] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Toutes les catégories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
                Aucun événement ne correspond à vos filtres sélectionnés.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((evt) => (
                <Card
                  key={evt.id}
                  className="overflow-hidden group hover:shadow-2xl transition duration-300 border border-slate-200 dark:border-slate-800 flex flex-col justify-between bg-white dark:bg-slate-900"
                >
                  <div>
                    {evt.imageUrl && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                        <img 
                          src={evt.imageUrl} 
                          alt={evt.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <Badge variant="emerald" className="shadow">
                            {evt.category}
                          </Badge>
                          <Badge 
                            variant={evt.programType === 'regulier' ? 'secondary' : 'outline'}
                            className="bg-slate-900/80 text-white backdrop-blur border-none shadow"
                          >
                            {evt.programType === 'regulier' ? 'Programme Régulier' : 'Événement Ponctuel'}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <h3 className="font-extrabold text-xl text-[rgb(55,69,90)] dark:text-white group-hover:text-[rgb(53,125,122)] transition-colors leading-snug">
                        {evt.title}
                      </h3>

                      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                        <div className="flex items-center space-x-2 font-medium">
                          <Calendar className="w-4 h-4 text-[rgb(53,125,122)] shrink-0" />
                          <span>{evt.programType === 'regulier' ? evt.time : new Date(evt.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        {evt.programType !== 'regulier' && (
                          <div className="flex items-center space-x-2 font-medium">
                            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>{evt.time}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 font-medium">
                          <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                          <span className="line-clamp-1">{evt.location}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button
                      onClick={() => setSelectedEvent(evt)}
                      className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(43,105,102)] text-white font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center space-x-2"
                    >
                      <span>Voir tous les détails</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                </Card>
              ))}
            </div>
          )}

          {/* Event Detail Modal */}
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            {selectedEvent && (
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                {selectedEvent.imageUrl && (
                  <div className="relative aspect-[16/8] w-full overflow-hidden">
                    <img 
                      src={selectedEvent.imageUrl} 
                      alt={selectedEvent.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex flex-wrap gap-2">
                      <Badge variant="emerald">
                        {selectedEvent.category}
                      </Badge>
                      <Badge className="bg-slate-900/90 text-white backdrop-blur">
                        {selectedEvent.programType === 'regulier' ? 'Programme Régulier' : 'Événement Ponctuel'}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-6">
                  <DialogTitle className="text-2xl md:text-3xl font-extrabold text-[rgb(55,69,90)] dark:text-white">
                    {selectedEvent.title}
                  </DialogTitle>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 text-xs md:text-sm">
                    <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200 font-medium">
                      <Calendar className="w-4 h-4 text-[rgb(53,125,122)] shrink-0" />
                      <span><strong>Date / Période :</strong> {selectedEvent.programType === 'regulier' ? selectedEvent.time : new Date(selectedEvent.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    {selectedEvent.programType !== 'regulier' && (
                      <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200 font-medium">
                        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                        <span><strong>Horaires :</strong> {selectedEvent.time}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200 font-medium">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                      <span><strong>Lieu :</strong> {selectedEvent.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 tracking-wider">
                      Description de l'événement
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Button 
                      onClick={() => setSelectedEvent(null)}
                      className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 font-bold text-xs px-6 py-2.5 rounded-xl"
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>

          {/* SECTION: VENIR À L'ÉGLISE */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl text-center max-w-4xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[rgb(53,125,122)] text-white flex items-center justify-center mx-auto shadow-lg">
              <Church className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-extrabold text-[rgb(55,69,90)] dark:text-white">
              REJOIGNEZ-NOUS À VITRY-SUR-SEINE
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Toutes nos réunions et nos cultes ont lieu au <strong className="text-[rgb(53,125,122)] dark:text-teal-300 font-extrabold">119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine</strong>. Vous êtes les bienvenus !
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};
