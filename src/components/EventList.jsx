import EventCard from "./EventCard.jsx";

export default function EventList({ events, onView, favourites, onToggleFav, isRegistered }) {
  return (
    <div className="grid">
      {events.map((e, i) => (
        <EventCard
          key={e.id}
          event={e}
          delay={(i % 4) * 80}
          onView={onView}
          isFav={favourites.includes(e.id)}
          onToggleFav={onToggleFav}
          registered={isRegistered(e.id)}
        />
      ))}
    </div>
  );
}
