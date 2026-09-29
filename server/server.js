import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'ebv_secret_key_vitry_2026';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// SQLite Database Setup
const dbPath = path.join(__dirname, 'database.sqlite');
let db;

const initDb = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log(`[SQLite] Base de données locale SQLite connectée : ${dbPath}`);

  // Create Tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS sermons (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      speaker TEXT NOT NULL,
      date TEXT NOT NULL,
      videoUrl TEXT,
      videoType TEXT,
      audioUrl TEXT,
      audioType TEXT,
      mediaFormat TEXT,
      description TEXT,
      thumbnail TEXT,
      category TEXT,
      duration TEXT
    );

    CREATE TABLE IF NOT EXISTS sermon_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      location TEXT,
      description TEXT,
      status TEXT,
      category TEXT,
      programType TEXT,
      imageUrl TEXT
    );

    CREATE TABLE IF NOT EXISTS event_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT,
      imageUrl TEXT NOT NULL,
      date TEXT,
      caption TEXT
    );

    CREATE TABLE IF NOT EXISTS gallery_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      author TEXT NOT NULL,
      role TEXT,
      content TEXT NOT NULL,
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS esi_modules (
      id INTEGER PRIMARY KEY,
      year INTEGER,
      title TEXT,
      description TEXT,
      duration TEXT
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      churchName TEXT,
      foundationYear INTEGER,
      address TEXT,
      phone TEXT,
      email TEXT,
      serviceHours TEXT,
      pastorName TEXT,
      pastorLanguages TEXT,
      donationLink TEXT,
      sumupQrCodeUrl TEXT,
      facebookUrl TEXT,
      youtubeUrl TEXT,
      instagramUrl TEXT,
      whatsappNumber TEXT
    );
  `);

  // Seed Initial Data if empty
  const sermonCountRow = await db.get('SELECT COUNT(*) as count FROM sermons');
  if (sermonCountRow.count === 0) {
    const initialSermons = [
      {
        id: "sermon-1",
        title: "La Fidélité de Dieu à Travers les Générations",
        speaker: "Pasteur Principal",
        date: "2026-09-20",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoType: "youtube",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        audioType: "url",
        mediaFormat: "both",
        description: "Un message poignant sur la constance des promesses divines depuis 1963 jusqu'à nos jours pour notre communauté de Vitry-sur-Seine.",
        thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
        category: "Foi & Persévérance",
        duration: "45 min"
      },
      {
        id: "sermon-2",
        title: "Construire sa Maison sur le Roc Solidement",
        speaker: "Pasteur Invité",
        date: "2026-09-13",
        videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        videoType: "youtube",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        audioType: "url",
        mediaFormat: "both",
        description: "Comment ancrer sa vie chrétienne, son foyer et son service dans la vérité incontournable des Évangiles.",
        thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
        category: "Vie Chrétienne",
        duration: "52 min"
      },
      {
        id: "sermon-3",
        title: "L'Amour Fraternel et le Témoignage dans la Cité",
        speaker: "Pasteur Principal",
        date: "2026-09-06",
        videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
        videoType: "youtube",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        audioType: "url",
        mediaFormat: "both",
        description: "Découvrir la puissance de l'unité et de la solidarité chrétienne au cœur de notre ville de Vitry.",
        thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
        category: "Évangélisation",
        duration: "38 min"
      }
    ];

    for (const s of initialSermons) {
      await db.run(
        `INSERT INTO sermons (id, title, speaker, date, videoUrl, videoType, audioUrl, audioType, mediaFormat, description, thumbnail, category, duration)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [s.id, s.title, s.speaker, s.date, s.videoUrl, s.videoType, s.audioUrl, s.audioType, s.mediaFormat, s.description, s.thumbnail, s.category, s.duration]
      );
    }
    console.log('[SQLite] Sermons initiaux insérés.');
  }

  const sermonCatRow = await db.get('SELECT COUNT(*) as count FROM sermon_categories');
  if (sermonCatRow.count === 0) {
    const defaultCats = ['Foi & Vie', 'Vie Chrétienne', 'Évangélisation', 'Foi & Persévérance', 'Enseignement', 'Famille & Foyer', 'Prière & Spiritualité', 'Culte Spécial'];
    for (const c of defaultCats) {
      await db.run('INSERT INTO sermon_categories (name) VALUES (?)', [c]);
    }
    console.log('[SQLite] Catégories de sermons insérées.');
  }

  const eventCountRow = await db.get('SELECT COUNT(*) as count FROM events');
  if (eventCountRow.count === 0) {
    const initialEvents = [
      {
        id: "evt-jo-2024",
        title: "Campagne d’Évangélisation Spéciale (Jeux Olympiques)",
        date: "2024-09-12",
        time: "du 3 au 12 Septembre 2024",
        location: "Vitry-sur-Seine & Île-de-France",
        description: "Pendant les Jeux Olympiques et Paralympiques, l'évangélisation à Paris a été une occasion exceptionnelle de partager l'espérance du Christ.",
        status: "past",
        category: "Évangélisation",
        programType: "ponctuel",
        imageUrl: "https://eglisebaptistevitry.fr/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-17.58.31-3.jpeg"
      },
      {
        id: "evt-femmes-soins-2024",
        title: "Rencontre Féminine, Témoignages & Moment Bien-Être",
        date: "2024-09-11",
        time: "14h00 - 18h00",
        location: "Église Baptiste de Vitry-sur-Seine",
        description: "Instant de témoignages, de prière et d'enseignements entre les sœurs.",
        status: "past",
        category: "Communion Féminine",
        programType: "ponctuel",
        imageUrl: "https://eglisebaptistevitry.fr/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-17.58.34-1.jpeg"
      },
      {
        id: "evt-travaux-2024",
        title: "Mobilisation pour les Travaux & Rénovation de l'Église",
        date: "2024-09-08",
        time: "09h00 - 17h00",
        location: "119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine",
        description: "Moment de solidarité et d'entraide fraternelle.",
        status: "past",
        category: "Service & Entraide",
        programType: "ponctuel",
        imageUrl: "https://eglisebaptistevitry.fr/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-17.58.32-3.jpeg"
      },
      {
        id: "evt-culte-regulier",
        title: "Culte Dominical & École du Dimanche",
        date: "2026-10-04",
        time: "Tous les Dimanches de 10h30 à 12h30",
        location: "119 Rue Louise Aglaé Crette, 94400 Vitry-sur-Seine",
        description: "Grand moment de louange, d'adoration et de prédication.",
        status: "upcoming",
        category: "Services",
        programType: "regulier",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
      }
    ];

    for (const e of initialEvents) {
      await db.run(
        `INSERT INTO events (id, title, date, time, location, description, status, category, programType, imageUrl)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [e.id, e.title, e.date, e.time, e.location, e.description, e.status, e.category, e.programType, e.imageUrl]
      );
    }
  }

  const eventCatRow = await db.get('SELECT COUNT(*) as count FROM event_categories');
  if (eventCatRow.count === 0) {
    const defaultEvtCats = ['Évangélisation', 'Services', 'Prayers', 'Communion Féminine', 'Service & Entraide', 'Jeunesse', 'Formation ESI', 'Culte Spécial'];
    for (const c of defaultEvtCats) {
      await db.run('INSERT INTO event_categories (name) VALUES (?)', [c]);
    }
  }

  const galRow = await db.get('SELECT COUNT(*) as count FROM gallery');
  if (galRow.count === 0) {
    const initialGallery = [
      { id: "gal-1", title: "Culte dominical de célébration", category: "Culte", imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80", date: "Septembre 2026", caption: "Moment de louange vibrant réunissant les familles." },
      { id: "gal-2", title: "Classe d'École du Dimanche pour enfants", category: "Communauté", imageUrl: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80", date: "Septembre 2026", caption: "Apprentissage ludique des récits bibliques par tranches d'âge." }
    ];

    for (const g of initialGallery) {
      await db.run(
        `INSERT INTO gallery (id, title, category, imageUrl, date, caption) VALUES (?, ?, ?, ?, ?, ?)`,
        [g.id, g.title, g.category, g.imageUrl, g.date, g.caption]
      );
    }
  }

  const settingsRow = await db.get('SELECT COUNT(*) as count FROM settings');
  if (settingsRow.count === 0) {
    await db.run(
      `INSERT INTO settings (id, churchName, foundationYear, address, phone, email, serviceHours, pastorName, pastorLanguages, donationLink, sumupQrCodeUrl, facebookUrl, youtubeUrl, instagramUrl, whatsappNumber)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "Église Baptiste de Vitry",
        1963,
        "138 Avenue Anatole France, 94400 Vitry-sur-Seine",
        "+33 1 46 80 12 34",
        "contact@eglisebaptistevitry.fr",
        "Chaque dimanche à 10h30 (Culte principal & École du Dimanche)",
        "Pasteur Principal",
        JSON.stringify(["Français", "Anglais", "Portugais", "Espagnol", "Italien"]),
        "https://pay.sumup.io/b/eglise-baptiste-vitry",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
        "https://facebook.com",
        "https://youtube.com",
        "https://instagram.com",
        "+33612345678"
      ]
    );
  }
};

