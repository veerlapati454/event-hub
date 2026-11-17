import { useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function NotFound() {
  const root = useRef(null);

  // Floating particles: fixed random layout, created once
  const particles = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      id: i, top: Math.random() * 100, left: Math.random() * 100,
      size: 6 + Math.random() * 14, square: i % 3 === 0,
    })),
    []
  );

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    const loop = { repeat: -1, yoyo: true, ease: "sine.inOut" };
    let cleanup = () => {};

    const ctx = gsap.context(() => {
      gsap.set(".halo", { xPercent: -50, yPercent: -50 });

      // Entrance: digits drop in with a bounce, then the text follows
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".digit", { y: -260, opacity: 0, rotation: () => gsap.utils.random(-40, 40), duration: 1.1, stagger: 0.14, ease: "bounce.out" })
        .from(".zero", { scale: 0, rotation: -270, duration: 1, ease: "back.out(1.6)" }, 0.15)
        .from("[data-n]", { y: 30, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.9)
        .from(".planet", { scale: 0, duration: 0.5, ease: "back.out(3)" }, 1.2);

      // Ambient loops
      gsap.to(".ring", { rotation: 360, duration: 6, repeat: -1, ease: "none" });
      gsap.to(".orbit", { rotation: 360, duration: 3.5, repeat: -1, ease: "none" });
      gsap.to(".halo", { rotation: 360, duration: 50, repeat: -1, ease: "none" });
      gsap.to(".halo.h2", { rotation: -360, duration: 70, repeat: -1, ease: "none" });
      gsap.to(".digit.d1", { y: -14, duration: 2.4, ...loop });
      gsap.to(".digit.d3", { y: 14, duration: 2.8, ...loop });
      gsap.to(".zero", { scale: 1.05, duration: 2, ...loop });
      gsap.utils.toArray(".part").forEach((p) =>
        gsap.to(p, { x: "random(-50, 50)", y: "random(-70, 70)", rotation: "random(-180, 180)", duration: "random(3, 6)", delay: "random(0, 2)", ...loop })
      );

      // Periodic glitch burst
      gsap.timeline({ repeat: -1, repeatDelay: 3.5, delay: 3 })
        .to(".digit", { x: () => gsap.utils.random(-8, 8), skewX: () => gsap.utils.random(-10, 10), textShadow: "6px 0 #ff7a9c, -6px 0 #7c5cff", duration: 0.06, repeat: 5, yoyo: true })
        .set(".digit", { x: 0, skewX: 0, textShadow: "0 0 40px rgba(124,92,255,.6)" });

      // Mouse parallax per layer
      if (window.matchMedia("(hover: hover)").matches) {
        const layers = [".l-bg", ".l-mid", ".l-num"].map((s, i) => ({
          x: gsap.quickTo(s, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(s, "y", { duration: 0.9, ease: "power3.out" }),
          d: [14, 30, -22][i],
        }));
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => { l.x(px * l.d); l.y(py * l.d); });
        };
        const leave = () => layers.forEach((l) => { l.x(0); l.y(0); });
        el.addEventListener("pointermove", move, { passive: true });
        el.addEventListener("pointerleave", leave);
        cleanup = () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
      }
    }, root);

    return () => { cleanup(); ctx.revert(); };
  }, []);

  return (
    <section className="nf" ref={root}>
      <div className="layer l-bg" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
      </div>
      <div className="layer l-mid" aria-hidden="true">
        {particles.map((p) => (
          <span key={p.id} className={p.square ? "part sq" : "part"} style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }} />
        ))}
      </div>

      <div className="nf-body">
        <div className="layer-num l-num">
          <span className="halo" aria-hidden="true" />
          <span className="halo h2" aria-hidden="true" />
          <h1 className="n404" aria-label="404">
            <span className="digit d1" aria-hidden="true">4</span>
            <span className="zero" aria-hidden="true">
              <span className="ring" />
              <span className="orbit"><span className="planet" /></span>
            </span>
            <span className="digit d3" aria-hidden="true">4</span>
          </h1>
        </div>
        <h2 data-n>Page not found</h2>
        <p data-n>The page you're looking for has moved or doesn't exist. Head back home or browse the latest events.</p>
        <div className="row nf-actions" data-n>
          <Link to="/" className="btn accent">Back to Home</Link>
          <Link to="/explore" className="btn ghost light">Explore Events</Link>
        </div>
      </div>
    </section>
  );
}
