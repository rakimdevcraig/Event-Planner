import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    client: "",
    location: "",
    guests: "",
    type: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const payload = {
      generalInfo: {
        name: formData.name,
        client: formData.client,
        location: formData.location,
        guests: Number(formData.guests),
        type: formData.type,
      },
    };

    axios
      .post("http://localhost:5000/api/events", payload)
      .then(res => {
        navigate("/"); // go back to events list
      })
      .catch(err => {
        setError(err.response?.data?.message || "Failed to create event");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white px-8 py-12 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Event
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              placeholder="Christmas Party"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Client
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              placeholder="Dan Hollister"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              placeholder="10 Newbury St, Boston"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Guest Count
            </label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              placeholder="75"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Event Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              placeholder="Holiday Party"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium transition disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
