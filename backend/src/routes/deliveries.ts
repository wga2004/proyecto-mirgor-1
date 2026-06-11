import express, { Request, Response } from 'express';
import { pool } from '../index';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET all deliveries
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM deliveries 
       ORDER BY scheduled_delivery_date DESC`
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET deliveries by status
router.get('/status/:status', async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const result = await pool.query(
      `SELECT * FROM deliveries 
       WHERE status = $1
       ORDER BY scheduled_delivery_date DESC`,
      [status]
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE delivery
router.post('/', async (req: Request, res: Response) => {
  try {
    const { purchase_order_id, product_id, quantity, scheduled_delivery_date, location } = req.body;
    const deliveryId = uuidv4();

    const result = await pool.query(
      `INSERT INTO deliveries (id, purchase_order_id, product_id, quantity, status, scheduled_delivery_date, location, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [deliveryId, purchase_order_id, product_id, quantity, 'pending', scheduled_delivery_date, location]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE delivery
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, actual_delivery_date, notes } = req.body;

    const result = await pool.query(
      `UPDATE deliveries 
       SET status = $1, actual_delivery_date = $2, notes = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status, actual_delivery_date, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
