import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Church, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ContactUsPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSent(false), 5000);
  };

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
            <span className="text-teal-200">Nous Contacter</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            NOUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">CONTACTER</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Une question, une demande de prière ou besoin d'informations ? Écrivez-nous ou retrouvez nos coordonnées directes ci-dessous.
          </p>
        </div>
      </div>

      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pt-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <Card className="p-8 space-y-6 shadow-xl border border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <Badge variant="emerald" className="px-3 py-1 text-xs uppercase font-extrabold">Site Du Culte</Badge>
                  <h2 className="text-2xl font-extrabold text-[rgb(55,69,90)] dark:text-white">Envoyez-nous un message</h2>
                </div>

                {formSent && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center space-x-3 text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Nom *</Label>
                    <Input 
                      type="text" 
                      required 
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Email *</Label>
                    <Input 
                      type="email" 
                      required 
                      placeholder="votre.email@exemple.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Message *</Label>
                    <Textarea 
                      rows={5} 
                      required 
                      placeholder="Écrivez votre message ici..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] font-bold py-3">
                    <Send className="w-4 h-4 mr-2" />
                    <span>Envoyer</span>
                  </Button>
                </form>
              </Card>
            </div>

            {/* Direct Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <Card className="p-6 space-y-6 shadow-md border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  Notre Adresse
                </h3>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[rgb(53,125,122)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">Adresse du culte :</strong>
                      <span>119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine, France</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[rgb(53,125,122)] shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">Téléphone :</strong>
                      <a href="tel:0663963285" className="hover:underline text-[rgb(53,125,122)] dark:text-teal-300 font-mono">06 63 96 32 85</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[rgb(53,125,122)] shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">Email :</strong>
                      <a href="mailto:ebvcommunication@gmail.com" className="hover:underline text-[rgb(53,125,122)] dark:text-teal-300 font-mono">ebvcommunication@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">Horaire des cultes :</strong>
                      <span>Chaque Dimanche à 10h30</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map location placeholder card */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 aspect-video relative">
                <img 
                  src="https://eglisebaptistevitry.fr/wp-content/uploads/2024/07/2149285695.jpg" 
                  alt="Vitry-sur-Seine map" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center p-6 text-center text-white">
                  <div>
                    <MapPin className="w-8 h-8 text-rose-500 mx-auto mb-2 animate-bounce" />
                    <span className="font-bold text-sm block">119 Rue Louise Aglaé Crette</span>
                    <span className="text-xs text-slate-300">94400 Vitry-sur-Seine</span>
                  </div>
                </div>
              </div>

            </div>

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
