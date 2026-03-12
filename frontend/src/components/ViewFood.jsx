function ViewFood({ food }) {
  if (!food || (!food.meals?.length && !food.tables?.length)) {
    return <p className="text-gray-500">No food information added yet.</p>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Food Details</h2>

      {/* Meal Options */}
      {food.meals?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-3">Meal Options</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {food.meals.map((meal, i) => (
              <div key={i} className="border rounded p-4 bg-white space-y-1">
                <h4 className="font-bold">Meal {i + 1}</h4>
                {meal.appetizer && (
                  <p>
                    <span className="font-medium">Appetizer:</span>{" "}
                    {meal.appetizer}
                  </p>
                )}
                {meal.main && (
                  <p>
                    <span className="font-medium">Main:</span> {meal.main}
                  </p>
                )}
                {meal.dessert && (
                  <p>
                    <span className="font-medium">Dessert:</span> {meal.dessert}
                  </p>
                )}
                {!meal.appetizer && !meal.main && !meal.dessert && (
                  <p className="text-gray-400 text-sm">No details added.</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tables */}
      {food.tables?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-3">Tables</h3>
          <div className="space-y-4">
            {food.tables.map((table, i) => (
              <div key={i} className="border rounded p-4 bg-white space-y-3">
                <h4 className="font-bold">{table.name || `Table ${i + 1}`}</h4>

                {/* Seats */}
                {table.seats?.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {table.seats.map((seat, si) => (
                      <div
                        key={si}
                        className="border rounded p-2 text-center bg-gray-50"
                      >
                        <p className="text-xs text-gray-400 mb-1">
                          Seat {si + 1}
                        </p>
                        <p className="font-medium">
                          {seat ? (
                            `Meal ${seat}`
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Misc Notes */}
                {table.misc && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> {table.misc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ViewFood;
