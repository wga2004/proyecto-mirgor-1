import express, { Request, Response } from 'express';
import { pool } from '../index';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET all purchase orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT po.*, 
              json_agg(json_build_object(
                'id', poi.id,
                'product_id', poi.product_id,
                'quantity', poi.quantity,
                'unit_price', poi.unit_price
              )) as items
       FROM purchase_orders po
       LEFT JOIN purchase_order_items poi ON po.id = poi.purchase_order_id
       GROUP BY po.id
       ORDER BY po.created_at DESC`
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE purchase order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { supplier_id, expected_delivery_date, items, notes } = req.body;
    const poId = uuidv4();

    const result = await pool.query(
      `INSERT INTO purchase_orders (id, supplier_id, status, expected_delivery_date, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [poId, supplier_id, 'pending', expected_delivery_date, notes]
    );

    // Add items
    if (items && items.length > 0) {
      for (const item of items) {
        await pool.query(
          `INSERT INTO purchase_order_items (id, purchase_order_id, product_id, quantity, unit_price, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [uuidv4(), poId, item.product_id, item.quantity, item.unit_price]
        );
      }
    }

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE purchase order status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE purchase_orders 
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
