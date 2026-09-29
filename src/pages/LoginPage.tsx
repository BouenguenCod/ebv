import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@eglisebaptistevitry.fr');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate('/admin');
    } else {
      setError("Identifiants incorrects. Veuillez utiliser admin@eglisebaptistevitry.fr / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgb(53,125,122)]/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-950/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative z-10 space-y-6">
        
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au site public</span>
          </Link>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            JWT Auth Protected
          </span>
        </div>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[rgb(53,125,122)] flex items-center justify-center text-white mx-auto shadow-lg">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Administration EBV</h1>
          <p className="text-xs text-slate-400">Connectez-vous pour gérer les contenus du site web</p>
        </div>

        {/* Credentials hint badge */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <div>
            <strong>Identifiants de démonstration :</strong>
            <p className="mt-0.5 text-[11px] font-mono">Email: admin@eglisebaptistevitry.fr</p>
            <p className="text-[11px] font-mono">Mot de passe: admin123</p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Identifiant Administrateur</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[rgb(53,125,122)] focus:ring-1 focus:ring-[rgb(53,125,122)] text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[rgb(53,125,122)] focus:ring-1 focus:ring-[rgb(53,125,122)] text-sm text-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[rgb(53,125,122)] hover:bg-[rgb(38,92,90)] text-white font-bold rounded-xl text-sm shadow-lg transition flex items-center justify-center space-x-2"
          >
            <span>{loading ? "Vérification..." : "Se connecter au Back-Office"}</span>
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Église Baptiste de Vitry-sur-Seine
        </div>

      </div>
    </div>
  );
};
