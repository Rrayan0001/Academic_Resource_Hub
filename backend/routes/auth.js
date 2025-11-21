import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { z } from 'zod';
import { sql } from '../db/client.js';
import { authenticateRequest, signToken } from '../middleware/auth.js';

const router = Router();

const roleEnum = z.enum(['visitor', 'student', 'teacher']);

const signupSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('A valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: roleEnum,
}).refine((data) => {
  // For student and teacher, email must end with @bmsit.in
  if (data.role === 'student' || data.role === 'teacher') {
    return data.email.toLowerCase().endsWith('@bmsit.in');
  }
  // For visitor, any email domain is allowed
  return true;
}, {
  message: 'Student and teacher accounts must use @bmsit.in email domain',
  path: ['email'],
});

const loginSchema = z.object({
  email: z.string().email('A valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

const sanitizeUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  createdAt: row.created_at,
});

router.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: parsed.error.errors?.[0]?.message || 'Invalid payload' });
  }

  const { name, email, password, role } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  // Additional validation: Check email domain for student/teacher
  if ((role === 'student' || role === 'teacher') && !normalizedEmail.endsWith('@bmsit.in')) {
    return res.status(400).json({ error: 'Student and teacher accounts must use @bmsit.in email domain' });
  }

  try {
    const existing = await sql`
      SELECT id FROM users WHERE email = ${normalizedEmail}
    `;

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    const [inserted] = await sql`
      INSERT INTO users (id, name, email, password_hash, role)
      VALUES (${id}, ${name}, ${normalizedEmail}, ${passwordHash}, ${role})
      RETURNING id, name, email, role, created_at
    `;

    const user = sanitizeUser(inserted);
    const token = signToken({ id: user.id, role: user.role });

    return res.status(201).json({ token, user });
  } catch (error) {
    console.error('[auth:signup] failed', error);
    return res.status(500).json({ 
      error: 'Unable to create account',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: parsed.error.errors?.[0]?.message || 'Invalid payload' });
  }

  const { email, password } = parsed.data;

  try {
    const [userRow] = await sql`
      SELECT id, name, email, role, password_hash, created_at
      FROM users
      WHERE email = ${email.toLowerCase()}
    `;

    if (!userRow) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, userRow.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = sanitizeUser(userRow);
    const token = signToken({ id: user.id, role: user.role });

    return res.json({ token, user });
  } catch (error) {
    console.error('[auth:login] failed', error);
    return res.status(500).json({ 
      error: 'Unable to login',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/me', authenticateRequest, async (req, res) => {
  try {
    const [userRow] = await sql`
      SELECT id, name, email, role, created_at
      FROM users
      WHERE id = ${req.auth.id}
    `;

    if (!userRow) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user: sanitizeUser(userRow) });
  } catch (error) {
    console.error('[auth:me] failed', error);
    return res.status(500).json({ error: 'Unable to fetch profile' });
  }
});

export default router;

