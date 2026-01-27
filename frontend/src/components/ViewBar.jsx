function ViewBar({ bar }) {
  if (!bar.length) {
    return <p className="text-gray-500">No bar items added yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bar Items</h2>

      <ul className="space-y-2">
        {bar.map((item, index) => (
          <li key={index} className="border p-3 rounded bg-white">
            <p>
              <strong>{item.name}</strong>
            </p>
            <p>Start: {item.startQty}</p>
            <p>End: {item.endQty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewBar;
