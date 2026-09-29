import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, Calendar, Camera, Settings as SettingsIcon, MessageSquare, 
  Plus, Trash2, Edit2, LogOut, Shield, Check, Save, Globe, LayoutDashboard, X, Tag,
  Upload, Film, User, Clock, Repeat, Music, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import type { Sermon, ChurchEvent, GalleryItem, Testimonial, ChurchSettings } from '../types';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { 
    sermons, addSermon, updateSermon, deleteSermon, sermonCategories, addSermonCategory, deleteSermonCategory,
    events, addEvent, updateEvent, deleteEvent, eventCategories, addEventCategory, deleteEventCategory,
    gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, galleryCategories, addGalleryCategory, deleteGalleryCategory,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    settings, updateSettings
  } = useData();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sermons' | 'events' | 'gallery' | 'testimonials' | 'settings'>('sermons');
  
  // Modals state
  const [sermonModalOpen, setSermonModalOpen] = useState(false);
  const [editingSermonId, setEditingSermonId] = useState<string | null>(null);
  const [newSermonCategoryInput, setNewSermonCategoryInput] = useState('');
  const [isCustomSermonCategory, setIsCustomSermonCategory] = useState(false);
  const [customSermonCategoryInput, setCustomSermonCategoryInput] = useState('');
  const [sermonForm, setSermonForm] = useState({
    title: '', 
    speaker: 'Pasteur Principal', 
    date: new Date().toISOString().split('T')[0],
    mediaFormat: 'video' as 'video' | 'audio' | 'both',
    videoUrl: '', 
    videoType: 'youtube' as 'youtube' | 'upload',
    audioUrl: '',
    audioType: 'url' as 'url' | 'upload',
    description: '', 
    thumbnail: '', 
    category: 'Foi & Vie'
  });

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [newEventCategoryInput, setNewEventCategoryInput] = useState('');
  const [isCustomEventCategory, setIsCustomEventCategory] = useState(false);
  const [customEventCategoryInput, setCustomEventCategoryInput] = useState('');
  const [eventForm, setEventForm] = useState({
    title: '', 
    date: new Date().toISOString().split('T')[0], 
    time: '10h30 - 12h00',
    location: 'Secteur Culte Principal - Vitry', 
    description: '', 
    status: 'upcoming' as 'upcoming' | 'past',
    programType: 'ponctuel' as 'ponctuel' | 'regulier',
    category: 'Culte', 
    imageUrl: ''
  });

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'Culte', imageUrl: '', caption: '', date: 'Septembre 2026'
  });

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    author: '',
    role: 'Fidèle de l\'église',
    content: '',
    date: 'Septembre 2026',
    avatarUrl: ''
  });

  const [settingsForm, setSettingsForm] = useState<ChurchSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Protected route check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <Card className="text-center space-y-4 max-w-sm p-8 bg-slate-800 border-slate-700">
          <Shield className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Accès Réservé aux Administrateurs</h2>
          <p className="text-xs text-slate-400">Veuillez vous connecter avec vos identifiants JWT pour accéder au Back-Office.</p>
          <Button 
            onClick={() => navigate('/login')}
            className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)]"
          >
            Aller à la page de connexion
          </Button>
        </Card>
      </div>
    );
  }

  // Sermon Submit
  const handleSermonSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasVid = Boolean(sermonForm.videoUrl && sermonForm.videoUrl.trim() !== '');
    const hasAud = Boolean(sermonForm.audioUrl && sermonForm.audioUrl.trim() !== '');

    let computedFormat: 'video' | 'audio' | 'both' = sermonForm.mediaFormat;
    if (hasVid && hasAud) {
      computedFormat = 'both';
    } else if (hasAud && !hasVid) {
      computedFormat = 'audio';
    } else if (hasVid && !hasAud) {
      computedFormat = 'video';
    }

    const finalForm = {
      ...sermonForm,
      mediaFormat: computedFormat,
      videoUrl: (sermonForm.mediaFormat === 'audio' && !hasVid) ? '' : sermonForm.videoUrl,
      audioUrl: (sermonForm.mediaFormat === 'video' && !hasAud) ? '' : sermonForm.audioUrl,
    };
    if (sermonForm.category && sermonForm.category.trim()) {
      addSermonCategory(sermonForm.category.trim());
    }

    if (editingSermonId) {
      updateSermon(editingSermonId, finalForm);
    } else {
      addSermon(finalForm);
    }
    setSermonModalOpen(false);
    setEditingSermonId(null);
    setIsCustomSermonCategory(false);
    setCustomSermonCategoryInput('');
    setSermonForm({
      title: '', speaker: 'Pasteur Principal', date: new Date().toISOString().split('T')[0],
      mediaFormat: 'video', videoUrl: '', videoType: 'youtube', audioUrl: '', audioType: 'url',
      description: '', thumbnail: '', category: sermonCategories[0] || 'Foi & Vie'
    });
  };

  const openEditSermon = (s: Sermon) => {
    setEditingSermonId(s.id);
    setIsCustomSermonCategory(false);
    setCustomSermonCategoryInput('');
    const hasVid = Boolean(s.videoUrl && s.videoUrl.trim() !== '');
    const hasAud = Boolean(s.audioUrl && s.audioUrl.trim() !== '');
    let fmt: 'video' | 'audio' | 'both' = 'video';
    if (hasVid && hasAud) fmt = 'both';
    else if (hasAud && !hasVid) fmt = 'audio';
    else fmt = 'video';

    setSermonForm({
      title: s.title,
      speaker: s.speaker,
      date: s.date,
      mediaFormat: s.mediaFormat || fmt,
      videoUrl: s.videoUrl || '',
      videoType: s.videoType || (s.videoUrl && (s.videoUrl.includes('youtube') || s.videoUrl.includes('youtu.be')) ? 'youtube' : 'upload'),
      audioUrl: s.audioUrl || '',
      audioType: s.audioType || 'url',
      description: s.description,
      thumbnail: s.thumbnail,
      category: s.category
    });
    setSermonModalOpen(true);
  };

  // Event Submit
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEventId) {
      updateEvent(editingEventId, eventForm);
    } else {
      addEvent(eventForm);
    }
    setEventModalOpen(false);
    setEditingEventId(null);
    setEventForm({
      title: '', date: new Date().toISOString().split('T')[0], time: '10h30 - 12h00',
      location: 'Vitry', description: '', status: 'upcoming', programType: 'ponctuel', category: 'Culte', imageUrl: ''
    });
  };

  const openEditEvent = (evt: ChurchEvent) => {
    setEditingEventId(evt.id);
    setEventForm({
      title: evt.title,
      date: evt.date,
      time: evt.time,
      location: evt.location,
      description: evt.description,
      status: evt.status,
      programType: evt.programType || 'ponctuel',
      category: evt.category,
      imageUrl: evt.imageUrl || ''
    });
    setEventModalOpen(true);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryInput.trim()) {
      addGalleryCategory(newCategoryInput.trim());
      setNewCategoryInput('');
    }
  };

  // Gallery Submit & Edit
  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = isCustomCategory ? customCategoryInput.trim() : galleryForm.category;
    if (!finalCategory) return;

    if (isCustomCategory && customCategoryInput.trim()) {
      addGalleryCategory(customCategoryInput.trim());
    }

    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, {
        ...galleryForm,
        category: finalCategory
      });
    } else {
      addGalleryItem({
        ...galleryForm,
        category: finalCategory
      });
    }

    setGalleryModalOpen(false);
    setEditingGalleryId(null);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setGalleryForm({ title: '', category: galleryCategories[0] || 'Culte', imageUrl: '', caption: '', date: 'Septembre 2026' });
  };

  const openEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setIsCustomCategory(false);
    setGalleryForm({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      caption: item.caption || '',
      date: item.date || 'Septembre 2026'
    });
    setGalleryModalOpen(true);
  };

  // Testimonials Submit & Edit
  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonialId) {
      updateTestimonial(editingTestimonialId, testimonialForm);
    } else {
      addTestimonial(testimonialForm);
    }
    setTestimonialModalOpen(false);
    setEditingTestimonialId(null);
    setTestimonialForm({
      author: '',
      role: 'Fidèle de l\'église',
      content: '',
      date: 'Septembre 2026',
      avatarUrl: ''
    });
  };

  const openEditTestimonial = (t: Testimonial) => {
    setEditingTestimonialId(t.id);
    setTestimonialForm({
      author: t.author,
      role: t.role,
      content: t.content,
      date: t.date || 'Septembre 2026',
      avatarUrl: t.avatarUrl || ''
    });
    setTestimonialModalOpen(true);
  };

  // Settings Save
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans dark:bg-slate-950 dark:text-slate-100">
      
      {/* Top Header */}
      <header className="bg-[rgb(55,69,90)] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[rgb(53,125,122)] flex items-center justify-center text-white font-bold">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-bold text-base leading-tight">Back-Office Église Baptiste Vitry</span>
            <span className="block text-[10px] text-teal-200">Connecté en tant que {user?.name || 'Administrateur'} (Shadcn UI)</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 text-xs font-semibold"
          >
            <Globe className="w-3.5 h-3.5 text-teal-200 mr-1" />
            <span>Voir le site public</span>
          </Button>

          <Button 
            variant="destructive"
            onClick={() => { logout(); navigate('/login'); }}
            className="text-xs font-bold"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Menu (3 cols) */}
        <aside className="lg:col-span-3 space-y-2">
          <Card className="p-3 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">Gestion de Contenu</span>
            
            {[
              { id: 'sermons', label: 'Sermons & Prédications', icon: Video, count: sermons.length },
              { id: 'events', label: 'Événements & Agenda', icon: Calendar, count: events.length },
              { id: 'gallery', label: 'Galerie Média', icon: Camera, count: gallery.length },
              { id: 'testimonials', label: 'Témoignages & Actualités', icon: MessageSquare, count: testimonials.length },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full px-3.5 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[rgb(53,125,122)] to-[rgb(38,92,90)] text-white shadow-md shadow-[rgb(53,125,122)]/30 ring-2 ring-[rgb(53,125,122)]/40 translate-x-1'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-teal-200' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white border border-white/30 backdrop-blur-xs' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                  }`}>
                    {item.count}
                  </span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full px-3.5 py-3 rounded-2xl text-xs font-bold flex items-center space-x-2.5 transition-all duration-200 cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-[rgb(55,69,90)] to-slate-800 text-white shadow-md shadow-slate-900/20 ring-2 ring-slate-700/30 translate-x-1'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <SettingsIcon className={`w-4 h-4 transition-colors ${activeTab === 'settings' ? 'text-teal-200' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>Configuration Générales</span>
              </button>
            </div>
          </Card>
        </aside>

        {/* Content Area (9 cols) */}
        <main className="lg:col-span-9 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[600px] dark:bg-slate-900 dark:border-slate-800">
          
          {/* TAB 1: SERMONS */}
          {activeTab === 'sermons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white">Gestion des Sermons / Prédications</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ajoutez, modifiez ou supprimez les prédications avec choix de vidéo YouTube ou upload direct.</p>
                </div>

                <Button
                  onClick={() => {
                    setEditingSermonId(null);
                    setIsCustomSermonCategory(false);
                    setCustomSermonCategoryInput('');
                    setSermonForm({
                      title: '', speaker: 'Pasteur Principal', date: new Date().toISOString().split('T')[0],
                      mediaFormat: 'video', videoUrl: '', videoType: 'youtube', audioUrl: '', audioType: 'url',
                      description: '', thumbnail: '', category: sermonCategories[0] || 'Foi & Vie'
                    });
                    setSermonModalOpen(true);
                  }}
                  className="bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-xs font-bold"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Ajouter un sermon</span>
                </Button>
              </div>

              {/* Sermon Categories Manager (Toujours Avant le reste) */}
              <Card className="p-5 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-[rgb(53,125,122)]" />
                      <span>Gestion des Catégories de Sermons</span>
                    </h3>
                    <p className="text-xs text-slate-500">Créez ou supprimez des catégories personnalisées pour organiser vos prédications.</p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newSermonCategoryInput.trim()) {
                        addSermonCategory(newSermonCategoryInput.trim());
                        setNewSermonCategoryInput('');
                      }
                    }} 
                    className="flex items-center space-x-2"
                  >
                    <Input
                      type="text"
                      placeholder="Nouvelle catégorie (ex: Prophétie, Louange...)"
                      value={newSermonCategoryInput}
                      onChange={(e) => setNewSermonCategoryInput(e.target.value)}
                      className="w-56 text-xs h-9"
                    />
                    <Button type="submit" size="sm" className="bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-xs font-bold shrink-0">
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Créer</span>
                    </Button>
                  </form>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {sermonCategories.map((cat) => (
                    <div key={cat} className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-2xs">
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={() => deleteSermonCategory(cat)}
                        className="text-slate-400 hover:text-rose-600 transition ml-1 p-0 border-0 bg-transparent cursor-pointer"
                        title="Supprimer la catégorie"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Liste des sermons */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {sermons.map((sermon) => {
                  const hasVid = Boolean(sermon.videoUrl && sermon.videoUrl.trim() !== '');
                  const hasAud = Boolean(sermon.audioUrl && sermon.audioUrl.trim() !== '');
                  const isUploadedVideo = hasVid && (sermon.videoType === 'upload' || (!sermon.videoUrl?.includes('youtube') && !sermon.videoUrl?.includes('youtu.be')));
                  
                  return (
                    <div key={sermon.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition">
                      <div className="flex items-center space-x-4">
                        <img src={sermon.thumbnail || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=500"} alt={sermon.title} className="w-20 h-14 object-cover rounded-lg shrink-0 border" />
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            {hasVid && hasAud ? (
                              <Badge variant="emerald" className="text-[10px] gap-1">
                                <Video className="w-3 h-3" />
                                <Music className="w-3 h-3" />
                                <span>Vidéo & Audio</span>
                              </Badge>
                            ) : hasAud ? (
                              <Badge variant="amber" className="text-[10px] gap-1">
                                <Music className="w-3 h-3" />
                                <span>Audio {sermon.audioType === 'upload' ? 'Téléversé' : 'URL'}</span>
                              </Badge>
                            ) : (
                              <Badge variant={isUploadedVideo ? "indigo" : "destructive"} className="text-[10px] gap-1">
                                {isUploadedVideo ? <Film className="w-3 h-3" /> : <YoutubeIcon className="w-3 h-3" />}
                                <span>{isUploadedVideo ? 'Vidéo téléversée' : 'Lien YouTube'}</span>
                              </Badge>
                            )}
                            <span className="text-xs font-bold text-[rgb(53,125,122)]">{sermon.category}</span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-white">{sermon.title}</h4>
                          <span className="text-xs text-slate-500 block">{sermon.speaker} • {sermon.date}</span>
                          {hasVid && <span className="text-[11px] text-slate-400 block truncate max-w-md font-mono">Vidéo: {sermon.videoUrl}</span>}
                          {hasAud && <span className="text-[11px] text-slate-400 block truncate max-w-md font-mono">Audio: {sermon.audioUrl}</span>}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <button 
                          type="button"
                          onClick={() => openEditSermon(sermon)}
                          title="Modifier ce sermon"
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 hover:border-teal-300 hover:text-[rgb(53,125,122)] transition shadow-2xs cursor-pointer flex items-center justify-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => deleteSermon(sermon.id)}
                          title="Supprimer ce sermon"
                          className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 hover:bg-rose-600 hover:text-white transition shadow-2xs cursor-pointer flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white">Gestion des Événements & Agenda</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Planifiez les programmes ponctuels et les programmes réguliers de l'église.</p>
                </div>

                <Button
                  onClick={() => {
                    setEditingEventId(null);
                    setEventForm({
                      title: '', date: new Date().toISOString().split('T')[0], time: '10h30 - 12h00',
                      location: 'Vitry', description: '', status: 'upcoming', programType: 'ponctuel', category: 'Culte', imageUrl: ''
                    });
                    setEventModalOpen(true);
                  }}
                  className="bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-xs font-bold"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Ajouter un événement</span>
                </Button>
              </div>

              {/* Event Categories Manager (Toujours Avant le reste) */}
              <Card className="p-5 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-[rgb(53,125,122)]" />
                      <span>Gestion des Catégories d'Événements</span>
                    </h3>
                    <p className="text-xs text-slate-500">Créez ou supprimez des catégories personnalisées pour organiser vos événements.</p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newEventCategoryInput.trim()) {
                        addEventCategory(newEventCategoryInput.trim());
                        setNewEventCategoryInput('');
                      }
                    }} 
                    className="flex items-center space-x-2"
                  >
                    <Input
                      type="text"
                      placeholder="Nouvelle catégorie..."
                      value={newEventCategoryInput}
                      onChange={(e) => setNewEventCategoryInput(e.target.value)}
                      className="w-48 text-xs h-9"
                    />
                    <Button type="submit" size="sm" className="bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-xs font-bold shrink-0">
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Créer</span>
                    </Button>
                  </form>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {eventCategories.map((cat) => (
                    <div key={cat} className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-2xs">
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={() => deleteEventCategory(cat)}
                        className="text-slate-400 hover:text-rose-600 transition ml-1 p-0 border-0 bg-transparent cursor-pointer"
                        title="Supprimer la catégorie"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Liste des événements */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {events.map((evt) => {
                  const isRegulier = evt.programType === 'regulier';
                  return (
                    <div key={evt.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant={evt.status === 'upcoming' ? 'emerald' : 'outline'} className="text-[10px]">
                            {evt.status === 'upcoming' ? 'À venir' : 'Passé'}
                          </Badge>

                          <Badge variant={isRegulier ? 'amber' : 'purple'} className="text-[10px] gap-1">
                            {isRegulier ? <Repeat className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            <span>{isRegulier ? 'Programme Régulier' : 'Programme Ponctuel'}</span>
                          </Badge>

                          <span className="text-xs font-bold text-[rgb(53,125,122)]">{evt.category}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{evt.title}</h4>
                        <span className="text-xs text-slate-500 block">Date : {evt.date} à {evt.time} | Lieu : {evt.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <button 
                          type="button"
                          onClick={() => openEditEvent(evt)}
                          title="Modifier cet événement"
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 hover:border-teal-300 hover:text-[rgb(53,125,122)] transition shadow-2xs cursor-pointer flex items-center justify-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => deleteEvent(evt.id)}
                          title="Supprimer cet événement"
                          className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 hover:bg-rose-600 hover:text-white transition shadow-2xs cursor-pointer flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white">Gestion de la Galerie Média</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Uploadez, modifiez et gérez les photos et leurs catégories.</p>
                </div>

                <Button
                  onClick={() => {
                    setEditingGalleryId(null);
                    setIsCustomCategory(false);
                    setGalleryForm({ title: '', category: galleryCategories[0] || 'Culte', imageUrl: '', caption: '', date: 'Septembre 2026' });
                    setGalleryModalOpen(true);
                  }}
                  className="bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-xs font-bold"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Ajouter une photo</span>
                </Button>
              </div>

              {/* Category Management Block */}
              <Card className="p-4 space-y-3 bg-slate-50 dark:bg-slate-850">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-[rgb(53,125,122)]" />
                    <h3 className="font-bold text-sm text-[rgb(55,69,90)] dark:text-white">Catégories de la Galerie</h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{galleryCategories.length} catégories</span>
                </div>

                {/* Categories List */}
                <div className="flex flex-wrap gap-2">
                  {galleryCategories.map((cat) => (
                    <div 
                      key={cat}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-2xs"
                    >
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={() => deleteGalleryCategory(cat)}
                        className="text-slate-400 hover:text-rose-600 transition ml-1 p-0 border-0 bg-transparent cursor-pointer"
                        title="Supprimer cette catégorie"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Category Form */}
                <form onSubmit={handleAddCategorySubmit} className="flex gap-2 pt-1">
                  <Input
                    type="text"
                    placeholder="Nouvelle catégorie (ex: Baptêmes, Retraite...)"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    className="flex-1 text-xs h-9"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[rgb(55,69,90)] hover:bg-slate-800 text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Créer</span>
                  </Button>
                </form>
              </Card>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <Card key={item.id} className="group relative overflow-hidden flex flex-col p-0 border">
                    <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition shadow">
                        <button
                          onClick={() => openEditGallery(item)}
                          className="p-1.5 bg-white text-slate-700 hover:text-[rgb(53,125,122)] rounded-lg font-bold shadow"
                          title="Modifier cette photo"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteGalleryItem(item.id)}
                          className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold shadow"
                          title="Supprimer cette photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2.5 text-xs">
                      <span className="font-bold block text-slate-800 dark:text-white line-clamp-1">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.category}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white">Gestion des Témoignages</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Créez, modifiez ou supprimez les témoignages avec photo de profil d'auteur.</p>
                </div>

                <Button
                  onClick={() => {
                    setEditingTestimonialId(null);
                    setTestimonialForm({
                      author: '', role: 'Fidèle de l\'église', content: '', date: 'Septembre 2026', avatarUrl: ''
                    });
                    setTestimonialModalOpen(true);
                  }}
                  className="bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-xs font-bold"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Ajouter un témoignage</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map(t => (
                  <Card key={t.id} className="p-4 flex flex-col justify-between space-y-3 relative group">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12 border-2 border-[rgb(53,125,122)]">
                        <AvatarImage src={t.avatarUrl} alt={t.author} />
                        <AvatarFallback><User className="w-6 h-6 text-[rgb(53,125,122)]" /></AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <strong className="text-sm font-bold text-[rgb(55,69,90)] dark:text-white block">{t.author}</strong>
                        <span className="text-[11px] text-[rgb(53,125,122)] font-semibold block">{t.role}</span>
                        <span className="text-[10px] text-slate-400 block">{t.date}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      "{t.content}"
                    </p>

                    <div className="flex justify-end space-x-2 pt-1">
                      <button 
                        type="button"
                        onClick={() => openEditTestimonial(t)}
                        title="Modifier ce témoignage"
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 hover:border-teal-300 hover:text-[rgb(53,125,122)] transition shadow-2xs cursor-pointer flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => deleteTestimonial(t.id)}
                        title="Supprimer ce témoignage"
                        className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 hover:bg-rose-600 hover:text-white transition shadow-2xs cursor-pointer flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GENERAL SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSettingsSubmit} className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white">Configuration Générale du Site</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Modifiez les horaires, le lien SumUp et les coordonnées de l'église.</p>
                </div>
                {settingsSaved && (
                  <Badge variant="emerald" className="px-3 py-1 gap-1 text-xs">
                    <Check className="w-4 h-4" />
                    <span>Modifications enregistrées !</span>
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nom de l'Église</Label>
                  <Input 
                    type="text" 
                    value={settingsForm.churchName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, churchName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Adresse</Label>
                  <Input 
                    type="text" 
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input 
                    type="text" 
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <Label>Lien de Don SumUp</Label>
                  <Input 
                    type="text" 
                    value={settingsForm.donationLink}
                    onChange={(e) => setSettingsForm({ ...settingsForm, donationLink: e.target.value })}
                    className="font-mono text-xs"
                  />
                </div>

                <div>
                  <Label>URL Image QR Code SumUp</Label>
                  <Input 
                    type="text" 
                    value={settingsForm.sumupQrCodeUrl || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, sumupQrCodeUrl: e.target.value })}
                    className="font-mono text-xs"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] font-bold text-sm px-6"
              >
                <Save className="w-4 h-4 mr-2" />
                <span>Enregistrer la configuration</span>
              </Button>
            </form>
          )}

        </main>

      </div>

      {/* MODAL SERMON */}
      <Dialog open={sermonModalOpen} onOpenChange={setSermonModalOpen}>
        <DialogContent onClose={() => setSermonModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>{editingSermonId ? 'Modifier Sermon' : 'Nouveau Sermon'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSermonSubmit} className="space-y-4 pt-2">
            <div>
              <Label>Titre du Sermon *</Label>
              <Input type="text" required value={sermonForm.title} onChange={e => setSermonForm({ ...sermonForm, title: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Intervenant / Orateur *</Label>
                <Input type="text" required value={sermonForm.speaker} onChange={e => setSermonForm({ ...sermonForm, speaker: e.target.value })} />
              </div>
              <div>
                <Label>Date *</Label>
                <Input type="date" required value={sermonForm.date} onChange={e => setSermonForm({ ...sermonForm, date: e.target.value })} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>Catégorie *</Label>
                <button
                  type="button"
                  onClick={() => setIsCustomSermonCategory(!isCustomSermonCategory)}
                  className="text-xs text-[rgb(53,125,122)] hover:underline font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>{isCustomSermonCategory ? 'Choisir dans la liste' : 'Créer une catégorie'}</span>
                </button>
              </div>

              {isCustomSermonCategory ? (
                <Input
                  type="text"
                  required
                  placeholder="Entrez une nouvelle catégorie..."
                  value={customSermonCategoryInput}
                  onChange={(e) => {
                    setCustomSermonCategoryInput(e.target.value);
                    setSermonForm({ ...sermonForm, category: e.target.value });
                  }}
                />
              ) : (
                <select
                  required
                  value={sermonForm.category}
                  onChange={(e) => setSermonForm({ ...sermonForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-[rgb(53,125,122)] outline-none"
                >
                  {sermonCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Selector: Format Médias (Vidéo / Audio / Les deux) */}
            <div className="space-y-2">
              <Label className="text-slate-800 dark:text-white">Format Médias Disponible *</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSermonForm({ ...sermonForm, mediaFormat: 'video' })}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                    sermonForm.mediaFormat === 'video' 
                      ? 'bg-[rgb(53,125,122)] text-white shadow-sm border border-transparent' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Vidéo Seule</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSermonForm({ ...sermonForm, mediaFormat: 'audio' })}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                    sermonForm.mediaFormat === 'audio' 
                      ? 'bg-[rgb(55,69,90)] text-white shadow-sm border border-transparent' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Audio Seul</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSermonForm({ ...sermonForm, mediaFormat: 'both' })}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                    sermonForm.mediaFormat === 'both' 
                      ? 'bg-teal-700 text-white shadow-sm border border-transparent' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vidéo & Audio</span>
                </button>
              </div>
            </div>

            {/* Video Section */}
            {(sermonForm.mediaFormat === 'video' || sermonForm.mediaFormat === 'both') && (
              <Card className="p-3 space-y-3 bg-slate-50 border-slate-200 dark:bg-slate-800">
                <Label className="text-slate-800 dark:text-white flex items-center justify-between">
                  <span>Source de la Vidéo *</span>
                  <Badge variant="emerald" className="text-[10px]">Format Vidéo</Badge>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSermonForm({ ...sermonForm, videoType: 'youtube' })}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                      sermonForm.videoType === 'youtube'
                        ? 'bg-rose-600 text-white shadow-sm border border-transparent'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <YoutubeIcon className="w-4 h-4" />
                    <span>Lien YouTube</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSermonForm({ ...sermonForm, videoType: 'upload' })}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                      sermonForm.videoType === 'upload'
                        ? 'bg-[rgb(53,125,122)] text-white shadow-sm border border-transparent'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Film className="w-4 h-4" />
                    <span>Uploader une Vidéo</span>
                  </button>
                </div>

                {sermonForm.videoType === 'youtube' ? (
                  <div>
                    <Label className="text-[11px] font-semibold">URL Vidéo YouTube *</Label>
                    <Input 
                      type="text" 
                      placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..." 
                      value={sermonForm.videoUrl} 
                      onChange={e => setSermonForm({ ...sermonForm, videoUrl: e.target.value })} 
                      className="font-mono text-xs" 
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold">Téléverser une vidéo (MP4/WebM)</Label>
                    
                    {sermonForm.videoUrl ? (
                      <div className="relative p-2 bg-slate-900 rounded-xl text-white text-xs flex items-center justify-between">
                        <span className="truncate max-w-[300px] font-mono text-[11px]">{sermonForm.videoUrl.substring(0, 40)}...</span>
                        <Button
                          type="button"
                          size="icon-xs"
                          variant="destructive"
                          onClick={() => setSermonForm({ ...sermonForm, videoUrl: '' })}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <label className="w-full py-3 px-4 border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 rounded-2xl text-xs font-bold text-indigo-700 flex items-center justify-center space-x-2 transition cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Parcourir les fichiers vidéo de mon appareil</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (evt) => {
                                if (evt.target?.result) {
                                  setSermonForm({ ...sermonForm, videoUrl: evt.target.result as string, videoType: 'upload' });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    )}

                    <Input 
                      type="text" 
                      placeholder="Ou coller une URL direct MP4..." 
                      value={sermonForm.videoUrl} 
                      onChange={e => setSermonForm({ ...sermonForm, videoUrl: e.target.value })} 
                      className="font-mono text-xs" 
                    />
                  </div>
                )}
              </Card>
            )}

            {/* Audio Section */}
            {(sermonForm.mediaFormat === 'audio' || sermonForm.mediaFormat === 'both') && (
              <Card className="p-3 space-y-3 bg-slate-50 border-slate-200 dark:bg-slate-800">
                <Label className="text-slate-800 dark:text-white flex items-center justify-between">
                  <span>Source de l'Audio MP3 *</span>
                  <Badge variant="amber" className="text-[10px]">Format Audio</Badge>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSermonForm({ ...sermonForm, audioType: 'url' })}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                      sermonForm.audioType === 'url'
                        ? 'bg-[rgb(53,125,122)] text-white shadow-sm border border-transparent'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Music className="w-4 h-4" />
                    <span>Lien URL Audio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSermonForm({ ...sermonForm, audioType: 'upload' })}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                      sermonForm.audioType === 'upload'
                        ? 'bg-[rgb(55,69,90)] text-white shadow-sm border border-transparent'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>Uploader un Fichier Audio</span>
                  </button>
                </div>

                {sermonForm.audioType === 'url' ? (
                  <div>
                    <Label className="text-[11px] font-semibold">URL Audio MP3/WAV *</Label>
                    <Input 
                      type="text" 
                      placeholder="https://.../audio.mp3" 
                      value={sermonForm.audioUrl} 
                      onChange={e => setSermonForm({ ...sermonForm, audioUrl: e.target.value })} 
                      className="font-mono text-xs" 
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold">Téléverser un fichier Audio (MP3/WAV/AAC)</Label>
                    
                    {sermonForm.audioUrl ? (
                      <div className="relative p-2 bg-slate-900 rounded-xl text-white text-xs flex items-center justify-between">
                        <span className="truncate max-w-[300px] font-mono text-[11px]">{sermonForm.audioUrl.substring(0, 40)}...</span>
                        <Button
                          type="button"
                          size="icon-xs"
                          variant="destructive"
                          onClick={() => setSermonForm({ ...sermonForm, audioUrl: '' })}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <label className="w-full py-3 px-4 border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-50 rounded-2xl text-xs font-bold text-[rgb(53,125,122)] flex items-center justify-center space-x-2 transition cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Parcourir les fichiers audio (MP3, WAV, AAC)</span>
                        <input
                          type="file"
                          accept="audio/mp3,audio/wav,audio/aac,audio/m4a,audio/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (evt) => {
                                if (evt.target?.result) {
                                  setSermonForm({ ...sermonForm, audioUrl: evt.target.result as string, audioType: 'upload' });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    )}

                    <Input 
                      type="text" 
                      placeholder="Ou coller une URL direct MP3..." 
                      value={sermonForm.audioUrl} 
                      onChange={e => setSermonForm({ ...sermonForm, audioUrl: e.target.value })} 
                      className="font-mono text-xs" 
                    />
                  </div>
                )}
              </Card>
            )}

            {/* Thumbnail Field */}
            <div>
              <Label>Image Miniature (Fichier ou URL) *</Label>
              {sermonForm.thumbnail ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 mb-2">
                  <img src={sermonForm.thumbnail} alt="Miniature" className="w-full h-32 object-cover" />
                  <button
                    type="button"
                    onClick={() => setSermonForm({ ...sermonForm, thumbnail: '' })}
                    className="absolute top-2 right-2 p-1 bg-rose-600 text-white rounded-lg"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="w-full py-2.5 px-4 mb-2 border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 rounded-xl text-xs font-bold text-[rgb(53,125,122)] flex items-center justify-center space-x-2 transition cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Choisir l'image miniature depuis l'ordinateur</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          if (evt.target?.result) {
                            setSermonForm({ ...sermonForm, thumbnail: evt.target.result as string });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
              <Input 
                type="text" 
                required 
                placeholder="Ou URL de la miniature..." 
                value={sermonForm.thumbnail} 
                onChange={e => setSermonForm({ ...sermonForm, thumbnail: e.target.value })} 
                className="font-mono text-xs" 
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea rows={3} value={sermonForm.description} onChange={e => setSermonForm({ ...sermonForm, description: e.target.value })} />
            </div>

            <Button type="submit" className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] font-bold">
              Enregistrer le Sermon
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL EVENT */}
      <Dialog open={eventModalOpen} onOpenChange={setEventModalOpen}>
        <DialogContent onClose={() => setEventModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>{editingEventId ? 'Modifier Événement' : 'Nouveau Événement'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEventSubmit} className="space-y-4 pt-2">
            <div>
              <Label>Titre Événement *</Label>
              <Input type="text" required value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} />
            </div>

            {/* Choice: Programme Ponctuel vs Programme Régulier */}
            <Card className="p-3 space-y-2 bg-slate-50 border-slate-200 dark:bg-slate-800">
              <Label className="text-slate-800 dark:text-white">Type de Programme *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={eventForm.programType === 'ponctuel' ? 'default' : 'outline'}
                  onClick={() => setEventForm({ ...eventForm, programType: 'ponctuel' })}
                  className="w-full text-xs font-bold"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Programme Ponctuel</span>
                </Button>

                <Button
                  type="button"
                  variant={eventForm.programType === 'regulier' ? 'secondary' : 'outline'}
                  onClick={() => setEventForm({ ...eventForm, programType: 'regulier' })}
                  className="w-full text-xs font-bold"
                >
                  <Repeat className="w-4 h-4 mr-2" />
                  <span>Programme Régulier</span>
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date *</Label>
                <Input type="date" required value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} />
              </div>
              <div>
                <Label>Heure *</Label>
                <Input type="text" required value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} />
              </div>
            </div>

            <div>
              <Label>Lieu *</Label>
              <Input type="text" required value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Statut *</Label>
                <select value={eventForm.status} onChange={e => setEventForm({ ...eventForm, status: e.target.value as any })} className="w-full p-2.5 border rounded-xl text-sm bg-white dark:bg-slate-900 dark:border-slate-700">
                  <option value="upcoming">À venir</option>
                  <option value="past">Passé</option>
                </select>
              </div>

              <div>
                <Label>Catégorie de l'Événement *</Label>
                <select 
                  value={isCustomEventCategory ? '__custom__' : eventForm.category} 
                  onChange={e => {
                    if (e.target.value === '__custom__') {
                      setIsCustomEventCategory(true);
                    } else {
                      setIsCustomEventCategory(false);
                      setEventForm({ ...eventForm, category: e.target.value });
                    }
                  }} 
                  className="w-full p-2.5 border rounded-xl text-sm bg-white dark:bg-slate-900 dark:border-slate-700"
                >
                  {eventCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__custom__">+ Créer une nouvelle catégorie...</option>
                </select>
                {isCustomEventCategory && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Input 
                      type="text" 
                      placeholder="Nom de la nouvelle catégorie..." 
                      value={customEventCategoryInput}
                      onChange={e => setCustomEventCategoryInput(e.target.value)}
                      className="text-xs"
                    />
                    <Button 
                      type="button" 
                      size="sm"
                      onClick={() => {
                        if (customEventCategoryInput.trim()) {
                          addEventCategory(customEventCategoryInput.trim());
                          setEventForm({ ...eventForm, category: customEventCategoryInput.trim() });
                          setIsCustomEventCategory(false);
                          setCustomEventCategoryInput('');
                        }
                      }}
                      className="bg-[rgb(53,125,122)] text-white font-bold text-xs"
                    >
                      Ajouter
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea rows={3} value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
            </div>

            <Button type="submit" className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] font-bold">
              Enregistrer l'Événement
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL GALLERY */}
      <Dialog open={galleryModalOpen} onOpenChange={setGalleryModalOpen}>
        <DialogContent onClose={() => setGalleryModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>{editingGalleryId ? 'Modifier la Photo' : 'Ajouter une Photo à la Galerie'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleGallerySubmit} className="space-y-4 pt-2">
            <div>
              <Label>Titre de la photo *</Label>
              <Input type="text" required value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} />
            </div>

            <div>
              <Label>Catégorie</Label>
              <select 
                value={isCustomCategory ? '__custom__' : galleryForm.category} 
                onChange={e => {
                  if (e.target.value === '__custom__') {
                    setIsCustomCategory(true);
                  } else {
                    setIsCustomCategory(false);
                    setGalleryForm({ ...galleryForm, category: e.target.value });
                  }
                }} 
                className="w-full p-2.5 border rounded-xl text-sm bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                {galleryCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="__custom__">+ Créer une nouvelle catégorie...</option>
              </select>
            </div>

            {isCustomCategory && (
              <div>
                <Label className="text-[rgb(53,125,122)]">Nom de la nouvelle catégorie *</Label>
                <Input 
                  type="text" 
                  required 
                  placeholder="ex: Baptêmes 2026"
                  value={customCategoryInput} 
                  onChange={e => setCustomCategoryInput(e.target.value)} 
                />
              </div>
            )}

            <div>
              <Label>Photo (Fichier ou URL) *</Label>
              
              {galleryForm.imageUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-2 group">
                  <img src={galleryForm.imageUrl} alt="Aperçu" className="w-full h-44 object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setGalleryForm({ ...galleryForm, imageUrl: '' })}
                    className="absolute top-2 right-2 text-xs"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    <span>Effacer</span>
                  </Button>
                </div>
              ) : (
                <div className="mb-2">
                  <label className="w-full py-3 px-4 border-2 border-dashed border-[rgb(53,125,122)]/50 hover:border-[rgb(53,125,122)] bg-teal-50/40 hover:bg-teal-50 rounded-2xl text-xs font-bold text-[rgb(53,125,122)] flex items-center justify-center space-x-2 transition cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Choisir une photo depuis l'ordinateur</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            if (evt.target?.result) {
                              setGalleryForm({ ...galleryForm, imageUrl: evt.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              )}

              <Input 
                type="text" 
                required 
                placeholder="Ou collez directement l'URL d'une image..." 
                value={galleryForm.imageUrl} 
                onChange={e => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })} 
                className="font-mono text-xs" 
              />
            </div>

            <div>
              <Label>Légende</Label>
              <Input type="text" value={galleryForm.caption} onChange={e => setGalleryForm({ ...galleryForm, caption: e.target.value })} />
            </div>

            <Button type="submit" className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] font-bold">
              {editingGalleryId ? 'Mettre à jour la photo' : 'Ajouter la photo'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL TESTIMONIAL */}
      <Dialog open={testimonialModalOpen} onOpenChange={setTestimonialModalOpen}>
        <DialogContent onClose={() => setTestimonialModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>{editingTestimonialId ? 'Modifier Témoignage' : 'Nouveau Témoignage'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleTestimonialSubmit} className="space-y-4 pt-2">
            <div>
              <Label>Nom & Prénom de l'Auteur *</Label>
              <Input type="text" required placeholder="ex: Frère Jean-Marc" value={testimonialForm.author} onChange={e => setTestimonialForm({ ...testimonialForm, author: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Rôle / Statut *</Label>
                <Input type="text" required placeholder="ex: Membre de l'église" value={testimonialForm.role} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} />
              </div>
              <div>
                <Label>Date *</Label>
                <Input type="text" required placeholder="ex: Septembre 2026" value={testimonialForm.date} onChange={e => setTestimonialForm({ ...testimonialForm, date: e.target.value })} />
              </div>
            </div>

            {/* Avatar photo with File upload or URL */}
            <div>
              <Label>Photo de la personne (Fichier ou URL)</Label>
              
              {testimonialForm.avatarUrl ? (
                <div className="flex items-center space-x-3 mb-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Avatar className="w-14 h-14 border-2 border-[rgb(53,125,122)]">
                    <AvatarImage src={testimonialForm.avatarUrl} alt="Aperçu" />
                    <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setTestimonialForm({ ...testimonialForm, avatarUrl: '' })}
                    className="text-xs"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    <span>Supprimer la photo</span>
                  </Button>
                </div>
              ) : (
                <label className="w-full py-2.5 px-4 mb-2 border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 rounded-xl text-xs font-bold text-[rgb(53,125,122)] flex items-center justify-center space-x-2 transition cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Téléverser la photo de l'auteur</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          if (evt.target?.result) {
                            setTestimonialForm({ ...testimonialForm, avatarUrl: evt.target.result as string });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}

              <Input 
                type="text" 
                placeholder="Ou coller l'URL d'une photo..." 
                value={testimonialForm.avatarUrl} 
                onChange={e => setTestimonialForm({ ...testimonialForm, avatarUrl: e.target.value })} 
                className="font-mono text-xs" 
              />
            </div>

            <div>
              <Label>Témoignage *</Label>
              <Textarea rows={4} required placeholder="Partagez le témoignage de foi..." value={testimonialForm.content} onChange={e => setTestimonialForm({ ...testimonialForm, content: e.target.value })} />
            </div>

            <Button type="submit" className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] font-bold">
              {editingTestimonialId ? 'Enregistrer les modifications' : 'Créer le Témoignage'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};
