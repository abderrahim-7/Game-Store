require('dotenv').config(); // charge les variables d'environnement du .env
const express = require('express');
const cors = require('cors');
const path = require('path');
// Importer le fichier db.js pour la connexion à la DB
const pool = require('./db');




// Importer les routeurs
const gamesRoutes = require('./routes/games');
const usersRoutes = require('./routes/users');

const app = express();



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Front-end')));

// Routes
app.use('/api/games', gamesRoutes);
app.use('/api/users', usersRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
