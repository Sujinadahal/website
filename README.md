# Sujina Dahal — Portfolio (Full Stack, Multi-Page)

A multi-page portfolio website with a Node.js/Express backend and server-rendered
EJS frontend. Built from the "Technology. People. Public Good." content brief.

CV/résumé section has been intentionally left out of this build — add it in a
future update (a `/cv` route + `views/cv.ejs` + a PDF in `public/files/` is the
natural place for it).

## Stack

- **Backend:** Node.js + Express
- **Views:** EJS (server-rendered, shared header/nav/footer partials)
- **Data:** flat JSON files in `data/` (no database setup required)
- **Frontend assets:** plain CSS + vanilla JS in `public/`

## Project structure

```
sujina-dahal-portfolio/
├── server.js              # Express app entry point
├── package.json
├── routes/
│   ├── pages.js            # Renders each page (/, /about, /work, ...)
│   └── api.js               # /api/contact, /api/testimonials, /api/insights, /api/impact
├── views/
│   ├── partials/            # head.ejs, nav.ejs, footer.ejs (shared across all pages)
│   ├── index.ejs             # Home
│   ├── about.ejs              # About + What I Do
│   ├── work.ejs                # Featured Work
│   ├── experience.ejs           # Journey timeline + Impact numbers
│   ├── leadership.ejs            # Leadership & Community + Recognition & Credentials
│   ├── gallery.ejs                # Photo gallery + live testimonials widget
│   ├── insights.ejs                # Blog/insights list
│   ├── contact.ejs                  # Contact form (wired to the backend)
│   └── 404.ejs
├── public/
│   ├── css/style.css
│   ├── js/main.js            # nav toggle, contact form submit, testimonials fetch
│   └── images/                # all portfolio photos
└── data/
    ├── impact.json            # impact numbers, used on Home + Experience
    ├── testimonials.json       # edit this to add real testimonials
    ├── insights.json            # blog post titles/status
    └── messages.json             # contact form submissions land here
```

## Running it locally

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

For auto-restart on file changes during development:

```bash
npm run dev
```

## How the pieces fit together

- **Pages** are rendered server-side from `routes/pages.js`, which reads the
  relevant JSON file(s) from `data/` and passes them into the matching
  `views/*.ejs` template. Editing content usually means editing a JSON file —
  not the HTML.
- **The contact form** (`/contact`) posts to `POST /api/contact` via
  `fetch()` in `public/js/main.js`. The backend validates the fields and
  appends the submission to `data/messages.json`. To actually deliver email,
  add a provider (e.g. `nodemailer` with SMTP credentials, or a transactional
  email API) inside `routes/api.js` where the `// NOTE` comment is.
- **Testimonials** on the Gallery page are fetched client-side from
  `GET /api/testimonials`, so updating `data/testimonials.json` updates the
  live site without touching any template.
- **Navigation and footer** are shared partials (`views/partials/nav.ejs`,
  `footer.ejs`) driven by `res.locals.site` set in `server.js` — add a page to
  the `nav` array there and it appears in every page's menu automatically.

## Next steps (not included in this build)

- CV/résumé page and downloadable PDF (explicitly deferred to a future update)
- Real testimonials, blog post content, and a CV download link
- Wiring `routes/api.js` to send email (Nodemailer, Postmark, SendGrid, etc.)
- Swapping `data/*.json` for a real database if content grows or multiple
  editors need to manage it
- Deployment: this app runs anywhere Node.js runs (Render, Railway, a VPS,
  etc.) — set the `PORT` environment variable if your host requires it
