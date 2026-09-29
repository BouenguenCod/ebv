import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Sermon, ChurchEvent, GalleryItem, Testimonial, ESIModule, ChurchSettings } from '../types';
import { initialSermons, initialEvents, initialGallery, initialTestimonials, initialESIModules, initialSettings } from '../data/initialData';

interface DataContextType {
  sermons: Sermon[];
  sermonCategories: string[];
  events: ChurchEvent[];
  eventCategories: string[];
  gallery: GalleryItem[];
  galleryCategories: string[];
  testimonials: Testimonial[];
  esiModules: ESIModule[];
  settings: ChurchSettings;
  
  // Sermons CRUD
  addSermon: (sermon: Omit<Sermon, 'id'>) => void;
  updateSermon: (id: string, sermon: Partial<Sermon>) => void;
  deleteSermon: (id: string) => void;
  addSermonCategory: (category: string) => void;
  deleteSermonCategory: (category: string) => void;
  
  // Events CRUD
  addEvent: (event: Omit<ChurchEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<ChurchEvent>) => void;
  deleteEvent: (id: string) => void;
  addEventCategory: (category: string) => void;
  deleteEventCategory: (category: string) => void;
  
  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  addGalleryCategory: (category: string) => void;
  deleteGalleryCategory: (category: string) => void;

