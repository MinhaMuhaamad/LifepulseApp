const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Response = require('../models/Response');

// @route  POST /api/survey/submit
// @desc   Save or upsert user's survey answers
// @access Private
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Answers object is required' });
    }

    // Upsert — update if exists, create if not
    const response = await Response.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        answers,
        submittedAt: Date.now()
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Survey submitted successfully', response });
  } catch (err) {
    console.error('Survey submit error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route  GET /api/survey/me
// @desc   Retrieve logged-in user's saved answers
// @access Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const response = await Response.findOne({ user: req.user._id });
    if (!response) {
      return res.status(404).json({ message: 'No survey response found' });
    }
    res.json({ response });
  } catch (err) {
    console.error('Survey fetch error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
