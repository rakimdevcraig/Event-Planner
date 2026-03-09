import { useState } from "react";
import axios from "axios";

function AddBar({ eventId, onBarAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    startQty: "",
    endQty: "",
  });

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .patch(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/`, {
        bar: [
          {
            name: formData.name,
            startQty: Number(formData.startQty),
            endQty: Number(formData.endQty),
          },
        ],
      })
      .then(() => {
        alert("Bar item added");
        setFormData({ name: "", startQty: "", endQty: "" });
        onBarAdded();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <h2 className="text-xl font-bold">Add Bar Item</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Start Qty"
        type="number"
        value={formData.startQty}
        onChange={e => setFormData({ ...formData, startQty: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="End Qty"
        type="number"
        value={formData.endQty}
        onChange={e => setFormData({ ...formData, endQty: e.target.value })}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Bar Item
      </button>
    </form>
  );
}

export default AddBar;
