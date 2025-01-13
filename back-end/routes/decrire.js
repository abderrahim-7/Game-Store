const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * Table "decrire" (id_jeu, id_genre), 
 * association entre Jeu et Genre.
 */

// GET /api/decrire : lister toutes les associations
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT d.id_jeu, j.nom AS nom_jeu,
             d.id_genre, g.nom AS nom_genre
      FROM decrire d
      JOIN jeu j ON d.id_jeu = j.id_jeu
      JOIN genre g ON d.id_genre = g.id_genre
      ORDER BY d.id_jeu, d.id_genre
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des liens Jeu-Genre.' });
  }
});

// POST /api/decrire : créer une association jeu-genre
router.post('/', async (req, res) => {
  const { id_jeu, id_genre } = req.body;
  try {
    // Vérifier qu’id_jeu et id_genre existent si besoin
    const query = `
      INSERT INTO decrire (id_jeu, id_genre)
      VALUES ($1, $2)
      RETURNING id_jeu, id_genre
    `;
    const values = [id_jeu, id_genre];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création du lien Jeu-Genre.' });
  }
});

// GET /api/decrire/:id_jeu/:id_genre : récupérer une association précise
router.get('/:id_jeu/:id_genre', async (req, res) => {
  const { id_jeu, id_genre } = req.params;
  try {
    const query = `
      SELECT * 
      FROM decrire
      WHERE id_jeu = $1
        AND id_genre = $2
    `;
    const result = await pool.query(query, [id_jeu, id_genre]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Association Jeu-Genre non trouvée.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de l’association.' });
  }
});

// DELETE /api/decrire/:id_jeu/:id_genre : supprimer l’association
router.delete('/:id_jeu/:id_genre', async (req, res) => {
  const { id_jeu, id_genre } = req.params;
  try {
    const query = `
      DELETE FROM decrire
      WHERE id_jeu = $1
        AND id_genre = $2
      RETURNING *
    `;
    const result = await pool.query(query, [id_jeu, id_genre]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Association non trouvée.' });
    }
    res.json({ message: 'Association Jeu-Genre supprimée.', supprime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’association.' });
  }
});

/* 
Optionnel : 
PUT /api/decrire/:id_jeu/:id_genre => pour modifier, 
mais en général, on supprime l’ancienne association 
et on en crée une nouvelle si on veut la "modifier".
*/

module.exports = router;
