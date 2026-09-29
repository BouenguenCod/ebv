import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const PhotoGallery: React.FC = () => {
  const { gallery, galleryCategories } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine categories defined in context and any extra categories present in gallery items
  const itemCategories = gallery.map(item => item.category).filter(Boolean);
  const categories = ['Toutes', ...Array.from(new Set([...(galleryCategories || []), ...itemCategories]))];

  const filteredGallery = selectedCategory === 'Toutes'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] dark:text-teal-400 mb-3">
            <Camera className="w-4 h-4" />
            <span>Vie de l'Église en Images</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(55,69,90)] dark:text-white tracking-tight">
            Galerie <span className="text-[rgb(53,125,122)] dark:text-teal-400">Photos</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Découvrez en photos les moments marquants de notre communauté : cultes, baptêmes, sorties jeunesse et formations ESI.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[rgb(53,125,122)] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white cursor-pointer border border-slate-200 aspect-4/3"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(55,69,90)]/90 via-[rgb(55,69,90)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <span className="self-start px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgb(53,125,122)]">
                  {item.category}
                </span>

                <div>
                  <h4 className="font-bold text-base text-white">{item.title}</h4>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">{item.caption}</p>
                  <span className="text-[10px] text-slate-300 mt-2 block">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition z-10"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition z-10"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img 
              src={filteredGallery[lightboxIndex].imageUrl} 
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            
            <div className="mt-4 text-center text-white space-y-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[rgb(53,125,122)] inline-block mb-1">
                {filteredGallery[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold">{filteredGallery[lightboxIndex].title}</h3>
              <p className="text-xs text-slate-300 max-w-xl">{filteredGallery[lightboxIndex].caption}</p>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
