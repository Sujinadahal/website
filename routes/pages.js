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
    title: 'Sujina Dahal | Civic Technology, Research & Digital Inclusion',
    description: 'Sujina Dahal is a civic-technology entrepreneur, researcher and youth leader building practical, evidence-based solutions for public services in Nepal, including Prashasan Pro.',
    impact: readJSON('impact.json').slice(0, 4)
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About — Sujina Dahal',
    description: 'Learn about Sujina Dahal\u2019s background in civic technology, research and youth leadership, and the education and experience behind her work.'
  });
});

router.get('/work', (req, res) => {
  res.render('work', {
    title: 'Selected Work — Sujina Dahal',
    description: 'Case studies of Sujina Dahal\u2019s work in civic technology, digital literacy, SDG outreach and applied research, including Prashasan Pro.'
  });
});

router.get('/experience', (req, res) => {
  res.render('experience', {
    title: 'Experience & Impact — Sujina Dahal',
    description: 'A timeline of Sujina Dahal\u2019s professional experience across civic technology, research, digital literacy training and community programmes, with measurable impact.',
    impact: readJSON('impact.json')
  });
});

router.get('/leadership', (req, res) => {
  res.render('leadership', {
    title: 'Leadership & Recognition — Sujina Dahal',
    description: 'Leadership roles, fellowships, training and recognition earned by Sujina Dahal across Rotaract, youth councils and civic-technology initiatives.'
  });
});

router.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: 'Gallery & Testimonials — Sujina Dahal',
    description: 'Photos from Sujina Dahal\u2019s civic-technology, research and youth-leadership work, alongside testimonials from collaborators.',
    testimonials: readJSON('testimonials.json')
  });
});

router.get('/insights', (req, res) => {
  res.render('insights', {
    title: 'Insights — Sujina Dahal',
    description: 'Essays from Sujina Dahal on civic technology, digital inclusion, responsible AI and public-service access.',
    posts: readJSON('insights.json')
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact — Sujina Dahal',
    description: 'Get in touch with Sujina Dahal about civic-technology partnerships, research collaboration, digital-literacy programmes or speaking opportunities.'
  });
});

module.exports = router;
