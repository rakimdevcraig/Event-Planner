import { useState } from "react";
import axios from "axios";

function AddFeedback({ eventId, onFeedbackAdded }) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .patch(`http://localhost:5000/api/events/${eventId}/feedback`, {
        feedback,
      })
      .then(() => {
        alert("Feedback saved");
        setFeedback("");
        onFeedbackAdded();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h2 className="text-xl font-bold">Add Feedback</h2>

      <textarea
        className="w-full border p-3 rounded min-h-[150px]"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        placeholder="Enter event feedback..."
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Feedback
      </button>
    </form>
  );
}

export default AddFeedback;
