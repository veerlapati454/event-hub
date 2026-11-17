import { Link } from "react-router-dom";
import PageHead from "../components/PageHead.jsx";
import { formatDate } from "../utils.js";

export default function MyRegistrations({ events, registrations, onCancel, onView }) {
  const items = registrations
    .map((r) => ({ reg: r, event: events.find((e) => e.id === r.eventId) }))
    .filter((i) => i.event);

  return (
    <>
      <PageHead title="My registrations" text="Events you have signed up for. You can review your details or cancel at any time." />
      <section className="section">
      {items.length === 0 ? (
        <div className="empty">
          <h3>You haven't registered for any events yet</h3>
          <p>Find a workshop or meetup that interests you and register in a minute.</p>
          <Link to="/explore" className="btn">Explore Events</Link>
        </div>
      ) : (
        <ul className="reg-list">
          {items.map(({ reg, event }) => (
            <li key={event.id} className="reg">
              <img src={event.image} alt="" />
              <div className="reg-info">
                <h3>{event.title}</h3>
                <p className="meta">{formatDate(event.date)} · {event.location}</p>
                <p className="meta">{reg.name} · {reg.email} · {reg.phone}</p>
              </div>
              <div className="reg-actions">
                <button className="btn ghost small" onClick={() => onView(event)}>View Details</button>
                <button
                  className="btn danger small"
                  onClick={() => window.confirm(`Cancel your registration for ${event.title}?`) && onCancel(event.id)}
                >
                  Cancel registration
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      </section>
    </>
  );
}
