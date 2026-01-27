function ViewFeedback({ feedback }) {
  if (!feedback || feedback.trim() === "") {
    return <p className="text-gray-500">No feedback has been added yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Event Feedback</h2>

      <div className="bg-white border rounded p-4 text-gray-700 whitespace-pre-line">
        {feedback}
      </div>
    </div>
  );
}

export default ViewFeedback;
