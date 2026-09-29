import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { useData } from '../context/DataContext';
import { Play, Search, User, Calendar, X, Video, Music } from 'lucide-react';
import type { Sermon } from '../types';
import { CustomVideoPlayer } from '../components/public/CustomVideoPlayer';

export const SermonsPage: React.FC = () => {
  const { sermons, sermonCategories } = useData();
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('Tous');

  const categories = ['Toutes', ...Array.from(new Set([...(sermonCategories || []), ...sermons.map(s => s.category)]))];
  const speakers = ['Tous', ...Array.from(new Set(sermons.map(s => s.speaker)))];

  const filteredSermons = sermons.filter(s => {
    const matchesCategory = selectedCategory === 'Toutes' || s.category === selectedCategory;
    const matchesSpeaker = selectedSpeaker === 'Tous' || s.speaker === selectedSpeaker;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSpeaker && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      
      {/* Header Banner */}
      <div className="pt-32 pb-16 bg-[rgb(55,69,90)] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-teal-200 border border-white/20 inline-block mb-4">
            Ressources Spirituelles
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Toutes les <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">Prédications</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Plongez dans la Parole de Dieu. Recherchez et filtrez nos messages par thème, orateur ou mots-clés.
          </p>
        </div>
      </div>

      <main className="flex-grow pb-24 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 mb-12 flex flex-col md:flex-row gap-4 items-center">
            
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher un message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[rgb(53,125,122)] focus:border-transparent outline-none transition"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="w-full md:w-1/3">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 focus:ring-2 focus:ring-[rgb(53,125,122)] outline-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'Toutes' ? 'Toutes les catégories' : cat}</option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-1/3">
              <select 
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 focus:ring-2 focus:ring-[rgb(53,125,122)] outline-none cursor-pointer"
              >
                {speakers.map(speaker => (
                  <option key={speaker} value={speaker}>{speaker === 'Tous' ? 'Tous les orateurs' : speaker}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Active Player (if selected) */}
          {selectedSermon && (
            <div className="mb-16 relative">
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setSelectedSermon(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-rose-500 hover:text-white text-slate-700 text-xs font-bold transition flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Fermer le lecteur</span>
                </button>
              </div>
              <CustomVideoPlayer sermon={selectedSermon} />
            </div>
          )}

          {/* Grid */}
          {filteredSermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.map((sermon) => {
                const hasVid = Boolean(sermon.videoUrl && sermon.videoUrl.trim() !== '');
                const hasAud = Boolean(sermon.audioUrl && sermon.audioUrl.trim() !== '');
                return (
                  <div 
                    key={sermon.id}
                    onClick={() => {
                      setSelectedSermon(sermon);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img 
                        src={sermon.thumbnail || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80"} 
                        alt={sermon.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 text-[rgb(53,125,122)] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                          {hasAud && !hasVid ? <Music className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                        <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          {sermon.category}
                        </span>
                        {hasVid && hasAud ? (
                          <span className="px-2 py-1 rounded bg-teal-600/90 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center space-x-1">
                            <Video className="w-3 h-3" />
                            <Music className="w-3 h-3" />
                          </span>
                        ) : hasAud ? (
                          <span className="px-2 py-1 rounded bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center space-x-1">
                            <Music className="w-3 h-3" />
                            <span>Audio</span>
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center space-x-1">
                            <Video className="w-3 h-3" />
                            <span>Vidéo</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-[rgb(53,125,122)] transition-colors">
                        {sermon.title}
                      </h4>
                      
                      <div className="mt-auto pt-4 flex flex-col space-y-1.5 text-sm text-slate-500">
                        <span className="font-semibold text-slate-700 flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-[rgb(53,125,122)]" />
                          <span>{sermon.speaker}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>{new Date(sermon.date).toLocaleDateString('fr-FR')}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Aucun sermon trouvé</h3>
              <p className="text-slate-500">Essayez de modifier vos filtres ou votre recherche.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Toutes');
                  setSelectedSpeaker('Tous');
                }}
                className="mt-4 px-4 py-2 bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white rounded-lg font-semibold transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