  // Testimonials CRUD
  addTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  
  // Settings CRUD
  updateSettings: (newSettings: Partial<ChurchSettings>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const local = localStorage.getItem('ebv_sermons');
    return local ? JSON.parse(local) : initialSermons;
  });

  const [sermonCategories, setSermonCategories] = useState<string[]>(() => {
    const local = localStorage.getItem('ebv_sermon_categories');
    return local ? JSON.parse(local) : ['Foi & Vie', 'Vie Chrétienne', 'Évangélisation', 'Foi & Persévérance', 'Enseignement', 'Famille & Foyer', 'Prière & Spiritualité', 'Culte Spécial'];
  });

  const [events, setEvents] = useState<ChurchEvent[]>(() => {
    const local = localStorage.getItem('ebv_events');
    return local ? JSON.parse(local) : initialEvents;
  });

  const [eventCategories, setEventCategories] = useState<string[]>(() => {
    const local = localStorage.getItem('ebv_event_categories');
    return local ? JSON.parse(local) : ['Évangélisation', 'Services', 'Prayers', 'Communion Féminine', 'Service & Entraide', 'Jeunesse', 'Formation ESI', 'Culte Spécial'];
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const local = localStorage.getItem('ebv_gallery');
    return local ? JSON.parse(local) : initialGallery;
  });

  const [galleryCategories, setGalleryCategories] = useState<string[]>(() => {
    const local = localStorage.getItem('ebv_gallery_categories');
    return local ? JSON.parse(local) : ['Culte', 'Événements', 'Jeunesse', 'Communauté', 'Formation ESI'];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const local = localStorage.getItem('ebv_testimonials');
    return local ? JSON.parse(local) : initialTestimonials;
  });

  const [esiModules, setEsiModules] = useState<ESIModule[]>(initialESIModules);

  const [settings, setSettings] = useState<ChurchSettings>(() => {
    const local = localStorage.getItem('ebv_settings');
    return local ? JSON.parse(local) : initialSettings;
  });

  // Fetch initial data from SQLite Express Server API
  useEffect(() => {
    const fetchDataFromSQLite = async () => {
      try {
        const [
          sermonsRes,
          sermonCatsRes,
          eventsRes,
          eventCatsRes,
          galleryRes,
          galleryCatsRes,
          testimonialsRes,
          settingsRes,
          esiRes
        ] = await Promise.all([
          fetch('/api/sermons').then(r => r.ok ? r.json() : null),
          fetch('/api/sermons/categories').then(r => r.ok ? r.json() : null),
          fetch('/api/events').then(r => r.ok ? r.json() : null),
          fetch('/api/events/categories').then(r => r.ok ? r.json() : null),
          fetch('/api/gallery').then(r => r.ok ? r.json() : null),
          fetch('/api/gallery/categories').then(r => r.ok ? r.json() : null),
          fetch('/api/testimonials').then(r => r.ok ? r.json() : null),
          fetch('/api/settings').then(r => r.ok ? r.json() : null),
          fetch('/api/esi-modules').then(r => r.ok ? r.json() : null)
        ]);

        if (Array.isArray(sermonsRes)) setSermons(sermonsRes);
        if (Array.isArray(sermonCatsRes)) setSermonCategories(sermonCatsRes);
        if (Array.isArray(eventsRes)) setEvents(eventsRes);
        if (Array.isArray(eventCatsRes)) setEventCategories(eventCatsRes);
        if (Array.isArray(galleryRes)) setGallery(galleryRes);
        if (Array.isArray(galleryCatsRes)) setGalleryCategories(galleryCatsRes);
        if (Array.isArray(testimonialsRes)) setTestimonials(testimonialsRes);
        if (settingsRes && typeof settingsRes === 'object') setSettings(settingsRes);
        if (Array.isArray(esiRes)) setEsiModules(esiRes);
      } catch (err) {
        console.warn('[SQLite API] Impossible de se connecter au serveur backend SQLite, utilisation des données locales.', err);
      }
    };

    fetchDataFromSQLite();
  }, []);

  // Sync to LocalStorage as fallback cache
  useEffect(() => { localStorage.setItem('ebv_sermons', JSON.stringify(sermons)); }, [sermons]);
  useEffect(() => { localStorage.setItem('ebv_sermon_categories', JSON.stringify(sermonCategories)); }, [sermonCategories]);
  useEffect(() => { localStorage.setItem('ebv_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('ebv_event_categories', JSON.stringify(eventCategories)); }, [eventCategories]);
  useEffect(() => { localStorage.setItem('ebv_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('ebv_gallery_categories', JSON.stringify(galleryCategories)); }, [galleryCategories]);
  useEffect(() => { localStorage.setItem('ebv_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('ebv_settings', JSON.stringify(settings)); }, [settings]);

  // Sermons handlers
  const addSermon = async (data: Omit<Sermon, 'id'>) => {
    const tempId = `sermon-${Date.now()}`;
    const newSermon: Sermon = { ...data, id: tempId };
    setSermons(prev => [newSermon, ...prev]);

    try {
      const res = await fetch('/api/sermons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSermon)
      });
      if (res.ok) {
        const saved = await res.json();
        setSermons(prev => prev.map(s => s.id === tempId ? saved : s));
      }
    } catch (err) {
      console.error('Erreur API SQLite addSermon:', err);
    }
  };

  const updateSermon = async (id: string, data: Partial<Sermon>) => {
    setSermons(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    try {
      const current = sermons.find(s => s.id === id) || {};
      await fetch(`/api/sermons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, ...data })
      });
    } catch (err) {
      console.error('Erreur API SQLite updateSermon:', err);
    }
  };

  const deleteSermon = async (id: string) => {
    setSermons(prev => prev.filter(s => s.id !== id));
    try {
      await fetch(`/api/sermons/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erreur API SQLite deleteSermon:', err);
    }
  };

  const addSermonCategory = async (category: string) => {
    const trimmed = category.trim();
    if (trimmed && !sermonCategories.includes(trimmed)) {
      setSermonCategories(prev => [...prev, trimmed]);
      try {
        await fetch('/api/sermons/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmed })
        });
      } catch (err) {
        console.error('Erreur API SQLite addSermonCategory:', err);
      }
    }
  };

  const deleteSermonCategory = async (category: string) => {
    setSermonCategories(prev => prev.filter(c => c !== category));
    try {
      await fetch(`/api/sermons/categories/${encodeURIComponent(category)}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erreur API SQLite deleteSermonCategory:', err);
    }
  };

  // Events handlers
  const addEvent = async (data: Omit<ChurchEvent, 'id'>) => {
    const tempId = `evt-${Date.now()}`;
    const newEvt: ChurchEvent = { ...data, id: tempId };
    setEvents(prev => [newEvt, ...prev]);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvt)
      });
      if (res.ok) {
        const saved = await res.json();
        setEvents(prev => prev.map(e => e.id === tempId ? saved : e));
      }
    } catch (err) {
      console.error('Erreur API SQLite addEvent:', err);
    }
  };

  const updateEvent = async (id: string, data: Partial<ChurchEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
    try {
      const current = events.find(e => e.id === id) || {};
      await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, ...data })
      });
    } catch (err) {
      console.error('Erreur API SQLite updateEvent:', err);
    }
  };

  const deleteEvent = async (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erreur API SQLite deleteEvent:', err);
    }
  };

  const addEventCategory = async (category: string) => {
    const trimmed = category.trim();
    if (trimmed && !eventCategories.includes(trimmed)) {
      setEventCategories(prev => [...prev, trimmed]);
      try {
        await fetch('/api/events/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmed })
        });
      } catch (err) {
        console.error('Erreur API SQLite addEventCategory:', err);
      }
    }
  };

  const deleteEventCategory = async (category: string) => {
    setEventCategories(prev => prev.filter(c => c !== category));
    try {
      await fetch(`/api/events/categories/${encodeURIComponent(category)}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erreur API SQLite deleteEventCategory:', err);
    }
  };

  // Gallery handlers
  const addGalleryItem = async (data: Omit<GalleryItem, 'id'>) => {
    const tempId = `gal-${Date.now()}`;
    const newItem: GalleryItem = { ...data, id: tempId };
    setGallery(prev => [newItem, ...prev]);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        const saved = await res.json();
        setGallery(prev => prev.map(g => g.id === tempId ? saved : g));
      }
    } catch (err) {
      console.error('Erreur API SQLite addGalleryItem:', err);
    }
  };

  const updateGalleryItem = async (id: string, data: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...data } : g));
    try {
      const current = gallery.find(g => g.id === id) || {};
      await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, ...data })
      });
    } catch (err) {
      console.error('Erreur API SQLite updateGalleryItem:', err);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erreur API SQLite deleteGalleryItem:', err);
    }
  };

  const addGalleryCategory = async (category: string) => {
    const trimmed = category.trim();
    if (trimmed && !galleryCategories.includes(trimmed)) {
      setGalleryCategories(prev => [...prev, trimmed]);
      try {
        await fetch('/api/gallery/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmed })
        });
      } catch (err) {
        console.error('Erreur API SQLite addGalleryCategory:', err);
      }
    }
  };

  const deleteGalleryCategory = async (category: string) => {
    setGalleryCategories(prev => prev.filter(c => c !== category));
    try {
      await fetch(`/api/gallery/categories/${encodeURIComponent(category)}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erreur API SQLite deleteGalleryCategory:', err);
    }
  };

  // Testimonials handlers
  const addTestimonial = async (data: Omit<Testimonial, 'id'>) => {
    const tempId = `test-${Date.now()}`;
    const newItem: Testimonial = { ...data, id: tempId };
    setTestimonials(prev => [newItem, ...prev]);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        const saved = await res.json();
        setTestimonials(prev => prev.map(t => t.id === tempId ? saved : t));
      }
    } catch (err) {
      console.error('Erreur API SQLite addTestimonial:', err);
    }
  };

  const updateTestimonial = async (id: string, data: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
    try {
      const current = testimonials.find(t => t.id === id) || {};
      await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, ...data })
      });
    } catch (err) {
      console.error('Erreur API SQLite updateTestimonial:', err);
    }
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erreur API SQLite deleteTestimonial:', err);
    }
  };

  // Settings handlers
  const updateSettings = async (data: Partial<ChurchSettings>) => {
    const updated = { ...settings, ...data };
    setSettings(updated);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error('Erreur API SQLite updateSettings:', err);
    }
  };

  return (
    <DataContext.Provider value={{
      sermons, sermonCategories, events, eventCategories, gallery, galleryCategories, testimonials, esiModules, settings,
      addSermon, updateSermon, deleteSermon, addSermonCategory, deleteSermonCategory,
      addEvent, updateEvent, deleteEvent, addEventCategory, deleteEventCategory,
      addGalleryItem, updateGalleryItem, deleteGalleryItem, addGalleryCategory, deleteGalleryCategory,
      addTestimonial, updateTestimonial, deleteTestimonial,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

