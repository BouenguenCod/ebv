import React, { useState } from 'react';
import { Mail, Phone, MapPin, Heart, ExternalLink, Send, CheckCircle2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ContactDonationProps {
  showDonateModalInitial?: boolean;
}

export const ContactDonation: React.FC<ContactDonationProps> = ({ showDonateModalInitial = false }) => {
  const { settings } = useData();
  const [showDonateModal, setShowDonateModal] = useState<boolean>(showDonateModalInitial);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Visite',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'Visite', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Donation Spotlight Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgb(53,125,122)] to-[rgb(55,69,90)] text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-rose-200">
              Soutenez l'œuvre de l'Église
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Faire un Don en Ligne (SumUp & QR Code)
            </h2>
            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              Vos dons permettent d'assurer le fonctionnement des cultes, l'école du dimanche, les actions sociales à Vitry et le soutien aux ministères missionnaires.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => setShowDonateModal(true)}
              className="px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <Heart className="w-5 h-5 fill-current text-slate-950" />
              <span>Soutenir par Carte / QR Code</span>
            </button>

            <a
              href={settings.donationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Lien Direct SumUp</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] mb-3 inline-block">
                Contact & Localisation
              </span>
              <h2 className="text-3xl font-extrabold text-[rgb(55,69,90)] tracking-tight">
                Écrivez-nous ou Rendez-nous Visite
              </h2>
              <p className="mt-3 text-slate-600 text-sm">
                Que vous ayez des questions sur la foi, sur la formation ESI ou souhaitiez demander la prière, nous sommes à votre écoute.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm text-[rgb(55,69,90)] font-bold">Adresse de l'Église :</strong>
                  <span className="text-sm text-slate-600 leading-relaxed block mt-0.5">{settings.address}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[rgb(55,69,90)]/10 text-[rgb(55,69,90)] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm text-[rgb(55,69,90)] font-bold">Téléphone :</strong>
                  <span className="text-sm text-slate-600 block mt-0.5">{settings.phone}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm text-[rgb(55,69,90)] font-bold">Email :</strong>
                  <span className="text-sm text-slate-600 block mt-0.5">{settings.email}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form Side (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[rgb(55,69,90)]">Message envoyé avec succès !</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Merci d'avoir pris contact avec l'Église Baptiste de Vitry. Notre équipe pastorale vous répondra dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-[rgb(55,69,90)] mb-2">Envoyez-nous un message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Votre Nom & Prénom *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Marie Dupont"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(53,125,122)] focus:ring-2 focus:ring-[rgb(53,125,122)]/20 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Adresse Email *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: marie@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(53,125,122)] focus:ring-2 focus:ring-[rgb(53,125,122)]/20 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone (Optionnel)</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ex: 06 12 34 56 78"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(53,125,122)] focus:ring-2 focus:ring-[rgb(53,125,122)]/20 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sujet de votre demande</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(53,125,122)] focus:ring-2 focus:ring-[rgb(53,125,122)]/20 outline-none text-sm bg-white"
                      >
                        <option value="Visite">Planifier une première visite</option>
                        <option value="Prière">Demande de prière ou soutien</option>
                        <option value="ESI">Formation Théologique ESI</option>
                        <option value="Autre">Autre renseignement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Votre Message *</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Bonjour, je souhaiterais venir ce dimanche..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[rgb(53,125,122)] focus:ring-2 focus:ring-[rgb(53,125,122)]/20 outline-none text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer mon message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Donation SumUp / QR Code Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 text-center space-y-6 relative">
            
            <button 
              onClick={() => setShowDonateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[rgb(55,69,90)]">Soutenir l'Église Baptiste</h3>
              <p className="text-xs text-slate-500 mt-1">Don sécurisé par SumUp / QR Code bancaire</p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block">
              <img 
                src={settings.sumupQrCodeUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"} 
                alt="QR Code Don SumUp" 
                className="w-48 h-48 object-cover rounded-xl mx-auto shadow-inner"
              />
              <span className="text-[10px] text-slate-500 block mt-2 font-semibold">Scannez avec votre téléphone pour faire un don</span>
            </div>

            <div className="space-y-2">
              <a
                href={settings.donationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md transition"
              >
                <span>Accéder à la plateforme de paiement SumUp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setShowDonateModal(false)}
                className="w-full py-2.5 text-slate-500 hover:text-slate-700 text-xs font-semibold"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
