import { useLayoutEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import EventList from "../components/EventList.jsx";
import { CATEGORIES } from "../data/events.js";
import { formatDate } from "../utils.js";

const BLURBS = {
  Technology: "Coding, AI and cloud workshops",
  Business: "Funding, marketing and leadership",
  Design: "UI, typography and prototyping",
  Education: "Teaching and study skills",
};
const TITLE = "Find the event that moves your career forward";

export default function Home({ events, ...shared }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const hero = sorted[0];
  const featured = events.filter((e) => e.featured);
  const upcoming = sorted.slice(1, 5);
  const cities = new Set(events.map((e) => e.location)).size;

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = heroRef.current;
    const loop = { repeat: -1, yoyo: true, ease: "sine.inOut" };
    let cleanup = () => {};

    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(".wi", { yPercent: 115, duration: 0.9, stagger: 0.06, ease: "power4.out" });
      gsap.from("[data-g]", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.35, ease: "power3.out" });
      gsap.from(".spot-wrap", { x: 70, opacity: 0, rotate: 3, duration: 1.1, delay: 0.3, ease: "power3.out" });
      gsap.from(".float-chip", { scale: 0, opacity: 0, duration: 0.6, stagger: 0.18, delay: 1.1, ease: "back.out(2)" });

      // Ambient loops
      gsap.to(".spot-wrap", { y: -12, duration: 3.2, ...loop });
      gsap.to(".float-chip.c1", { y: -12, duration: 2.4, ...loop });
      gsap.to(".float-chip.c2", { y: 12, x: -6, duration: 2.9, ...loop });
      gsap.to(".spot img", { scale: 1.1, duration: 9, ...loop });
      gsap.to(".b1", { x: -40, y: 30, duration: 8, ...loop });
      gsap.to(".b2", { x: 50, y: -30, duration: 10, ...loop });

      // Counters
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const o = { v: 0 };
        el.textContent = "0";
        gsap.to(o, { v: +el.dataset.count, duration: 1.4, delay: 0.6, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v)) });
      });

      // Mouse-reactive 3D tilt on the spotlight card + parallax on the glow
      if (window.matchMedia("(hover: hover)").matches) {
        const spot = root.querySelector(".spot");
        gsap.set(spot, { transformPerspective: 1000 });
        const rx = gsap.quickTo(spot, "rotationX", { duration: 0.7, ease: "power3.out" });
        const ry = gsap.quickTo(spot, "rotationY", { duration: 0.7, ease: "power3.out" });
        const b1 = gsap.quickTo(".b1", "xPercent", { duration: 1.2, ease: "power3.out" });
        const b2 = gsap.quickTo(".b2", "xPercent", { duration: 1.2, ease: "power3.out" });
        const move = (e) => {
          const r = root.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 16); rx(-py * 16); b1(px * -10); b2(px * 10);
        };
        const leave = () => { rx(0); ry(0); b1(0); b2(0); };
        root.addEventListener("pointermove", move, { passive: true });
        root.addEventListener("pointerleave", leave);
        cleanup = () => {
          root.removeEventListener("pointermove", move);
          root.removeEventListener("pointerleave", leave);
        };
      }
    }, heroRef);

    return () => { cleanup(); ctx.revert(); };
  }, []);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <span className="blob b1" aria-hidden="true" />
        <span className="blob b2" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div>
            <p className="hero-kicker" data-g>Workshops, summits and meetups</p>
            <h1 aria-label={TITLE}>
              {TITLE.split(" ").map((w, i) => (
                <span key={i}><span className="w" aria-hidden="true"><span className="wi">{w}</span></span>{" "}</span>
              ))}
            </h1>
            <p className="hero-desc" data-g>Browse hands-on workshops in technology, business, design and education. Register in under a minute.</p>
            <div className="row" data-g>
              <Link to="/explore" className="btn accent">Explore Events</Link>
              <Link to="/registrations" className="btn ghost light">My Registrations</Link>
            </div>
            <div className="stats" data-g>
              <div><strong data-count={events.length}>{events.length}</strong><span>Upcoming events</span></div>
              <div><strong data-count={cities}>{cities}</strong><span>Cities</span></div>
              <div><strong data-count={CATEGORIES.length}>{CATEGORIES.length}</strong><span>Categories</span></div>
            </div>
          </div>

          <div className="spot-wrap">
            <span className="float-chip c1">{hero.seats} seats open</span>
            <span className="float-chip c2">{hero.category}</span>
            <article className="spot">
              <img src={hero.image} alt={hero.title} />
              <div className="spot-body">
                <span className="chip">Next event</span>
                <h3>{hero.title}</h3>
                <p>{formatDate(hero.date)} · {hero.location}</p>
                <button className="btn accent small" onClick={() => shared.onView(hero)}>View Details</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sec-head" data-aos="fade-up">
          <h2>Browse by category</h2>
          <p>Pick a topic and see what's coming up.</p>
        </div>
        <div className="cats">
          {CATEGORIES.map((c, i) => (
            <button key={c} className="cat" data-aos="zoom-in-up" data-aos-delay={i * 90} onClick={() => navigate(`/explore?category=${c}`)}>
              <b>{c}</b>
              <span>{BLURBS[c]}</span>
              <small>{events.filter((e) => e.category === c).length} events</small>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sec-head row-between" data-aos="fade-up">
          <div><h2>Featured events</h2><p>Hand-picked sessions our community loves.</p></div>
          <Link to="/explore" className="link">View all events</Link>
        </div>
        <EventList events={featured} {...shared} />
      </section>

      <section className="section">
        <div className="sec-head" data-aos="fade-up">
          <h2>Upcoming events</h2>
          <p>Coming up soonest. Seats fill quickly.</p>
        </div>
        <EventList events={upcoming} {...shared} />
      </section>

      <section className="cta" data-aos="fade-up">
        <div className="wrap cta-inner">
          <div>
            <h2>Ready to learn something new?</h2>
            <p>Explore all {events.length} events and reserve your seat today.</p>
          </div>
          <Link to="/explore" className="btn accent">Explore Events</Link>
        </div>
      </section>
    </>
  );
}
