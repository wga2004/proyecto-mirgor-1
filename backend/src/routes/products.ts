import express, { Request, Response } from 'express';
import { pool } from '../index';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET all products with BOM
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT p.*, 
              json_agg(json_build_object(
                'id', c.id, 
                'component_id', c.id, 
                'quantity', c.quantity, 
                'unit_cost', c.unit_cost
              )) as components
       FROM products p
       LEFT JOIN bom_components c ON p.id = c.product_id
       GROUP BY p.id
       ORDER BY p.created_at DESC`
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.*, 
              json_agg(json_build_object(
                'id', c.id, 
                'component_name', c.component_name, 
                'quantity', c.quantity, 
                'unit_cost', c.unit_cost
              )) as components
       FROM products p
       LEFT JOIN bom_components c ON p.id = c.product_id
       WHERE p.id = $1
       GROUP BY p.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE product
router.post('/', async (req: Request, res: Response) => {
  try {
    const { sku, name, description, target_cost, components } = req.body;
    const productId = uuidv4();

    const result = await pool.query(
      `INSERT INTO products (id, sku, name, description, target_cost, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) 
       RETURNING *`,
      [productId, sku, name, description, target_cost]
    );

    // Add components if provided
    if (components && components.length > 0) {
      for (const component of components) {
        await pool.query(
          `INSERT INTO bom_components (id, product_id, component_name, quantity, unit_cost, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [uuidv4(), productId, component.name, component.quantity, component.unit_cost]
        );
      }
    }

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { sku, name, description, target_cost } = req.body;

    const result = await pool.query(
      `UPDATE products 
       SET sku = $1, name = $2, description = $3, target_cost = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [sku, name, description, target_cost, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
