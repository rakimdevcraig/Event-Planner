import { useState } from "react";
import axios from "axios";

function AddStaffForm({ eventId, onStaffAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
  });

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .patch(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
        staff: [formData],
      })
      .then(() => {
        alert("Staff added");
        setFormData({ name: "", start: "", end: "" });
        onStaffAdded();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <h2 className="text-xl font-bold">Add Staff</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Start time"
        value={formData.start}
        onChange={e => setFormData({ ...formData, start: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="End time"
        value={formData.end}
        onChange={e => setFormData({ ...formData, end: e.target.value })}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Staff
      </button>
    </form>
  );
}

export default AddStaffForm;
