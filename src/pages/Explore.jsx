import { useState, useEffect } from "react";
import PageHead from "../components/PageHead.jsx";
import { useSearchParams } from "react-router-dom";
import EventList from "../components/EventList.jsx";
import { CATEGORIES } from "../data/events.js";

export default function Explore({ events, ...shared }) {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("date-asc");

  useEffect(() => { setCategory(params.get("category") || "All"); }, [params]);

  const locations = [...new Set(events.map((e) => e.location))].sort();

  const visible = events
    .filter((e) => e.title.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((e) => category === "All" || e.category === category)
    .filter((e) => location === "All" || e.location === location)
    .sort((a, b) => (sort === "date-asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));

  const reset = () => { setSearch(""); setCategory("All"); setLocation("All"); };

  return (
    <>
      <PageHead title="Explore events" text="Search workshops, summits and meetups, then filter by category, city or date." />
      <section className="section">
      <div className="filters">
        <input type="search" placeholder="Search by event name" aria-label="Search events" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select aria-label="Location" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="All">All locations</option>
          {locations.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select aria-label="Sort by date" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date-asc">Soonest first</option>
          <option value="date-desc">Latest first</option>
        </select>
      </div>
      <div className="pills">
        {["All", ...CATEGORIES].map((c) => (
          <button key={c} className={c === category ? "pill on" : "pill"} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      <p className="meta">{visible.length} {visible.length === 1 ? "event" : "events"} found</p>

      {visible.length > 0 ? (
        <EventList events={visible} {...shared} />
      ) : (
        <div className="empty">
          <h3>No events match your search</h3>
          <p>Try a different name, or clear the filters.</p>
          <button className="btn" onClick={reset}>Clear filters</button>
        </div>
      )}
      </section>
    </>
  );
}
