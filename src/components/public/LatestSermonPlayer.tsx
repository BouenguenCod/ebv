import React, { useState, useEffect } from 'react';
import { Play, Video, Music } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { Sermon } from '../../types';
import { CustomVideoPlayer } from './CustomVideoPlayer';

export const LatestSermonPlayer: React.FC = () => {
  const { sermons, sermonCategories } = useData();
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(sermons[0] || null);

  // Synchronize selectedSermon with latest sermon from database
  useEffect(() => {
    if (sermons && sermons.length > 0) {
      setSelectedSermon(prev => {
        if (prev && sermons.some(s => s.id === prev.id)) {
          return prev;
        }
        return sermons[0];
      });
    }
  }, [sermons]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');

  const categories = ['Toutes', ...Array.from(new Set([...(sermonCategories || []), ...sermons.map(s => s.category)]))];

  const filteredSermons = selectedCategory === 'Toutes' 
    ? sermons 
    : sermons.filter(s => s.category === selectedCategory);

  const activeSermon = selectedSermon || sermons[0];

  return (
    <section id="sermons" className="py-20 bg-[rgb(55,69,90)] text-white relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgb(53,125,122)]/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-teal-200 border border-white/20 inline-block mb-3">
            Enseignement & Prédications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Écouter les <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">Prédications</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Consultez notre dernier message dominical ou explorez les archives audio et vidéo de l'église.
          </p>
        </div>

        {/* Featured Video Player Box */}
        <div className="mb-16">
          {activeSermon && <CustomVideoPlayer sermon={activeSermon} />}
        </div>

        {/* Sermon Archive Filter Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">Archives des Prédications</h3>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedCategory === cat 
                      ? 'bg-[rgb(53,125,122)] text-white' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => {
              const hasVid = Boolean(sermon.videoUrl && sermon.videoUrl.trim() !== '');
              const hasAud = Boolean(sermon.audioUrl && sermon.audioUrl.trim() !== '');
              const isSelected = activeSermon?.id === sermon.id;
              return (
                <div 
                  key={sermon.id}
                  onClick={() => setSelectedSermon(sermon)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'border-[rgb(53,125,122)] bg-slate-800 ring-2 ring-[rgb(53,125,122)] shadow-lg' 
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/90'
                  }`}
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img 
                        src={sermon.thumbnail || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80"} 
                        alt={sermon.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[rgb(53,125,122)]/90 text-white flex items-center justify-center shadow-lg">
                          {hasAud && !hasVid ? <Music className="w-5 h-5" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                        {hasVid && hasAud ? (
                          <span className="px-2 py-0.5 rounded bg-teal-600/90 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center space-x-1">
                            <Video className="w-3 h-3" />
                            <Music className="w-3 h-3" />
                          </span>
                        ) : hasAud ? (
                          <span className="px-2 py-0.5 rounded bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center space-x-1">
                            <Music className="w-3 h-3" />
                            <span>Audio</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center space-x-1">
                            <Video className="w-3 h-3" />
                            <span>Vidéo</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-teal-300">
                        {sermon.category}
                      </span>

                      <h4 className="font-bold text-white text-base line-clamp-1">
                        {sermon.title}
                      </h4>

                      <p className="text-xs text-slate-400">
                        {sermon.speaker} • {new Date(sermon.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

