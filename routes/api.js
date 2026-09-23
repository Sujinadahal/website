const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const DATA_DIR = path.join(__dirname, '..', 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');
const INSIGHTS_FILE = path.join(DATA_DIR, 'impact.json');
const POSTS_FILE = path.join(DATA_DIR, 'insights.json');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// GET /api/testimonials
router.get('/testimonials', (req, res) => {
  res.json(readJSON(TESTIMONIALS_FILE));
});

// GET /api/impact
router.get('/impact', (req, res) => {
  res.json(readJSON(INSIGHTS_FILE));
});

// GET /api/insights
router.get('/insights', (req, res) => {
  res.json(readJSON(POSTS_FILE));
});

// POST /api/contact
// Body: { name, email, organization, topic, message }
router.post('/contact', (req, res) => {
  const { name, email, organization, topic, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
  }

  const messages = readJSON(MESSAGES_FILE);
  const entry = {
    id: Date.now(),
    name,
    email,
    organization: organization || '',
    topic: topic || '',
    message,
    receivedAt: new Date().toISOString()
  };
  messages.push(entry);
  writeJSON(MESSAGES_FILE, messages);

  // NOTE: This stores the message locally in data/messages.json.
  // To actually deliver email, wire up a provider (e.g. nodemailer + SMTP,
  // or a transactional email API) here before deploying to production.

  res.json({ ok: true, message: 'Thank you — your message has been received.' });
});

module.exports = router;
