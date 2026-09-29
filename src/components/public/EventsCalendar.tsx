import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { ChurchEvent } from '../../types';

export const EventsCalendar: React.FC = () => {
  const { events } = useData();
  const [filterStatus, setFilterStatus] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);

  const filteredEvents = events.filter(e => e.status === filterStatus);

  return (
    <section id="events" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] mb-3">
              <Calendar className="w-4 h-4" />
              <span>Agenda & Événements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(55,69,90)] tracking-tight">
              Vie & Rassemblements de <span className="text-[rgb(53,125,122)]">l'Église</span>
            </h2>
          </div>

          {/* Status Switch (À venir / Passé) */}
          <div className="p-1 rounded-xl bg-slate-200 inline-flex self-start md:self-auto">
            <button
              onClick={() => setFilterStatus('upcoming')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                filterStatus === 'upcoming'
                  ? 'bg-[rgb(53,125,122)] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Événements À Venir
            </button>
            <button
              onClick={() => setFilterStatus('past')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                filterStatus === 'past'
                  ? 'bg-[rgb(55,69,90)] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Événements Passés
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">Aucun événement enregistré dans cette catégorie pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {evt.imageUrl && (
                    <div className="aspect-16/9 w-full overflow-hidden bg-slate-100">
                      <img 
                        src={evt.imageUrl} 
                        alt={evt.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)]">
                        {evt.category}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        evt.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {evt.status === 'upcoming' ? 'À venir' : 'Passé'}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-[rgb(55,69,90)] line-clamp-2 group-hover:text-[rgb(53,125,122)] transition-colors">
                      {evt.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-[rgb(53,125,122)]" />
                        <span>{new Date(evt.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 pt-2 border-t border-slate-100">
                      {evt.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-[rgb(53,125,122)] hover:bg-[rgb(53,125,122)] hover:text-white font-bold text-xs transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Voir tous les détails</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[rgb(53,125,122)] text-white">
                {selectedEvent.category}
              </span>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedEvent.imageUrl && (
              <img 
                src={selectedEvent.imageUrl} 
                alt={selectedEvent.title} 
                className="w-full h-48 object-cover rounded-2xl"
              />
            )}

            <h3 className="text-xl font-bold text-[rgb(55,69,90)]">
              {selectedEvent.title}
            </h3>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-700 font-medium">
                <Calendar className="w-4 h-4 text-[rgb(53,125,122)]" />
                <span>Date : {new Date(selectedEvent.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 font-medium">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Horaires : {selectedEvent.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Lieu : {selectedEvent.location}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedEvent.description}
            </p>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2.5 bg-[rgb(53,125,122)] text-white font-bold rounded-xl text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
