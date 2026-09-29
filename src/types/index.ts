export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  videoUrl?: string;
  videoType?: 'youtube' | 'upload';
  audioUrl?: string;
  audioType?: 'url' | 'upload';
  mediaFormat?: 'video' | 'audio' | 'both';
  description: string;
  thumbnail: string;
  category: string;
  duration?: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'past';
  programType?: 'ponctuel' | 'regulier';
  category: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  caption?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  date: string;
  avatarUrl?: string;
}

export interface ESIModule {
  id: number;
  year: number;
  title: string;
  description: string;
  duration: string;
}

export interface ChurchSettings {
  churchName: string;
  foundationYear: number;
  address: string;
  phone: string;
  email: string;
  serviceHours: string;
  pastorName: string;
  pastorLanguages: string[];
  donationLink: string;
  sumupQrCodeUrl?: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  token?: string;
}

// Dummy export to guarantee non-empty module at runtime for Vite ESM bundler
export const TYPES_VERSION = '1.0.0';
