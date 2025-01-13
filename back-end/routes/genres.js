const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/genres : Récupérer tous les genres
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM genre ORDER BY id_genre');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des genres.' });
  }
});

// POST /api/genres : Créer un nouveau genre
router.post('/', async (req, res) => {
  const { nom } = req.body; // Ajuste selon ta structure (ex. "RPG", "Action")
  try {
    const query = `
      INSERT INTO genre (nom)
      VALUES ($1)
      RETURNING *
    `;
    const values = [nom];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création du genre.' });
  }
});

// GET /api/genres/:id : Récupérer un genre
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM genre WHERE id_genre = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Genre non trouvé.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération du genre.' });
  }
});

// PUT /api/genres/:id : Mettre à jour un genre
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;

  try {
    const query = `
      UPDATE genre
      SET nom = $1
      WHERE id_genre = $2
      RETURNING *
    `;
    const values = [nom, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Genre non trouvé ou aucune modification.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du genre.' });
  }
});

// DELETE /api/genres/:id : Supprimer un genre
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM genre WHERE id_genre = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Genre non trouvé.' });
    }
    res.json({ message: 'Genre supprimé.', genreSupprime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression du genre.' });
  }
});

module.exports = router;