await initDb();

// AUTH ROUTE
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@eglisebaptistevitry.fr' && password === 'admin123') {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user: { name: 'Administrateur EBV', email, role: 'admin' } });
  }
  return res.status(401).json({ message: 'Identifiants incorrects' });
});

// SERMONS API
app.get('/api/sermons', async (req, res) => {
  const rows = await db.all('SELECT * FROM sermons ORDER BY date DESC');
  res.json(rows);
});

app.post('/api/sermons', async (req, res) => {
  const s = req.body;
  const id = s.id || `sermon-${Date.now()}`;
  await db.run(
    `INSERT INTO sermons (id, title, speaker, date, videoUrl, videoType, audioUrl, audioType, mediaFormat, description, thumbnail, category, duration)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, s.title, s.speaker, s.date, s.videoUrl || null, s.videoType || null, s.audioUrl || null, s.audioType || null, s.mediaFormat || 'video', s.description || '', s.thumbnail || '', s.category || '', s.duration || '']
  );
  const created = await db.get('SELECT * FROM sermons WHERE id = ?', [id]);
  res.status(201).json(created);
});

app.put('/api/sermons/:id', async (req, res) => {
  const s = req.body;
  const id = req.params.id;
  await db.run(
    `UPDATE sermons 
     SET title = ?, speaker = ?, date = ?, videoUrl = ?, videoType = ?, audioUrl = ?, audioType = ?, mediaFormat = ?, description = ?, thumbnail = ?, category = ?, duration = ?
     WHERE id = ?`,
    [s.title, s.speaker, s.date, s.videoUrl || null, s.videoType || null, s.audioUrl || null, s.audioType || null, s.mediaFormat || 'video', s.description || '', s.thumbnail || '', s.category || '', s.duration || '', id]
  );
  const updated = await db.get('SELECT * FROM sermons WHERE id = ?', [id]);
  res.json(updated);
});

app.delete('/api/sermons/:id', async (req, res) => {
  await db.run('DELETE FROM sermons WHERE id = ?', [req.params.id]);
  res.json({ message: 'Sermon supprimé avec succès' });
});

// SERMON CATEGORIES API
app.get('/api/sermons/categories', async (req, res) => {
  const rows = await db.all('SELECT name FROM sermon_categories ORDER BY name ASC');
  res.json(rows.map(r => r.name));
});

app.post('/api/sermons/categories', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nom requis' });
  try {
    await db.run('INSERT INTO sermon_categories (name) VALUES (?)', [name.trim()]);
    res.status(201).json({ name: name.trim() });
  } catch (err) {
    res.status(400).json({ message: 'Catégorie existe déjà' });
  }
});

app.delete('/api/sermons/categories/:name', async (req, res) => {
  await db.run('DELETE FROM sermon_categories WHERE name = ?', [req.params.name]);
  res.json({ message: 'Catégorie supprimée' });
});

// EVENTS API
app.get('/api/events', async (req, res) => {
  const rows = await db.all('SELECT * FROM events ORDER BY date DESC');
  res.json(rows);
});

app.post('/api/events', async (req, res) => {
  const e = req.body;
  const id = e.id || `evt-${Date.now()}`;
  await db.run(
    `INSERT INTO events (id, title, date, time, location, description, status, category, programType, imageUrl)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, e.title, e.date, e.time || '', e.location || '', e.description || '', e.status || 'upcoming', e.category || '', e.programType || 'ponctuel', e.imageUrl || '']
  );
  const created = await db.get('SELECT * FROM events WHERE id = ?', [id]);
  res.status(201).json(created);
});

