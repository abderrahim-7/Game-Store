const express = require('express');
const router = express.Router();
const pool = require('../db'); // <-- connexion PostgreSQL ou MySQL selon ton "db.js"

router.get('/new', async (req, res) => {
    try {
        const query = `
        SELECT *
        FROM jeu
        WHERE date_de_publication >= CURRENT_DATE - INTERVAL '30 DAYS'
        ORDER BY date_de_publication DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des jeux nouveaux.' });
    }    
});

router.get('/recommended', async (req, res) => {
    try {
        const query = `SELECT * FROM jeu WHERE is_recommended = true`;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des jeux recommende.' });
  }
});
  
router.get('/sales', async (req, res) => {
    try {
        const query = `SELECT * FROM jeu WHERE on_sale = true`;
        const result = await pool.query(query);
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des jeux on sale.' });
      }
});

// 1) GET /api/games : Récupérer tous les jeux
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jeu ORDER BY id_jeu');
    res.json(result.rows); // En PostgreSQL, "rows" contient les enregistrements
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des jeux.' });
  }
});

// 2) POST /api/games : Créer un nouveau jeu
router.post('/', async (req, res) => {
  const { nom,prix, date_de_publication, description,image,min_requirement,max_requirement,id_editeur } = req.body; 
  const imagePath = image;
  try {
    const query = `
      INSERT INTO jeu (nom, prix, date_de_publication, description,image,min_requirement,max_requirement,id_editeur)
      VALUES ($1, $2, $3, $4, $5,$6,$7,$8)
      RETURNING *
    `;
    const values = [nom, prix, date_de_publication, description ,imagePath,min_requirement,max_requirement,id_editeur];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création du jeu.' });
  }
});

// 3) GET /api/games/:id : Récupérer un jeu par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // id_jeu
  try {
    const query = 'SELECT * FROM jeu WHERE id_jeu = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération du jeu.' });
  }
});

// 4) PUT /api/games/:id : Mettre à jour un jeu
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, prix, date_publication, image, description } = req.body;

  try {
    const query = `
      UPDATE jeu
      SET nom = $1,
          prix = $2,
          date_de_publication = $3,
          image = $4,
          description = $5
      WHERE id_jeu = $6
      RETURNING *
    `;
    const values = [nom, prix, date_publication, image, description, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé ou aucune modification.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du jeu.' });
  }
});

// 5) DELETE /api/games/:id : Supprimer un jeu
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM jeu WHERE id_jeu = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé.' });
    }
    res.json({ message: 'Jeu supprimé avec succès.', jeuSupprime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression du jeu.' });
  }
});




  


module.exports = router;

