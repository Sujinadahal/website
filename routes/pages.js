const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_DIR = path.join(__dirname, '..', 'data');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
}

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Sujina Dahal — Technology. People. Public Good.',
    impact: readJSON('impact.json').slice(0, 4)
  });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About — Sujina Dahal' });
});

router.get('/work', (req, res) => {
  res.render('work', { title: 'Selected Work — Sujina Dahal' });
});

router.get('/experience', (req, res) => {
  res.render('experience', {
    title: 'Experience & Impact — Sujina Dahal',
    impact: readJSON('impact.json')
  });
});

router.get('/leadership', (req, res) => {
  res.render('leadership', { title: 'Leadership & Recognition — Sujina Dahal' });
});

router.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: 'Gallery — Sujina Dahal',
    testimonials: readJSON('testimonials.json')
  });
});

router.get('/insights', (req, res) => {
  res.render('insights', {
    title: 'Insights — Sujina Dahal',
    posts: readJSON('insights.json')
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact — Sujina Dahal' });
});

module.exports = router;
