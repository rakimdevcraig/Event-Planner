import { useState } from "react";
import axios from "axios";

function AddEquipment({ eventId, onEquipmentAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    qty: "",
  });

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .patch(`http://localhost:5000/api/events/${eventId}`, {
        equipment: [{ ...formData, qty: Number(formData.qty) }],
      })
      .then(() => {
        alert("Equipment added");
        setFormData({ name: "", type: "", qty: "" });
        onEquipmentAdded();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <h2 className="text-xl font-bold">Add Equipment</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Type"
        value={formData.type}
        onChange={e => setFormData({ ...formData, type: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Quantity"
        type="number"
        value={formData.qty}
        onChange={e => setFormData({ ...formData, qty: e.target.value })}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Equipment
      </button>
    </form>
  );
}

export default AddEquipment;
