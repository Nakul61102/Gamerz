import { useEffect, useState } from "react";
import { getCommunityEvents } from "../../api"; // ← Make sure this exists
import { format } from "date-fns";

const EventList = ({ communityId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getCommunityEvents(communityId);
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [communityId]);

  if (loading) return <p className="text-gray-400">Loading events...</p>;
  if (events.length === 0) return <p className="text-gray-400">No events yet.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-gray-800 p-4 rounded-lg shadow text-white"
        >
          <h4 className="text-lg font-bold mb-1">{event.name}</h4>
          <p className="text-gray-300 mb-2">{event.description}</p>
          <p className="text-sm text-gray-400">
            📅 {format(new Date(event.date), "PPpp")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventList;


