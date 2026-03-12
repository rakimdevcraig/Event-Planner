import { useState } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/events`;

const emptyMeal = () => ({
  appetizer: "",
  main: "",
  dessert: "",
});

const emptyTable = tableNumber => ({
  name: `Table ${tableNumber}`,
  seats: Array(4).fill(""),
  misc: "",
});

function AddFood({ eventId, onFoodSaved }) {
  const [meals, setMeals] = useState([emptyMeal()]);
  const [tables, setTables] = useState([
    emptyTable(1),
    emptyTable(2),
    emptyTable(3),
    emptyTable(4),
  ]);
  const [savingTable, setSavingTable] = useState(null);
  const [savingMeals, setSavingMeals] = useState(false);
  const [tableErrors, setTableErrors] = useState({});
  const [mealsError, setMealsError] = useState(null);
  const [savedTables, setSavedTables] = useState({});

  const handleMealChange = (mealIndex, field, value) => {
    setMeals(prev =>
      prev.map((meal, i) =>
        i === mealIndex ? { ...meal, [field]: value } : meal,
      ),
    );
  };

  const addMeal = () => {
    setMeals(prev => [...prev, emptyMeal()]);
  };

  const removeMeal = index => {
    setMeals(prev => prev.filter((_, i) => i !== index));
  };

  const saveMeals = () => {
    setSavingMeals(true);
    setMealsError(null);

    axios
      .patch(`${API}/${eventId}/food/meals`, { meals })
      .then(() => setSavingMeals(false))
      .catch(err => {
        console.error(err);
        setMealsError("Failed to save meals. Please try again.");
        setSavingMeals(false);
      });
  };

  const addTable = () => {
    setTables(prev => [...prev, emptyTable(prev.length + 1)]);
  };

  const removeTable = index => {
    axios
      .delete(`${API}/${eventId}/food/table/${index}`)
      .then(() => {
        setTables(prev => prev.filter((_, i) => i !== index));
        setSavedTables(prev => {
          const updated = {};
          Object.keys(prev).forEach(k => {
            const num = Number(k);
            if (num < index) updated[num] = prev[num];
            else if (num > index) updated[num - 1] = prev[num];
          });
          return updated;
        });
      })
      .catch(err => {
        console.error(err);
        setTableErrors(prev => ({
          ...prev,
          [index]: "Failed to remove table.",
        }));
      });
  };

  const handleTableNameChange = (tableIndex, value) => {
    setTables(prev =>
      prev.map((t, i) => (i === tableIndex ? { ...t, name: value } : t)),
    );
  };

  const addSeat = tableIndex => {
    setTables(prev =>
      prev.map((t, i) => {
        if (i !== tableIndex || t.seats.length >= 10) return t;
        return { ...t, seats: [...t.seats, ""] };
      }),
    );
  };

  const removeSeat = tableIndex => {
    setTables(prev =>
      prev.map((t, i) => {
        if (i !== tableIndex || t.seats.length <= 1) return t;
        return { ...t, seats: t.seats.slice(0, -1) };
      }),
    );
  };

  const handleSeatChange = (tableIndex, seatIndex, value) => {
    setTables(prev =>
      prev.map((t, i) => {
        if (i !== tableIndex) return t;
        const newSeats = t.seats.map((s, si) => (si === seatIndex ? value : s));
        return { ...t, seats: newSeats };
      }),
    );
  };

  const handleMiscChange = (tableIndex, value) => {
    setTables(prev =>
      prev.map((t, i) => (i === tableIndex ? { ...t, misc: value } : t)),
    );
  };

  const saveTable = tableIndex => {
    setSavingTable(tableIndex);
    setTableErrors(prev => ({ ...prev, [tableIndex]: null }));

    axios
      .patch(`${API}/${eventId}/food/table/${tableIndex}`, {
        table: tables[tableIndex],
      })
      .then(() => {
        setSavedTables(prev => ({ ...prev, [tableIndex]: true }));
        setSavingTable(null);
        if (onFoodSaved) onFoodSaved();
      })
      .catch(err => {
        console.error(err);
        setTableErrors(prev => ({
          ...prev,
          [tableIndex]: "Failed to save table. Please try again.",
        }));
        setSavingTable(null);
      });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Meals Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Meal Options</h2>

        {meals.map((meal, mealIndex) => (
          <div
            key={mealIndex}
            className="border rounded p-4 space-y-2 relative"
          >
            <h3 className="font-semibold">Meal {mealIndex + 1}</h3>

            {["appetizer", "main", "dessert"].map(field => (
              <input
                key={field}
                className="w-full border p-2 rounded"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={meal[field]}
                onChange={e =>
                  handleMealChange(mealIndex, field, e.target.value)
                }
              />
            ))}

            {meals.length > 1 && (
              <button
                type="button"
                onClick={() => removeMeal(mealIndex)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove Meal
              </button>
            )}
          </div>
        ))}

        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={addMeal}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
          >
            + Add Meal
          </button>

          <button
            type="button"
            onClick={saveMeals}
            disabled={savingMeals}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
          >
            {savingMeals ? "Saving..." : "Save Meals"}
          </button>

          {mealsError && <p className="text-red-500 text-sm">{mealsError}</p>}
        </div>
      </section>

      {/* Tables Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold">Tables</h2>

        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="border rounded p-4 space-y-4">
            {/* Table Header */}
            <div className="flex items-center gap-3">
              <input
                className="border p-2 rounded font-semibold w-40"
                value={table.name}
                onChange={e =>
                  handleTableNameChange(tableIndex, e.target.value)
                }
              />
              <span className="text-sm text-gray-500">
                {table.seats.length} / 10 seats
              </span>
              <button
                type="button"
                onClick={() => removeTable(tableIndex)}
                className="ml-auto text-red-500 text-sm hover:underline"
              >
                Remove Table
              </button>
            </div>

            {/* Seats */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {table.seats.map((seat, seatIndex) => (
                <div key={seatIndex} className="flex flex-col items-center">
                  <label className="text-xs text-gray-500 mb-1">
                    Seat {seatIndex + 1}
                  </label>
                  <input
                    className="w-full border p-2 rounded text-center"
                    placeholder="Meal #"
                    value={seat}
                    onChange={e =>
                      handleSeatChange(tableIndex, seatIndex, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Seat Controls */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => addSeat(tableIndex)}
                disabled={table.seats.length >= 10}
                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-40"
              >
                + Add Seat
              </button>
              <button
                type="button"
                onClick={() => removeSeat(tableIndex)}
                disabled={table.seats.length <= 1}
                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-40"
              >
                - Remove Seat
              </button>
            </div>

            {/* Misc Notes */}
            <textarea
              className="w-full border p-2 rounded min-h-[80px]"
              placeholder="Misc notes for this table..."
              value={table.misc}
              onChange={e => handleMiscChange(tableIndex, e.target.value)}
            />

            {/* Save Table */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => saveTable(tableIndex)}
                disabled={savingTable === tableIndex}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
              >
                {savingTable === tableIndex ? "Saving..." : "Save Table"}
              </button>

              {savedTables[tableIndex] && !tableErrors[tableIndex] && (
                <span className="text-green-500 text-sm">Saved ✓</span>
              )}

              {tableErrors[tableIndex] && (
                <span className="text-red-500 text-sm">
                  {tableErrors[tableIndex]}
                </span>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTable}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          + Add Table
        </button>
      </section>
    </div>
  );
}

export default AddFood;

// import { useState } from "react";
// import axios from "axios";

// function AddFood({ eventId, onFoodSaved }) {
//   const [formData, setFormData] = useState({
//     firstCourse: "",
//     secondCourse: "",
//     dessert: "",
//     allergies: "",
//     misc: "",
//   });

//   const handleSubmit = e => {
//     e.preventDefault();

//     axios
//       .patch(`${import.meta.env.VITE_API_URL}/${eventId}/food`, {
//         food: formData,
//       })
//       .then(() => {
//         alert("Food saved");
//         setFormData({
//           firstCourse: "",
//           secondCourse: "",
//           dessert: "",
//           allergies: "",
//           misc: "",
//         });

//         onFoodSaved();
//       })
//       .catch(err => {
//         console.error("Failed to save food info", err);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
//       <h2 className="text-xl font-bold">Add Food Info</h2>

//       <input
//         className="w-full border p-2 rounded"
//         placeholder="First Course"
//         value={formData.firstCourse}
//         onChange={e =>
//           setFormData({ ...formData, firstCourse: e.target.value })
//         }
//       />

//       <input
//         className="w-full border p-2 rounded"
//         placeholder="Second Course"
//         value={formData.secondCourse}
//         onChange={e =>
//           setFormData({ ...formData, secondCourse: e.target.value })
//         }
//       />

//       <input
//         className="w-full border p-2 rounded"
//         placeholder="Dessert"
//         value={formData.dessert}
//         onChange={e => setFormData({ ...formData, dessert: e.target.value })}
//       />

//       <input
//         className="w-full border p-2 rounded"
//         placeholder="Allergies / Dietary Notes"
//         value={formData.allergies}
//         onChange={e => setFormData({ ...formData, allergies: e.target.value })}
//       />

//       <textarea
//         className="w-full border p-3 rounded min-h-[120px]"
//         placeholder="Misc food notes"
//         value={formData.misc}
//         onChange={e => setFormData({ ...formData, misc: e.target.value })}
//       />

//       <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         Save Food Info
//       </button>
//     </form>
//   );
// }

// export default AddFood;
