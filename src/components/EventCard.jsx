import { useEffect, useRef } from "react";
import gsap from "gsap";
import { formatDate } from "../utils.js";

const canMove = () =>
  window.matchMedia("(hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function EventCard({ event, onView, isFav, onToggleFav, registered, delay = 0 }) {
  const tiltRef = useRef(null);

  // 3D tilt + moving glare. Applied to an inner element so it never fights AOS on the wrapper.
  useEffect(() => {
    const el = tiltRef.current;
    if (!el || !canMove()) return;
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
    const lift = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 12);
      rx(-(py - 0.5) * 12);
      lift(-6);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    };
    const leave = () => { rx(0); ry(0); lift(0); };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div className="card-wrap" data-aos="fade-up" data-aos-delay={delay}>
      <article className="card" ref={tiltRef}>
        <div className="card-img">
          <img src={event.image} alt={event.title} loading="lazy" />
          <span className="tag">{event.category}</span>
          {onToggleFav && (
            <button
              className={isFav ? "fav on" : "fav"}
              aria-pressed={isFav}
              aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
              onClick={() => onToggleFav(event.id)}
            >
              {isFav ? "♥" : "♡"}
            </button>
          )}
        </div>
        <div className="card-body">
          <h3>{event.title}</h3>
          <p className="meta">{formatDate(event.date)}</p>
          <p className="meta">{event.location}</p>
          <div className="card-foot">
            <button className="btn small" onClick={() => onView(event)}>View Details</button>
            {registered && <span className="done">Registered</span>}
          </div>
        </div>
      </article>
    </div>
  );
}
