import { useState } from "react";
import axios from "axios";

function AddFood({ eventId, onFoodSaved }) {
  const [formData, setFormData] = useState({
    firstCourse: "",
    secondCourse: "",
    dessert: "",
    allergies: "",
    misc: "",
  });

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .patch(`http://localhost:5000/api/events/${eventId}/food`, {
        food: formData,
      })
      .then(() => {
        alert("Food saved");
        setFormData({
          firstCourse: "",
          secondCourse: "",
          dessert: "",
          allergies: "",
          misc: "",
        });

        onFoodSaved();
      })
      .catch(err => {
        console.error("Failed to save food info", err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h2 className="text-xl font-bold">Add Food Info</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="First Course"
        value={formData.firstCourse}
        onChange={e =>
          setFormData({ ...formData, firstCourse: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Second Course"
        value={formData.secondCourse}
        onChange={e =>
          setFormData({ ...formData, secondCourse: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Dessert"
        value={formData.dessert}
        onChange={e => setFormData({ ...formData, dessert: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Allergies / Dietary Notes"
        value={formData.allergies}
        onChange={e => setFormData({ ...formData, allergies: e.target.value })}
      />

      <textarea
        className="w-full border p-3 rounded min-h-[120px]"
        placeholder="Misc food notes"
        value={formData.misc}
        onChange={e => setFormData({ ...formData, misc: e.target.value })}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Food Info
      </button>
    </form>
  );
}

export default AddFood;
