import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Church, ChevronRight, Clock, Heart, BookOpen, Calendar, Sparkles, Baby } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface GroupDetail {
  id: string;
  title: string;
  image: string;
  badge: string;
  shortDesc: string;
  verse?: { text: string; reference: string };
  schedule?: string[];
  fullDesc: string[];
  features?: string[];
  subGroups?: { title: string; desc: string; features?: string[] }[];
}

export const VieDeLeglisePage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<GroupDetail | null>(null);

  const groups: GroupDetail[] = [
    {
      id: 'evangelisation',
      title: 'Groupe Évangélisation',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/EVANGELISATION-300x251.png',
      badge: 'Action & Témoignage',
      shortDesc: 'Transmettre le message d’espoir et l’Évangile au travers d’actions collectives et d’échanges bienveillants.',
      verse: {
        text: 'Allez dans le monde entier proclamer la bonne nouvelle à toute la création.',
        reference: 'Marc 16:15'
      },
      schedule: [
        'Réunions : tous les 1er dimanches du mois à 13h30',
        'Distributions et échanges sur le marché de Vitry-sur-Seine : tous les samedis matins par petits groupes'
      ],
      fullDesc: [
        'Le groupe d’évangélisation a pour objectif de transmettre, via des actions collectives mais aussi individuelles, le message que Dieu a pour l’humanité. Cette mission concerne tous les chrétiens. C’est pourquoi le groupe est ouvert à tous les volontaires se rendant à l’église de Vitry-sur-Seine !',
        'Au-delà des réunions régulières, le groupe organise des distributions de Bibles et de flyers ouvertes à tous, habituellement les samedis.',
        '« Y a-t-il une vie après la mort ? » ; « Comment un Dieu bon peut-il accepter la souffrance ? » ; « Pourquoi les guerres viennent-elles souvent de conflits de religion ? » Le groupe a soif de répondre à ces questions légitimes et de partager l’espérance de l’Évangile.',
        '« Tous ont péché et sont privés de la gloire de Dieu. Mais dans sa bonté, Dieu les rend justes gratuitement par Jésus-Christ, qui les libère du péché. Dieu l’a offert en sacrifice. Alors par sa mort, le Christ obtient le pardon des péchés pour ceux qui croient en lui. » (Romains 3:23-25)'
      ]
    },
    {
      id: 'couples',
      title: 'Réunion de Couples',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/Copie-de-EVANGELISATIO-5-300x251.png',
      badge: 'Famille & Foyer',
      shortDesc: 'Partager des moments privilégiés entre époux pour construire un foyer solide basé sur la foi et l’amour.',
      verse: {
        text: 'La corde à trois fils ne se rompt pas facilement.',
        reference: 'Ecclésiaste 4:12'
      },
      fullDesc: [
        'Le couple est une institution établie par Dieu. Dieu unit l’homme et la femme afin qu’ils ne forment plus qu’un et qu’ensemble ils servent Dieu à travers leur foyer.',
        'En construisant notre relation conjugale avec Dieu comme base, nous sommes, telle la corde à trois fils, difficiles à rompre et à séparer.',
        'Nous passons des moments privilégiés entre couples pour échanger profondément, mais aussi avec humour, sur les défis que nous devons surmonter. Hommes et femmes, nous sommes différents, et quel soulagement de le voir et de l’accepter ! Voir cette différence comme une force et accepter l’autre renforce l’union.'
      ],
      features: [
        'Échange profond et bienveillant sur la vie conjugale',
        'Garde d’enfants assurée sur place à chaque rencontre',
        'Moments de convivialité et d’encouragement mutuel'
      ]
    },
    {
      id: 'femmes',
      title: 'Groupe des Femmes',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/Copie-de-EVANGELISATIO-8-300x251.png',
      badge: 'Communion Féminine',
      shortDesc: 'Découvrir et vivre son identité de femme de valeur à la lumière de la Parole de Dieu.',
      verse: {
        text: 'Alors Dieu créa les humains à son image, et ils sont vraiment à l’image de Dieu. Il les créa homme et femme.',
        reference: 'Genèse 1:27'
      },
      fullDesc: [
        'La femme est une création de Dieu d’une grande valeur, délicate mais forte. Elle prend légitimement sa part dans le plan que Dieu a pour l’avancement de son royaume.',
        'Jésus-Christ lui-même a chamboulé les codes de la société concernant la femme. Il l’a placée en égalité avec l’homme tout en redéfinissant et précisant le rôle de chacun, avec sagesse et justesse, à la lumière de la Parole de Dieu.',
        'Jésus a apporté un équilibre. Beaucoup de femmes le suivaient et ont été témoins de sa vie. Ce sont même des femmes qui ont trouvé sa tombe vide et qui ont annoncé en premier sa résurrection.',
        'C’est entre femmes que nous trouvons dans la Bible, à travers des études bibliques, les réponses concernant notre place et notre rôle. En partageant nos expériences, en priant et en louant ensemble, nous tendons à nous saisir du statut de la femme vertueuse.'
      ]
    },
    {
      id: 'jeunes-adultes',
      title: 'Jeunes Adultes (+25 ans)',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/Copie-de-EVANGELISATIO-7-300x251.png',
      badge: 'Jeunesse Active',
      shortDesc: 'Aborder des thématiques concrètes de la vie d’adulte et consolider sa relation avec Dieu.',
      fullDesc: [
        'C’est autour de thématiques qui nous concernent, de débats et d’études bibliques que nous cherchons à discerner ce que Dieu attend de nous.',
        '« L’impact des mots », « L’entretien de relations saines », « Les blessures de l’âme »... Des sujets d’actualité qui nous aident en tant que jeunes adultes à consolider ce que nous avons appris mais également à nous remettre en question pour poursuivre notre croissance spirituelle.',
        'Nos différentes expériences sont une richesse, et nous aident à voir qu’ensemble nous pouvons construire une relation plus solide avec Dieu.',
        'Nos rendez-vous sont aussi l’occasion de s’amuser au travers de jeux, de sorties et de repas pleins de rires... Des moments de plaisir qu’on vous invite à vivre avec nous !'
      ],
      features: [
        'Études bibliques et débats d’actualité',
        'Sorties conviviales, repas et jeux',
        'Réseau d’entraide et d’amitié spirituelle'
      ]
    },
    {
      id: 'jeunes-15-25',
      title: 'Groupe des jeunes (15 à 25 ans)',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/Copie-de-EVANGELISATIO-9-300x251.png',
      badge: 'Génération Émergente',
      shortDesc: 'Un espace de confiance et de partage pour aborder les grands choix de vie et grandir dans la foi.',
      schedule: [
        'Tous les 2èmes et 4èmes samedis du mois de 17h30 à 21h00'
      ],
      fullDesc: [
        'Entre l’enfance et l’âge adulte, le jeune vit des moments palpitants mais parfois difficiles. Il se retrouve pour la première fois confronté à ses propres choix : « Quel métier choisir ? Quelles études ? Vais-je y arriver ? Avec qui me marier ? »',
        'Lorsque ces questions restent sans réponse, cela peut susciter l’inquiétude, des frustrations ou une perte de confiance en soi. C’est au sein du groupe de jeunes que nous abordons ces questionnements en toute transparence et confiance.',
        'Notre foi étant basée sur Jésus-Christ, c’est au travers de la lecture de la Bible que nous échangeons autour des sujets d’actualités et tirons des enseignements qui nous boostent.',
        'Entre discussions, temps de louange, de partage, de jeux et de sorties, il n’y a rien qui arrête notre envie de se retrouver !'
      ]
    },
    {
      id: 'enfants',
      title: 'Garderie & École du Dimanche',
      image: 'https://eglisebaptistevitry.fr/wp-content/uploads/2024/08/Copie-de-EVANGELISATIO-3-300x251.png',
      badge: 'Enfance & Éducation',
      shortDesc: 'Un cadre bienveillant et sécurisé pour l’éveil spirituel et l’épanouissement des tout-petits et des enfants.',
      fullDesc: [
        'Un encadrement adapté à chaque tranche d’âge pour permettre aux enfants de découvrir l’amour de Dieu tout en s’amusant pendant les cultes.'
      ],
      subGroups: [
        {
          title: 'Garderie (0 - 3 ans)',
          desc: 'Une équipe dynamique, attentive et soigneuse est disponible pour veiller sur vos enfants durant le culte.',
          features: [
            'Lit bébé & table à langer',
            'Tapis de jeu & jouets adaptés',
            'Fauteuils confortables pour les parents',
            'Écran de retransmission en direct du culte'
          ]
        },
        {
          title: 'École du Dimanche (3 - 15 ans)',
          desc: 'L’école du dimanche s’inscrit dans la continuité de l’enseignement biblique familial. Une équipe de moniteurs passionnés use chaque dimanche d’imagination pour apporter de manière ludique la parole de Dieu aux enfants.',
          features: [
            'Histoires bibliques captivantes & activités ludiques',
            'Temps d’échange et d’apprentissage en groupes d’âge',
            'Développement de la socialisation et de l’amitié'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-32 pb-16 bg-[rgb(55,69,90)] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        {/* Glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[rgb(53,125,122)]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-300 font-semibold uppercase tracking-wider">
            <span>Accueil</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-teal-200">Vie de l'église</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            VIE DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">L'ÉGLISE</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez nos différents groupes de partage, d’apprentissage, de jeunesse et de soutien spirituel pour chaque étape de la vie.
          </p>
        </div>
      </div>

      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pt-12">

          {/* Intro highlight */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(55,69,90)] dark:text-white">
              Nos Groupes & Ministères
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              Que vous soyez jeune, en couple, parent ou cherchiez simplement à approfondir votre foi, il y a une place pour vous au sein de notre communauté.
            </p>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <Card 
                key={group.id} 
                className="overflow-hidden group hover:shadow-2xl transition duration-300 border border-slate-200 dark:border-slate-800 flex flex-col justify-between bg-white dark:bg-slate-900"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img 
                      src={group.image} 
                      alt={group.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="emerald" className="px-3 py-1 text-[11px] font-extrabold shadow">
                        {group.badge}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 text-left">
                    <h3 className="text-xl font-extrabold text-[rgb(55,69,90)] dark:text-white group-hover:text-[rgb(53,125,122)] transition-colors">
                      {group.title}
                    </h3>
                    
                    {group.verse && (
                      <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-100 dark:border-teal-900 text-xs italic text-teal-800 dark:text-teal-300 space-y-1">
                        <p>« {group.verse.text} »</p>
                        <p className="font-bold not-italic text-right text-[10px] text-teal-600 dark:text-teal-400">— {group.verse.reference}</p>
                      </div>
                    )}

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {group.shortDesc}
                    </p>

                    {group.schedule && (
                      <div className="flex items-start space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900">
                        <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{group.schedule[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button 
                    onClick={() => setSelectedGroup(group)}
                    className="w-full bg-[rgb(53,125,122)] hover:bg-[rgb(43,105,102)] text-white font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center space-x-2"
                  >
                    <span>En savoir plus</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Detail Dialog Modal */}
          <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
            {selectedGroup && (
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="relative aspect-[16/7] w-full overflow-hidden">
                  <img 
                    src={selectedGroup.image} 
                    alt={selectedGroup.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <Badge variant="emerald" className="mb-2">
                      {selectedGroup.badge}
                    </Badge>
                    <DialogTitle className="text-2xl md:text-3xl font-extrabold text-white">
                      {selectedGroup.title}
                    </DialogTitle>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {selectedGroup.verse && (
                    <div className="p-4 bg-teal-50 dark:bg-teal-950/50 rounded-2xl border border-teal-200 dark:border-teal-800 text-sm italic text-teal-900 dark:text-teal-200 space-y-2">
                      <p>« {selectedGroup.verse.text} »</p>
                      <p className="font-bold not-italic text-right text-xs text-teal-700 dark:text-teal-400">— {selectedGroup.verse.reference}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-[rgb(55,69,90)] dark:text-white flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[rgb(53,125,122)]" />
                      <span>Présentation du groupe</span>
                    </h4>
                    {selectedGroup.fullDesc.map((paragraph, idx) => (
                      <p key={idx} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Schedules if present */}
                  {selectedGroup.schedule && selectedGroup.schedule.length > 0 && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-2">
                      <h4 className="text-xs uppercase font-extrabold text-emerald-800 dark:text-emerald-300 tracking-wider flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Quand et comment nous rejoindre ?</span>
                      </h4>
                      <ul className="space-y-1 text-xs md:text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                        {selectedGroup.schedule.map((sch, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-emerald-500">•</span>
                            <span>{sch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* SubGroups for Garderie & École du dimanche */}
                  {selectedGroup.subGroups && (
                    <div className="space-y-4 pt-2">
                      {selectedGroup.subGroups.map((sub, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                          <div className="flex items-center space-x-2 text-[rgb(53,125,122)] dark:text-teal-300 font-extrabold text-base">
                            <Baby className="w-5 h-5" />
                            <h4>{sub.title}</h4>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{sub.desc}</p>
                          {sub.features && (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {sub.features.map((feat, fIdx) => (
                                <li key={fIdx} className="text-xs text-slate-700 dark:text-slate-200 flex items-center space-x-2 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features if present */}
                  {selectedGroup.features && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 tracking-wider">
                        Ce que vous y trouverez
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedGroup.features.map((feat, i) => (
                          <li key={i} className="text-xs text-slate-700 dark:text-slate-200 flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                            <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Button 
                      onClick={() => setSelectedGroup(null)}
                      className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 font-bold text-xs px-6 py-2.5 rounded-xl"
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>

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

