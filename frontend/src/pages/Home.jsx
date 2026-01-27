import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import { MdOutlineAddBox } from "react-icons/md";

function Home({ user, error }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/events")
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch events", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <div className="p-6 max-w-7xl mx-auto">
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Events</h1>
            <Link
              to="/events/create"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Add new event"
              title="Add event"
            >
              <MdOutlineAddBox className="text-3xl" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map(item => (
              <EventCard event={item} key={item._id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md min-h-[400px] border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Welcome!
            </h2>
            <p className="text-2xl font-bold text-center mb-6 text-gray-800">
              Please log in or register
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium"
                to="login"
              >
                Login
              </Link>
              <Link
                className="w-full bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 font-medium"
                to="register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
