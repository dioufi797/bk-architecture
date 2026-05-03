# 🏛 BK-Architecture — Site Vitrine + Admin

> Plateforme web complète pour le cabinet d'architecture BK-Architecture.

## Stack Technique

| Couche | Technologie |
|--------|------------|
| Frontend | React 18 + Vite + Tailwind CSS + Framer Motion |
| Backend | Node.js + Express |
| Base de données | MongoDB |
| Auth | JWT |
| Images | Stockage local (dossier `uploads/`) |

---

## Installation rapide

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) installé et lancé (`mongod`)

### 1. Cloner / ouvrir le projet

```bash
cd /Users/user/Desktop/bk-archi
```

### 2. Installer les dépendances

```bash
# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 3. Configurer l'environnement

Le fichier `backend/.env` est déjà prêt avec les valeurs par défaut :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bk-architecture
JWT_SECRET=bk_architecture_super_secret_key_2024_change_in_prod
ADMIN_EMAIL=admin@bk-architecture.com
ADMIN_PASSWORD=Admin@2024!
```

> ⚠️ **En production**, changez `JWT_SECRET` par une clé longue et aléatoire.

### 4. Initialiser la base de données (données de démonstration)

```bash
cd backend && npm run seed
```

Cela crée :
- 1 compte admin : `admin@bk-architecture.com` / `Admin@2024!`
- 6 projets de démonstration

### 5. Lancer le projet

**Terminal 1 — Backend :**
```bash
cd backend && npm run dev
# API disponible sur http://localhost:5000
```

**Terminal 2 — Frontend :**
```bash
cd frontend && npm run dev
# Site disponible sur http://localhost:5173
```

---

## Accès

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Site public |
| `http://localhost:5173/admin/login` | Interface admin |
| `http://localhost:5000/api/health` | Santé de l'API |

**Identifiants admin par défaut :**
- Email : `admin@bk-architecture.com`
- Mot de passe : `Admin@2024!`

---

## Structure du projet

```
bk-archi/
├── backend/
│   ├── src/
│   │   ├── config/        # Connexion MongoDB
│   │   ├── controllers/   # Logique métier
│   │   ├── middleware/    # Auth JWT, Upload
│   │   ├── models/        # Project, User (Mongoose)
│   │   └── routes/        # Routes Express
│   ├── uploads/           # Images uploadées
│   ├── scripts/
│   │   └── seedAdmin.js   # Script d'initialisation
│   ├── server.js
│   └── .env
│
└── frontend/
    └── src/
        ├── components/    # Navbar, Footer, ProjectCard...
        ├── context/       # Auth, Theme (dark mode)
        ├── pages/
        │   ├── Home.jsx
        │   ├── About.jsx
        │   ├── Services.jsx
        │   ├── Projects.jsx
        │   ├── ProjectDetail.jsx
        │   ├── Contact.jsx
        │   └── admin/     # Login, Dashboard, ProjectsList, ProjectForm
        └── utils/api.js   # Instance Axios
```

---

## API Endpoints

### Auth
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/login` | Connexion admin |
| GET | `/api/auth/me` | Profil admin (JWT requis) |

### Projets
| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/projects` | ❌ | Liste (+ filtres: `?category=residential&featured=true&page=1&limit=9`) |
| GET | `/api/projects/:id` | ❌ | Détail d'un projet |
| POST | `/api/projects` | ✅ | Créer (multipart/form-data) |
| PUT | `/api/projects/:id` | ✅ | Modifier |
| DELETE | `/api/projects/:id` | ✅ | Supprimer |
| GET | `/api/projects/stats` | ✅ | Statistiques |

### Contact
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/contact` | Envoyer un message |

---

## Fonctionnalités

### Site Public
- ✅ Page d'accueil avec hero, services, projets récents, CTA
- ✅ Page À Propos avec équipe et valeurs
- ✅ Page Services détaillée avec processus
- ✅ Portfolio avec filtrage par catégorie et pagination
- ✅ Page détail projet avec galerie lightbox
- ✅ Formulaire de contact avec WhatsApp
- ✅ Dark mode toggle
- ✅ Animations Framer Motion
- ✅ Responsive mobile complet

### Admin
- ✅ Authentification JWT sécurisée
- ✅ Dashboard avec statistiques
- ✅ Liste projets avec recherche et filtres
- ✅ Formulaire ajout/modification projet
- ✅ Upload d'images multiples
- ✅ Marquage "en vedette"
- ✅ Suppression avec confirmation

---

## Personnalisation

### Changer les coordonnées
- **Footer** : `frontend/src/components/Footer.jsx`
- **Contact** : `frontend/src/pages/Contact.jsx`
- **WhatsApp** : remplacer `212600000000` par votre numéro

### Changer les couleurs
- `frontend/tailwind.config.js` — modifier les couleurs `gold`

### Email de contact
- `backend/.env` — configurer `EMAIL_*`
- `backend/src/controllers/contactController.js`

---

## Production

```bash
# Build frontend
cd frontend && npm run build

# Le dossier dist/ contient le site statique
# Servir via Nginx ou déployer sur Vercel/Netlify

# Backend : déployer sur Railway, Render, ou VPS
# MongoDB : utiliser MongoDB Atlas
```
