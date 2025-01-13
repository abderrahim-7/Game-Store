const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/editeurs : Récupérer tous les éditeurs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM editeur ORDER BY id_editeur');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des éditeurs.' });
  }
});

// POST /api/editeurs : Créer un nouvel éditeur
router.post('/', async (req, res) => {
  const { nom, pays } = req.body; // Ajuste selon ta structure
  try {
    const query = `
      INSERT INTO editeur (nom, pays)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [nom, pays];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création de l’éditeur.' });
  }
});

// GET /api/editeurs/:id : Récupérer un éditeur par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM editeur WHERE id_editeur = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Éditeur non trouvé.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de l’éditeur.' });
  }
});

// PUT /api/editeurs/:id : Mettre à jour un éditeur
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, pays } = req.body;
  try {
    const query = `
      UPDATE editeur
      SET nom = $1,
          pays = $2
      WHERE id_editeur = $3
      RETURNING *
    `;
    const values = [nom, pays, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Éditeur non trouvé ou aucune modification.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’éditeur.' });
  }
});

// DELETE /api/editeurs/:id : Supprimer un éditeur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM editeur WHERE id_editeur = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Éditeur non trouvé.' });
    }
    res.json({ message: 'Éditeur supprimé.', editeurSupprime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’éditeur.' });
  }
});

module.exports = router;
