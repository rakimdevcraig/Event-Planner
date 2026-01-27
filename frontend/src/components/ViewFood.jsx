function ViewFood({ food }) {
  if (!food || Object.keys(food).length === 0) {
    return <p className="text-gray-500">No food information added yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Food Details</h2>

      <div className="space-y-2 bg-white border rounded p-4">
        {food.firstCourse && (
          <p>
            <strong>First Course:</strong> {food.firstCourse}
          </p>
        )}

        {food.secondCourse && (
          <p>
            <strong>Second Course:</strong> {food.secondCourse}
          </p>
        )}

        {food.dessert && (
          <p>
            <strong>Dessert:</strong> {food.dessert}
          </p>
        )}

        {food.allergies && (
          <p>
            <strong>Allergies:</strong> {food.allergies}
          </p>
        )}

        {food.misc && (
          <p>
            <strong>Notes:</strong> {food.misc}
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewFood;
