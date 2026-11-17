import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import gsap from "gsap";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import EventModal from "./components/EventModal.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import MyRegistrations from "./pages/MyRegistrations.jsx";
import NotFound from "./pages/NotFound.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { events } from "./data/events.js";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [registrations, setRegistrations] = useLocalStorage("registrations", []);
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  // Scroll animations (AOS) – initialised once
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 50, disable: reduced });
  }, []);

  // Smooth page transition (GSAP) + re-scan for AOS elements on each route
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (reduced()) return;
    const tween = gsap.fromTo(mainRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "all" });
    return () => tween.kill();
  }, [pathname]);

  useEffect(() => {
    const t = setTimeout(() => AOS.refreshHard(), 60);
    return () => clearTimeout(t);
  }, [pathname]);

  const isRegistered = (id) => registrations.some((r) => r.eventId === id);

  const register = (event, details) => {
    if (isRegistered(event.id)) return false; // duplicate guard
    setRegistrations([...registrations, { eventId: event.id, ...details, registeredAt: new Date().toISOString() }]);
    return true;
  };

  const cancel = (id) => setRegistrations(registrations.filter((r) => r.eventId !== id));
  const toggleFav = (id) =>
    setFavourites(favourites.includes(id) ? favourites.filter((f) => f !== id) : [...favourites, id]);

  const shared = { onView: setSelectedEvent, favourites, onToggleFav: toggleFav, isRegistered };

  return (
    <>
      <Navbar count={registrations.length} />
      <main ref={mainRef}>
        <Routes>
          <Route path="/" element={<Home events={events} {...shared} />} />
          <Route path="/explore" element={<Explore events={events} {...shared} />} />
          <Route
            path="/registrations"
            element={<MyRegistrations events={events} registrations={registrations} onCancel={cancel} onView={setSelectedEvent} />}
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          registered={isRegistered(selectedEvent.id)}
          onRegister={register}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