app.put('/api/events/:id', async (req, res) => {
  const e = req.body;
  const id = req.params.id;
  await db.run(
    `UPDATE events
     SET title = ?, date = ?, time = ?, location = ?, description = ?, status = ?, category = ?, programType = ?, imageUrl = ?
     WHERE id = ?`,
    [e.title, e.date, e.time || '', e.location || '', e.description || '', e.status || 'upcoming', e.category || '', e.programType || 'ponctuel', e.imageUrl || '', id]
  );
  const updated = await db.get('SELECT * FROM events WHERE id = ?', [id]);
  res.json(updated);
});

app.delete('/api/events/:id', async (req, res) => {
  await db.run('DELETE FROM events WHERE id = ?', [req.params.id]);
  res.json({ message: 'Événement supprimé' });
});

// EVENT CATEGORIES API
app.get('/api/events/categories', async (req, res) => {
  const rows = await db.all('SELECT name FROM event_categories ORDER BY name ASC');
  res.json(rows.map(r => r.name));
});

app.post('/api/events/categories', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nom requis' });
  try {
    await db.run('INSERT INTO event_categories (name) VALUES (?)', [name.trim()]);
    res.status(201).json({ name: name.trim() });
  } catch (err) {
    res.status(400).json({ message: 'Catégorie existe déjà' });
  }
});

app.delete('/api/events/categories/:name', async (req, res) => {
  await db.run('DELETE FROM event_categories WHERE name = ?', [req.params.name]);
  res.json({ message: 'Catégorie supprimée' });
});

