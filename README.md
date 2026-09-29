# Église Baptiste de Vitry (EBV) - Application Web Modern & Back-Office Admin

Ce projet est la nouvelle version moderne du site web de l'**Église Baptiste de Vitry-sur-Seine** (inspiré de la structure de *eglisebaptistevitry.fr*), couplée à un espace d'administration (Back-Office) sécurisé par authentification JWT.

---

## 🎨 Palette de Couleurs Officielle

* **Couleur Primaire (Teal Canard)** : `rgb(53, 125, 122)` / `#357D7A`
* **Couleur Secondaire (Bleu Ardoise Navy)** : `rgb(55, 69, 90)` / `#37455A`
* **Accents** : `#D97706` (Doré) & `#10B981` (Émeraude)

---

## 🚀 Fonctionnalités du Site Public

1. **Header & Navigation Responsive** : Logo de l'église, liens de section avec ancres fluides (`Accueil`, `À propos`, `Formation ESI`, `Sermons`, `Galerie`, `Événements`, `FAQ`, `Contact`, `Faire un don`), boutons d'accès rapides ("Planifiez votre visite", "Calendrier", "Faire un don").
2. **Page d'Accueil Hero** : Bannière dynamique avec badges d'information, horaires de culte et bouton d'action.
3. **Bloc Histoire & Identité (Fondée en 1963)** : Présentation de l'église, vision, équipe pastorale, langues parlées (Français, Anglais, Portugais, Espagnol, Italien) et Confession de Foi interactive.
4. **Formation Théologique ESI (Équiper Serviteurs Internationaux)** : Présentation du cursus complet de 3 ans avec les 9 modules détaillés.
5. **Lecteur de Sermons / Prédications** :
   - Support vidéo YouTube & audio HTML5 MP3.
   - Contrôles interactifs : choix du mode (Vidéo/Audio), sélecteur de vitesse de lecture (`0.75x`, `1x`, `1.25x`, `1.5x`, `2x`), copie de lien.
   - Filtre d'archives par catégorie et intervenant.
6. **Galerie Photos** : Grille avec filtre par catégories (`Culte`, `Événements`, `Jeunesse`, `Communauté`, `Formation ESI`) et visionneuse Lightbox en plein écran.
7. **Agenda & Événements** : Onglets "Événements À Venir" et "Événements Passés" avec modale de détails.
8. **Section FAQ & Plan d'Accès Transports** :
   - Horaires des cultes (Dimanches à 10h30).
   - **Guide d'accès transports** : RER C (Les Ardoines / Vitry-sur-Seine), Bus 180, 182, 132, 393, Tram T7.
   - **Accès voiture** depuis Paris, Choisy, Ivry, Créteil, Villejuif, Orly.
   - Programme de l'école du dimanche pour les enfants (3-5 ans, 6-8 ans, 9-12 ans).
9. **Contact & Espace Dons SumUp** : Formulaire de contact et modale avec lien direct SumUp & QR Code bancaire.
10. **Widget Chat WhatsApp Flottant** : Bouton persistant ("Open chat" / "Bonjour soyez bénis !").

---

## 🔐 Back-Office Administration (Tableau de Bord)

Accès réservé aux administrateurs sur `/login` ou via le lien "Espace Admin" du Header.

* **Identifiants de démonstration JWT** :
  * **Email** : `admin@eglisebaptistevitry.fr`
  * **Mot de passe** : `admin123`

### Gestion Dynamique sans toucher au code :
* **Gestion des Sermons** : Ajouter, modifier, supprimer un sermon (Titre, Intervenant, Date, Lien YouTube, Description, Miniature).
* **Gestion des Événements** : Ajouter, modifier, supprimer un événement (Titre, Date, Heure, Lieu, Description, Statut à venir / passé).
* **Gestion de la Galerie** : Uploader / ajouter des photos.
* **Gestion des Témoignages** : Publier ou modérer les témoignages.
* **Configuration Générale** : Mettre à jour les horaires, coordonnées, lien SumUp et QR Code.

---

## 🛠️ Installation & Lancement Local

### Préréquis
- Node.js (v18+) & npm

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement (Front-End React + Vite)
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

### 3. Lancer l'API Backend Express.js (Optionnel / Multi-tier)
```bash
node server/server.js
```
L'API Express démarrera sur `http://localhost:5000`.

---

## 📁 Architecture des Dossiers

```files structure
eglisevitry/
├── server/
│   └── server.js                 # API Backend Express.js & JWT Auth
├── src/
│   ├── components/
│   │   ├── layout/               # Navbar & Footer
│   │   └── public/               # Hero, History, ESI, Sermons, Gallery, FAQ, Contact, WhatsApp
│   ├── context/
│   │   ├── AuthContext.tsx       # Authentification JWT
│   │   └── DataContext.tsx       # Gestion d'état centralisée & persistance
│   ├── data/
│   │   └── initialData.ts        # Données de démonstration (Sermons, ESI, FAQ Transports)
│   ├── pages/
│   │   ├── PublicHomePage.tsx    # Page d'accueil publique complète
│   │   ├── LoginPage.tsx         # Connexion administrateur
│   │   └── AdminDashboardPage.tsx# Tableau de bord Back-Office
│   ├── types/
│   │   └── index.ts              # Modèles TypeScript
│   ├── index.css                 # Configuration des variables CSS & Tailwind
│   ├── App.tsx                   # Routeur & Providers
│   └── main.tsx
├── package.json
└── README.md
```
