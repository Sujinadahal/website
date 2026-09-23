const express = require('express');
const path = require('path');

const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing for form / JSON submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static assets (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));

// Site data shared across every rendered page (nav, footer, brand)
app.use((req, res, next) => {
  res.locals.site = {
    name: 'Sujina Dahal',
    tagline: 'Technology. People. Public Good.',
    year: new Date().getFullYear(),
    nav: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/work', label: 'Work' },
      { href: '/experience', label: 'Experience' },
      { href: '/leadership', label: 'Leadership' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/insights', label: 'Insights' },
      { href: '/contact', label: 'Contact' }
    ],
    currentPath: req.path
  };
  next();
});

// Page routes (server-rendered EJS views)
app.use('/', pagesRouter);

// JSON API routes (contact form, testimonials, insights)
app.use('/api', apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Sujina Dahal portfolio running at http://localhost:${PORT}`);
});
