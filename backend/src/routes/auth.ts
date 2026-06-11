import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { pool } from '../index';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Register
router.post('/register', async (req: Request<{}, {}, { email: string; password: string; name: string }>, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);
    const userId = uuidv4();

    const result = await pool.query(
      'INSERT INTO users (id, email, password, name, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email, name',
      [userId, email, hashedPassword, name]
    );

    const token = jwt.sign(
      { userId: result.rows[0].id, email: result.rows[0].email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({ user: result.rows[0], token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      user: { id: user.id, email: user.email, name: user.name }, 
      token 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
