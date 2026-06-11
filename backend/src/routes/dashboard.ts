import express, { Request, Response } from 'express';
import { pool } from '../index';

const router = express.Router();

// GET KPIs
router.get('/kpis', async (req: Request, res: Response) => {
  try {
    // Total cost vs target
    const costAnalysis = await pool.query(
      `SELECT 
        SUM(COALESCE(p.target_cost, 0)) as total_target_cost,
        SUM(COALESCE(poi.quantity * poi.unit_price, 0)) as total_actual_cost,
        COUNT(DISTINCT p.id) as total_products
       FROM products p
       LEFT JOIN purchase_order_items poi ON p.id = poi.product_id`
    );

    // Delivery status
    const deliveryStatus = await pool.query(
      `SELECT 
        status,
        COUNT(*) as count,
        ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
       FROM deliveries
       GROUP BY status`
    );

    // Purchase order status
    const poStatus = await pool.query(
      `SELECT 
        status,
        COUNT(*) as count,
        ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
       FROM purchase_orders
       GROUP BY status`
    );

    // On-time delivery rate
    const deliveryOnTime = await pool.query(
      `SELECT 
        ROUND(100.0 * SUM(CASE WHEN actual_delivery_date <= scheduled_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) as on_time_percentage
       FROM deliveries
       WHERE actual_delivery_date IS NOT NULL`
    );

    res.json({
      costAnalysis: costAnalysis.rows[0],
      deliveryStatus: deliveryStatus.rows,
      poStatus: poStatus.rows,
      deliveryOnTime: deliveryOnTime.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET cost variance analysis
router.get('/cost-variance', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT 
        p.id,
        p.sku,
        p.name,
        p.target_cost,
        COALESCE(SUM(poi.quantity * poi.unit_price) / NULLIF(SUM(poi.quantity), 0), 0) as actual_cost,
        p.target_cost - COALESCE(SUM(poi.quantity * poi.unit_price) / NULLIF(SUM(poi.quantity), 0), 0) as variance,
        ROUND(100.0 * (p.target_cost - COALESCE(SUM(poi.quantity * poi.unit_price) / NULLIF(SUM(poi.quantity), 0), 0)) / NULLIF(p.target_cost, 0), 2) as variance_percentage
       FROM products p
       LEFT JOIN purchase_order_items poi ON p.id = poi.product_id
       GROUP BY p.id
       ORDER BY variance DESC`
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET delivery timeline
router.get('/delivery-timeline', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT 
        DATE(scheduled_delivery_date) as delivery_date,
        COUNT(*) as total_deliveries,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'in_transit' THEN 1 ELSE 0 END) as in_transit,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
       FROM deliveries
       WHERE scheduled_delivery_date >= NOW() - INTERVAL '90 days'
       GROUP BY DATE(scheduled_delivery_date)
       ORDER BY delivery_date`
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET supplier performance
router.get('/supplier-performance', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT 
        s.id,
        s.name,
        COUNT(DISTINCT po.id) as total_orders,
        ROUND(100.0 * SUM(CASE WHEN d.actual_delivery_date <= d.scheduled_delivery_date THEN 1 ELSE 0 END) / NULLIF(COUNT(DISTINCT d.id), 0), 2) as on_time_percentage,
        ROUND(AVG(CAST(d.actual_delivery_date - d.scheduled_delivery_date AS NUMERIC)), 2) as avg_days_late
       FROM suppliers s
       LEFT JOIN purchase_orders po ON s.id = po.supplier_id
       LEFT JOIN deliveries d ON po.id = d.purchase_order_id
       GROUP BY s.id, s.name
       ORDER BY on_time_percentage DESC`
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
