const express = require('express');
const router = express.Router();
const pool = require('../db'); // connexion DB

// 1) GET /api/users : Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utilisateur ORDER BY id_utilisateur');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// 2) POST /api/users : Créer un nouvel utilisateur
router.post('/', async (req, res) => {
  const { nom, mot_de_passe, date_naissance, pays } = req.body; 
  try {
    // par exemple
    const query = `
      INSERT INTO utilisateur (nom, mot_de_passe, date_naissance, pays)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [nom, mot_de_passe, date_naissance, pays];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
  }
});

// 3) GET /api/users/:id : Récupérer un utilisateur par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM utilisateur WHERE id_utilisateur = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur.' });
  }
});

// 4) PUT /api/users/:id : Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, mot_de_passe, date_naissance, pays } = req.body;

  try {
    const query = `
      UPDATE utilisateur
      SET nom = $1,
          mot_de_passe = $2,
          date_naissance = $3,
          pays = $4
      WHERE id_utilisateur = $5
      RETURNING *
    `;
    const values = [nom, mot_de_passe, date_naissance, pays, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé ou aucune modification.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur.' });
  }
});

// 5) DELETE /api/users/:id : Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM utilisateur WHERE id_utilisateur = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès.', userSupprime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur.' });
  }
});

module.exports = router;

