const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const User = require('../models/User');
const validate = require('../middleware/validate');

// @route  POST /api/auth/register
// @desc   Register a new user
// @access Public
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name too long'),
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists — return generic error to avoid email enumeration
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'Registration failed. Please check your details.' });
      }

      const user = await User.create({ name, email, password });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } catch (err) {
      console.error('Register error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route  POST /api/auth/login
// @desc   Authenticate user & get token
// @access Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      // Generic message — do not reveal whether email exists
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route  GET /api/auth/me
// @desc   Get logged-in user info
// @access Private
const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, async (req, res) => {
  res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email } });
});

module.exports = router;
