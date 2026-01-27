import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    client: "",
    location: "",
    guests: "",
    type: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch existing event data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then(res => {
        const { generalInfo } = res.data;
        setFormData({
          name: generalInfo.name,
          client: generalInfo.client,
          location: generalInfo.location,
          guests: generalInfo.guests,
          type: generalInfo.type,
        });
      })
      .catch(() => {
        setError("Failed to load event");
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .patch(`http://localhost:5000/api/events/${id}/general-info`, {
        generalInfo: {
          name: formData.name,
          client: formData.client,
          location: formData.location,
          guests: Number(formData.guests),
          type: formData.type,
        },
      })
      .then(() => {
        navigate(`/events/details/${id}`);
      })
      .catch(() => {
        setError("Failed to update event");
      });
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Event</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Client"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Guests"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Event Type"
            className="w-full border p-2 rounded"
            required
          />

          <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