// GALLERY API
app.get('/api/gallery', async (req, res) => {
  const rows = await db.all('SELECT * FROM gallery ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/gallery', async (req, res) => {
  const g = req.body;
  const id = g.id || `gal-${Date.now()}`;
  await db.run(
    `INSERT INTO gallery (id, title, category, imageUrl, date, caption) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, g.title, g.category || '', g.imageUrl, g.date || '', g.caption || '']
  );
  const created = await db.get('SELECT * FROM gallery WHERE id = ?', [id]);
  res.status(201).json(created);
});

app.put('/api/gallery/:id', async (req, res) => {
  const g = req.body;
  const id = req.params.id;
  await db.run(
    `UPDATE gallery SET title = ?, category = ?, imageUrl = ?, date = ?, caption = ? WHERE id = ?`,
    [g.title, g.category || '', g.imageUrl, g.date || '', g.caption || '', id]
  );
  const updated = await db.get('SELECT * FROM gallery WHERE id = ?', [id]);
  res.json(updated);
});

app.delete('/api/gallery/:id', async (req, res) => {
  await db.run('DELETE FROM gallery WHERE id = ?', [req.params.id]);
  res.json({ message: 'Photo supprimée' });
});

// GALLERY CATEGORIES API
app.get('/api/gallery/categories', async (req, res) => {
  const rows = await db.all('SELECT name FROM gallery_categories ORDER BY name ASC');
  res.json(rows.map(r => r.name));
});

app.post('/api/gallery/categories', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nom requis' });
  try {
    await db.run('INSERT INTO gallery_categories (name) VALUES (?)', [name.trim()]);
    res.status(201).json({ name: name.trim() });
  } catch (err) {
    res.status(400).json({ message: 'Catégorie existe déjà' });
  }
});

app.delete('/api/gallery/categories/:name', async (req, res) => {
  await db.run('DELETE FROM gallery_categories WHERE name = ?', [req.params.name]);
  res.json({ message: 'Catégorie supprimée' });
});

// TESTIMONIALS API
app.get('/api/testimonials', async (req, res) => {
  const rows = await db.all('SELECT * FROM testimonials ORDER BY date DESC');
  res.json(rows);
});

app.post('/api/testimonials', async (req, res) => {
  const t = req.body;
  const id = t.id || `test-${Date.now()}`;
  await db.run(
    `INSERT INTO testimonials (id, author, role, content, date) VALUES (?, ?, ?, ?, ?)`,
    [id, t.author, t.role || '', t.content, t.date || new Date().toISOString().split('T')[0]]
  );
  const created = await db.get('SELECT * FROM testimonials WHERE id = ?', [id]);
  res.status(201).json(created);
});

app.put('/api/testimonials/:id', async (req, res) => {
  const t = req.body;
  const id = req.params.id;
  await db.run(
    `UPDATE testimonials SET author = ?, role = ?, content = ?, date = ? WHERE id = ?`,
    [t.author, t.role || '', t.content, t.date || '', id]
  );
  const updated = await db.get('SELECT * FROM testimonials WHERE id = ?', [id]);
  res.json(updated);
});

app.delete('/api/testimonials/:id', async (req, res) => {
  await db.run('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
  res.json({ message: 'Témoignage supprimé' });
});

// ESI MODULES API
app.get('/api/esi-modules', async (req, res) => {
  const rows = await db.all('SELECT * FROM esi_modules ORDER BY id ASC');
  res.json(rows);
});

// SETTINGS API
app.get('/api/settings', async (req, res) => {
  const row = await db.get('SELECT * FROM settings WHERE id = 1');
  if (row) {
    row.pastorLanguages = JSON.parse(row.pastorLanguages || '[]');
  }
  res.json(row);
});

app.put('/api/settings', async (req, res) => {
  const s = req.body;
  await db.run(
    `UPDATE settings
     SET churchName = ?, foundationYear = ?, address = ?, phone = ?, email = ?, serviceHours = ?, pastorName = ?, pastorLanguages = ?, donationLink = ?, sumupQrCodeUrl = ?, facebookUrl = ?, youtubeUrl = ?, instagramUrl = ?, whatsappNumber = ?
     WHERE id = 1`,
    [
      s.churchName,
      s.foundationYear,
      s.address,
      s.phone,
      s.email,
      s.serviceHours,
      s.pastorName,
      JSON.stringify(s.pastorLanguages || []),
      s.donationLink,
      s.sumupQrCodeUrl,
      s.facebookUrl,
      s.youtubeUrl,
      s.instagramUrl,
      s.whatsappNumber
    ]
  );
  const updated = await db.get('SELECT * FROM settings WHERE id = 1');
  if (updated) {
    updated.pastorLanguages = JSON.parse(updated.pastorLanguages || '[]');
  }
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`[Express] Serveur API SQLite Église Baptiste Vitry démarré sur http://localhost:${PORT}`);
});
