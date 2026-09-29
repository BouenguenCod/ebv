import React, { useState } from 'react';
import { Church, ShieldCheck, Heart, BookOpen, Globe, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ChurchHistory: React.FC = () => {
  const { settings } = useData();
  const [activeTab, setActiveTab] = useState<'vision' | 'equipe' | 'foi'>('vision');
  const [showFullFaith, setShowFullFaith] = useState(false);

  const statementOfFaith = [
    { title: "Les Saintes Écritures", content: "Nous croyons que la Bible est la Parole inspirée de Dieu, inerrante dans les manuscrits originaux, et qu'elle constitue la seule autorité suprême et finale en matière de foi et de vie." },
    { title: "Dieu la Trinité", content: "Nous croyons en un seul Dieu, Créateur de toutes choses, éternellement existant en trois personnes : le Père, le Fils et le Saint-Esprit." },
    { title: "Jésus-Christ notre Sauveur", content: "Nous croyons en la divinité du Seigneur Jésus-Christ, en sa naissance virginale, son existence sans péché, ses miracles, sa mort expiatoire à la croix, sa résurrection corporelle et son retour glorieux." },
    { title: "Le Salut par la Grâce", content: "Nous croyons que l'homme est sauvé gratuitement par la grâce de Dieu par le moyen de la foi seule en Jésus-Christ, indépendamment des œuvres." },
    { title: "L'Église locale & le Baptême", content: "Nous croyons que l'Église est le corps de Christ et qu'elle rassemble les croyants baptisés par immersion sur profession de leur foi personnelle." }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] inline-block mb-3">
            Notre Histoire & Identité
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(55,69,90)] tracking-tight">
            Une Église Ancrée depuis <span className="text-[rgb(53,125,122)]">1963</span> à Vitry-sur-Seine
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Depuis plus de 60 ans, l'Église Baptiste de Vitry proclamait fidèlement l'Évangile de Jésus-Christ et accompagne les croyants dans leur croissance spirituelle.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] flex items-center justify-center mb-6">
              <Church className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[rgb(55,69,90)] mb-3">Fondation & Héritage</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Créée en 1963, l'Église s'inscrit dans la tradition protestante baptiste, attachée à l'enseignement de la Bible, à la prière fervente et à l'amour fraternel.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[rgb(55,69,90)] mb-3">Communauté Multilingue</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Fidèle au visage cosmopolite de Vitry-sur-Seine, notre assemblée rassemble des fidèles d'origines diverses et notre ministère pastoral s'exprime en 5 langues.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[rgb(55,69,90)] mb-3">Formation Théologique</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous formons activement les serviteurs et responsables de demain grâce à notre cursus théologique ESI (Équiper Serviteurs Internationaux).
            </p>
          </div>

        </div>

        {/* Interactive Tabs Block (Vision, Équipe, Confession de foi) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          
          {/* Tab Headers */}
          <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto">
            <button
              onClick={() => setActiveTab('vision')}
              className={`flex-1 min-w-[140px] py-4 px-6 text-sm font-bold border-b-2 transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'vision'
                  ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Vision & Mission</span>
            </button>

            <button
              onClick={() => setActiveTab('equipe')}
              className={`flex-1 min-w-[140px] py-4 px-6 text-sm font-bold border-b-2 transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'equipe'
                  ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Équipe Pastorale</span>
            </button>

            <button
              onClick={() => setActiveTab('foi')}
              className={`flex-1 min-w-[140px] py-4 px-6 text-sm font-bold border-b-2 transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'foi'
                  ? 'border-[rgb(53,125,122)] text-[rgb(53,125,122)] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confession de Foi</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-8 lg:p-12">
            
            {activeTab === 'vision' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[rgb(55,69,90)]">
                    Honorer Dieu & Servir la Cité
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Notre vision s'articule autour de trois piliers fondamentaux :
                  </p>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                      <span><strong>Adoration & Disciple :</strong> Offrir à Dieu un culte vivant et former des croyants solides dans leur foi.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                      <span><strong>Fraternité & Soutien :</strong> Créer une famille spirituelle où chacun trouve écoute, amour et encouragement.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                      <span><strong>Témoignage & Mission :</strong> Être une lumière active dans la ville de Vitry-sur-Seine et soutenir les œuvres missionnaires.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80" 
                    alt="Vie d'église Vitry" 
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            )}

            {activeTab === 'equipe' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                      alt="Pasteur"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 text-center md:text-left">
                    <div>
                      <h4 className="text-xl font-bold text-[rgb(55,69,90)]">{settings.pastorName}</h4>
                      <span className="text-xs font-bold text-[rgb(53,125,122)] uppercase tracking-wider">Pasteur et Enseignant</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Passionné par l'enseignement expositoire de la Parole et la relation d'aide pastorale. Le pasteur et son équipe s'engagent à accompagner chaque génération vers la maturité en Christ.
                    </p>
                    <div className="pt-1">
                      <span className="text-xs font-bold text-slate-700 block mb-1">Langues parlées dans le ministère :</span>
                      <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                        {settings.pastorLanguages.map(lang => (
                          <span key={lang} className="px-2.5 py-0.5 bg-white border border-slate-300 text-slate-700 text-xs font-medium rounded-full shadow-2xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'foi' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-bold text-[rgb(55,69,90)]">
                  Ce Que Nous Croyons (Confession de Foi)
                </h3>
                <div className="space-y-4">
                  {statementOfFaith.slice(0, showFullFaith ? statementOfFaith.length : 3).map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-[rgb(53,125,122)] text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowFullFaith(!showFullFaith)}
                  className="mt-4 px-4 py-2 text-xs font-bold text-[rgb(53,125,122)] hover:text-[rgb(38,92,90)] flex items-center space-x-1"
                >
                  <span>{showFullFaith ? "Réduire la confession de foi" : "Voir tous les points de foi..."}</span>
                  {showFullFaith ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
