import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WhatsAppWidget: React.FC = () => {
  const { settings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("Bonjour, soyez bénis ! Je souhaite avoir des informations sur l'église.");

  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(chatMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Interactive Chat Popup Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn text-slate-800">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[rgb(53,125,122)] to-[rgb(55,69,90)] p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md relative">
                <MessageCircle className="w-6 h-6 fill-current" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white absolute bottom-0 right-0 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Église Baptiste Vitry</h4>
                <span className="text-[10px] text-teal-200">En ligne sur WhatsApp</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-200 hover:text-white font-bold p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="p-3 bg-white rounded-2xl shadow-xs border border-slate-100 max-w-[85%] self-start space-y-1">
              <span className="font-bold text-[rgb(53,125,122)] block">Accueil Pastorale EBV :</span>
              <p className="text-slate-700 leading-relaxed">
                Bonjour et soyez abondamment bénis ! 🙏 Comment pouvons-nous vous aider aujourd'hui ?
              </p>
              <span className="text-[9px] text-slate-400 block text-right">À l'instant</span>
            </div>
          </div>

          {/* Action Input Area */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[rgb(53,125,122)]"
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition"
              aria-label="Envoyer sur WhatsApp"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>

        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl flex items-center space-x-2 transition-all transform hover:scale-105 group border-2 border-white"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white animate-bounce" />
        <span className="text-xs font-bold hidden sm:inline">Open chat</span>
      </button>

    </div>
  );
};
