import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Church, BookOpen, Heart, Users, Cross, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-32 pb-16 bg-[rgb(55,69,90)] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        {/* Glow circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(53,125,122)]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-300 font-semibold uppercase tracking-wider">
            <span>Accueil</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-teal-200">À propos de nous</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            A PROPOS DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">NOUS</span>
          </h1>

          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Fondée en 1963 à Vitry-sur-Seine. Découvrez notre histoire, nos valeurs de foi évangélique baptiste et notre engagement communautaire.
          </p>
        </div>
      </div>

      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pt-12">

          {/* SECTION 1: NOTRE HISTOIRE */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[rgb(53,125,122)]/10 text-[rgb(53,125,122)] dark:bg-teal-950 dark:text-teal-300 font-bold text-xs uppercase tracking-wider border border-[rgb(53,125,122)]/20">
                <Church className="w-4 h-4" />
                <span>Depuis 1963</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(55,69,90)] dark:text-white leading-tight">
                Notre Histoire
              </h2>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white font-semibold">Pasteur Georges Bonneau et son épouse Jean Margaret Bonneau</strong>, originaires de l’Île de Jersey en Angleterre, ont fondé l’Église de Vitry-sur-Seine, où ils ont exercé leur ministère de 1963 à 1983. Le 1er octobre 1983, ils ont pris leur retraite et se sont installés à Bordeaux, puis dans la région du Poitou. Pasteur Georges Bonneau est décédé le samedi 23 octobre 2021 et son épouse est décédée en 2023.
                </p>

                <p>
                  Entre la Seconde Guerre mondiale et 1963, il existait une église à la même adresse, l’Église des Frères, qui a transmis le bâtiment à l’Église Baptiste.
                </p>

                <p>
                  L’actuel bâtiment de l’église a été construit en 1974.
                </p>

                <p className="p-4 bg-teal-50/60 dark:bg-slate-900 border-l-4 border-[rgb(53,125,122)] rounded-r-2xl font-medium text-slate-700 dark:text-slate-200">
                  Depuis notre fondation en 1963, l’Église Baptiste de Vitry a été un pilier de la communauté, offrant un lieu de rassemblement, de prière et de croissance spirituelle. Découvrez ci-dessous quelques images de notre parcours à travers les années, illustrant notre histoire et notre évolution.
                </p>
              </div>
            </div>

            {/* Historical Images Grid */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group">
                <img 
                  src="https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-02-at-01.26.44-1024x850.jpeg" 
                  alt="Pasteur Georges Bonneau et son épouse Jean Margaret Bonneau - Fondateurs" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">Fondateurs de l'Église (1963)</span>
                    <span className="font-bold text-lg">Pasteur Georges Bonneau & Jean Margaret Bonneau</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm dark:border-slate-800">
                  <img 
                    src="https://eglisebaptistevitry.fr/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-31-at-05.31.51_aa6336f7.jpg" 
                    alt="Église Baptiste de Vitry-sur-Seine" 
                    className="w-full h-36 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm dark:border-slate-800 bg-[rgb(55,69,90)] p-4 text-white flex flex-col justify-center">
                  <span className="text-2xl font-extrabold text-teal-300">1974</span>
                  <span className="text-xs font-semibold text-slate-300">Construction du bâtiment actuel à Vitry</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: CONFESSION DE FOI - 5 PILLIERS */}
          <section className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="emerald" className="px-3 py-1 text-xs uppercase font-extrabold">Nos Piliers de Foi</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(55,69,90)] dark:text-white">
                En tant qu’église évangélique baptiste, nous croyons en…
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Les cinq fondements bibliques qui guident notre foi, nos enseignements et notre vie communautaire au quotidien.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Pillar 1 */}
              <Card className="p-6 md:p-8 hover:shadow-xl transition border-l-8 border-l-[rgb(53,125,122)]">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[rgb(53,125,122)] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">
                    1
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white">
                      Un Dieu Unique
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Nous croyons en un Dieu unique, éternel, infini, immuable, tout-puissant, omniprésent, omniscient, parfaitement sage, saint, juste et bon ; complet en trois personnes :
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-slate-800/60 border border-teal-100 dark:border-slate-700">
                        <strong className="text-sm font-bold text-[rgb(53,125,122)] dark:text-teal-300 block mb-1">
                          Dieu le Père
                        </strong>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Le créateur, qui garde un regard bienveillant sur nous, nous encourage. Le père juste, qui nous corrige, nous redresse et nous enseigne.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-slate-800/60 border border-teal-100 dark:border-slate-700">
                        <strong className="text-sm font-bold text-[rgb(53,125,122)] dark:text-teal-300 block mb-1">
                          Dieu le Fils
                        </strong>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Présent sur terre par la venue de Jésus-Christ pour accomplir le plan de sauvetage de l’humanité.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-slate-800/60 border border-teal-100 dark:border-slate-700">
                        <strong className="text-sm font-bold text-[rgb(53,125,122)] dark:text-teal-300 block mb-1">
                          Dieu le Saint-Esprit
                        </strong>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Envoyé comme consolateur, qui vit en nous, nous conduit et nous fortifie au quotidien. Comme une boussole intérieure, il nous conseille et nous permet d’appliquer la volonté de Dieu pour nos vies.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-block font-bold text-xs text-[rgb(53,125,122)] dark:text-teal-300 bg-teal-100/60 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                        ✨ Un Dieu qui ne change pas et qui est le même hier, aujourd’hui et éternellement !
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pillar 2 */}
              <Card className="p-6 md:p-8 hover:shadow-xl transition border-l-8 border-l-[rgb(55,69,90)]">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[rgb(55,69,90)] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">
                    2
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-amber-500" />
                      <span>La Bible, écriture inspirée par le Saint-Esprit</span>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Nous croyons que la Bible est la parole que Dieu nous adresse directement. Elle a été rédigée par des serviteurs de Dieu, à différentes époques, dans différents lieux, et est inspirée par le Saint-Esprit. Sa cohérence parfaite dans des contextes de rédaction si différents montre bien la place qu’a eu l’Esprit dans sa conception. La Bible est notre guide, nous permettant d’apprendre à connaître Dieu et à agir selon sa volonté au quotidien. Un réconfort, un appui, un outil de valeur pour notre marche !
                    </p>
                  </div>
                </div>
              </Card>

              {/* Pillar 3 */}
              <Card className="p-6 md:p-8 hover:shadow-xl transition border-l-8 border-l-amber-500">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">
                    3
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white flex items-center space-x-2">
                      <Cross className="w-5 h-5 text-amber-500" />
                      <span>Un pardon par Jésus-Christ</span>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Nous croyons en l’amour parfait du Dieu créateur qui nous a créés libres de nos choix. L’Homme a choisi la mort par sa désobéissance, mais Dieu, étant juste, a conçu un plan de rédemption. Il a envoyé son fils unique, Jésus-Christ, sur terre avec la mission de vivre saintement, d’être un exemple et de porter le péché de l’humanité à notre place. Grâce à Jésus-Christ, nous sommes pardonnés et recevons la vie éternelle.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Pillar 4 */}
              <Card className="p-6 md:p-8 hover:shadow-xl transition border-l-8 border-l-indigo-600">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">
                    4
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                      <span>Un baptême comme acte d’engagement</span>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Nous croyons en l’importance du baptême, signe d’obéissance à Dieu. Le baptême, immersion dans l’eau, symbolise le passage de la vie passée à la nouvelle vie reçue par Jésus-Christ. Ce n’est pas le baptême qui sauve, mais notre foi en Jésus-Christ. Le baptême est un témoignage de notre prise de position devant tous, démontrant notre dévouement et notre consécration.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Pillar 5 */}
              <Card className="p-6 md:p-8 hover:shadow-xl transition border-l-8 border-l-emerald-600">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">
                    5
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-bold text-[rgb(55,69,90)] dark:text-white flex items-center space-x-2">
                      <Users className="w-5 h-5 text-emerald-500" />
                      <span>L’importance de l’Église</span>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Nous croyons que l’Église est créée par Dieu et qu’elle a une place importante à ses yeux. L’Église avec un grand « E » représente toutes les personnes ayant reçu Jésus-Christ comme Seigneur et Sauveur dans le monde entier, formant une grande famille unie par la même foi. L’église locale, dans notre cas, notre église de Vitry-sur-Seine, est le lieu où nous nous réunissons et où chacun de ses membres vit et partage sa foi. Avec nos différents talents, nous rendons l’église complète avec pour tête et guide Jésus-Christ.
                    </p>
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* SECTION 3: NOTRE VISION */}
          <section className="bg-gradient-to-br from-[rgb(55,69,90)] to-[rgb(38,48,63)] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-teal-300 border border-white/20 inline-block">
                Notre Ambition Spirituelle
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Basés sur cette foi, nous avons pour vision de :
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">Maintenir notre foi en éveil</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Par la communion avec Dieu, dans l’intimité, mais aussi entre frères et sœurs au travers de nos cultes et rencontres.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">Maintenir notre union</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  En priant les uns pour les autres, et en agissant dans l’amour comme Jésus-Christ l’a fait.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">Maintenir nos actions</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fruits de notre foi et du Saint-Esprit agissant en nous, en participant à l’œuvre de Dieu, localement par la présence de notre église à Vitry-sur-Seine, et par des actions sociales et missionnaires internationales.
                </p>
              </div>
            </div>

            {/* QUOTE CALLOUT */}
            <div className="pt-6 border-t border-white/15 text-center max-w-4xl mx-auto">
              <blockquote className="text-lg md:text-xl font-bold italic text-teal-200 leading-relaxed">
                « Nous sommes disciples de Jésus-Christ et souhaitons suivre ses pas, faire des nations ses disciples, apporter le message de paix, d’amour et de pardon pour l’humanité… Non par nos propres forces, mais par son Esprit ! »
              </blockquote>
            </div>
          </section>

          {/* SECTION 4: À PROPOS DE NOTRE ÉGLISE */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[rgb(53,125,122)] text-white flex items-center justify-center mx-auto shadow-lg">
              <Church className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-[rgb(55,69,90)] dark:text-white">
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
