# Gather – Event Discovery & Workshop Registration

React 18 + React Router 6 + Vite. No backend; registrations and favourites persist in LocalStorage.

## Run
```
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Structure
- `src/pages` – Home, Explore, MyRegistrations
- `src/components` – Navbar, EventCard, EventList, EventModal, RegistrationForm
- `src/hooks/useLocalStorage.js` – useState + useEffect persistence hook
- `src/data/events.js` – 12 sample events

## Optional features included
Sort by date, filter by location, favourites, remaining seats, modal animation.

## Your logo
Header (white) uses `public/logo-dark.svg`; footer (dark) uses `public/logo.svg`. Replace both with your logo, or change the `src` in `Navbar.jsx` and `Footer.jsx`.
Edit the footer address, phone, email and social links in `src/components/Footer.jsx`.

## Animations
AOS handles scroll reveals (initialised in `App.jsx`); GSAP handles the page transition and the Home hero.
Both are skipped when the visitor prefers reduced motion.
