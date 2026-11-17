import { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm.jsx";
import { formatDate } from "../utils.js";

export default function EventModal({ event, registered, onRegister, onClose }) {
  const [showForm, setShowForm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (details) => {
    if (onRegister(event, details)) setConfirmed(true);
  };

  const seatsLeft = event.seats - (registered ? 1 : 0);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={event.title} onClick={(e) => e.stopPropagation()}>
        <button className="close" aria-label="Close" onClick={onClose}>✕</button>
        <img className="banner" src={event.image} alt={event.title} />
        <div className="modal-body">
          <span className="tag static">{event.category}</span>
          <h2>{event.title}</h2>
          <p className="meta">{formatDate(event.date)} · {event.location}</p>
          <p className="meta">{seatsLeft} seats left</p>
          <p className="desc">{event.description}</p>

          {confirmed ? (
            <div className="notice success" role="status">
              You're registered for {event.title}. Find it under My Registrations.
            </div>
          ) : registered ? (
            <div className="notice" role="status">You have already registered for this event.</div>
          ) : showForm ? (
            <RegistrationForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
          ) : (
            <button className="btn" onClick={() => setShowForm(true)}>Register Now</button>
          )}
        </div>
      </div>
    </div>
  );
}
