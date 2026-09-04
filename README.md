# JustiFi — Modular Multi-Page Project

The original single-file prototype has been split into separate, trackable
pages/modules that share one navbar, one footer, and one sidebar. Nothing in
`css/style.css` was changed — the entire original `<style>` block was copied
verbatim; only new rules for the new Affidavit module were **added** at the
bottom of the file.

## How to run it

Because pages load the navbar/footer/sidebar via `fetch()`, you must serve
the folder over HTTP (opening the files directly with `file://` will block
`fetch`). From inside the `justifi/` folder run:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/index.html`.

Any static server works (`npx serve`, VS Code "Live Server", etc.) — it just
can't be opened as a bare local file.

## Folder structure

```
justifi/
├── css/
│   └── style.css          ← all shared styles (unchanged) + new Affidavit rules
├── js/
│   ├── data.js             ← shared mock data (lawyers, dates, slots)
│   ├── auth.js              ← login/logout + shows/hides logged-in UI, persisted in localStorage
│   └── partials.js          ← loads navbar/footer/sidebar/bottom-nav into every page
├── partials/
│   ├── navbar.html          ← top navbar + mobile drawer (same on every page)
│   ├── footer.html          ← deep-navy footer (same on every page)
│   ├── sidebar.html         ← desktop sidebar (only on logged-in pages)
│   └── bottom-nav.html      ← mobile bottom nav (only on logged-in pages)
├── index.html               ← Homepage (public)
├── about.html                ← About Us (public)
├── lawyer_list.html          ← "Find Verified Advocates" directory (public)
├── booking.html              ← Combined lawyer portfolio + booking form (public)
├── affidavit.html            ← 4-step Affidavit Generator (public)
├── dashboard.html            ← Dashboard (requires login → has sidebar)
├── myconsultancy.html        ← My Consultations (requires login → has sidebar)
└── profile.html              ← My Profile (requires login → has sidebar)
```

## How pages are wired together

Every page's `<body>` carries two data attributes that `js/auth.js` and
`js/partials.js` read:

```html
<body data-page="dashboard" data-requires-auth="1">
```

- `data-page` — used to highlight the correct link in the navbar/sidebar/bottom-nav.
- `data-requires-auth` — `"1"` bounces a logged-out visitor back to `index.html`,
  and tells `partials.js` to also load the sidebar + bottom-nav partials.

**Before login:** only the navbar (+ its mobile drawer) and footer are loaded —
this matches `index.html`, `about.html`, `lawyer_list.html`, `booking.html`,
and `affidavit.html`.

**After login** (`login()` in `js/auth.js` sets a flag in `localStorage` and
redirects to `dashboard.html`): `dashboard.html`, `myconsultancy.html`, and
`profile.html` additionally load `partials/sidebar.html` and
`partials/bottom-nav.html`, and the navbar swaps the "Sign In" button for the
bell + avatar.

## Making changes

- **Navbar/footer/sidebar copy or links** → edit the one file in `partials/`;
  it updates on every page automatically.
- **A specific page's content** → edit only that page's `.html` file.
- **Any shared color, spacing, card, button, etc.** → edit `css/style.css`
  (the class names are identical to the original prototype, e.g. `.card`,
  `.btn-gold`, `.lawyer-card`, `.stepper`).
- **Mock lawyer data / booking dates & slots** → edit `js/data.js`.
- **Login/session behavior** → edit `js/auth.js`.

## Notes

- `booking.html?lawyer=<id>` reads the lawyer id from the query string (see
  the `id` field in `js/data.js`) so every "View Profile" / "Book
  Consultation" link on the homepage and lawyer list deep-links straight into
  the right lawyer's combined portfolio + booking page.
- The Affidavit Generator (`affidavit.html`) is a self-contained 4-step form
  (Type → Facts & Purpose → Deponent Details → Preview & Submit) with a live
  stamp-paper-style preview and watermark, built new for this project using
  the same design tokens as the rest of the site.
