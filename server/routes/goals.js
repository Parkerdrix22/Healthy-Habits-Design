import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/goals?childID=1
router.get('/', async (req, res) => {
  const { childID } = req.query;
  if (!childID) {
    return res.status(400).json({ error: 'childID query parameter is required' });
  }
  try {
    const result = await pool.query(
      'SELECT * FROM goals WHERE childid = $1 ORDER BY goalid ASC',
      [childID]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/goals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/goals
router.post('/', async (req, res) => {
  const { userid, childid, category, targetvalue, goaltype, value, unit, start_date, end_date, frequency, isactive } = req.body;
  if (!userid || !childid || !category || !targetvalue || !goaltype || !unit || !start_date || !end_date || !frequency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO goals (userid, childid, category, targetvalue, goaltype, value, unit, start_date, end_date, frequency, isactive)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [userid, childid, category, targetvalue, goaltype, value ?? 0, unit, start_date, end_date, frequency, isactive ?? true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/goals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/goals/:goalID
router.put('/:goalID', async (req, res) => {
  const { goalID } = req.params;
  const { category, targetvalue, goaltype, value, unit, start_date, end_date, frequency, isactive } = req.body;
  try {
    const result = await pool.query(
      `UPDATE goals
       SET category = $1, targetvalue = $2, goaltype = $3, value = $4,
           unit = $5, start_date = $6, end_date = $7, frequency = $8, isactive = $9
       WHERE goalid = $10
       RETURNING *`,
      [category, targetvalue, goaltype, value, unit, start_date, end_date, frequency, isactive, goalID]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/goals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/goals/:goalID
router.delete('/:goalID', async (req, res) => {
  const { goalID } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM goals WHERE goalid = $1 RETURNING goalid',
      [goalID]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json({ deleted: goalID });
  } catch (err) {
    console.error('DELETE /api/goals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
