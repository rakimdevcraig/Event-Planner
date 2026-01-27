function ViewEquipment({ equipment }) {
  if (!equipment.length) {
    return <p className="text-gray-500">No equipment added yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Equipment</h2>

      <ul className="space-y-2">
        {equipment.map((item, index) => (
          <li key={index} className="border p-3 rounded bg-white">
            <p>
              <strong>{item.name}</strong>
            </p>
            <p>Type: {item.type}</p>
            <p>Qty: {item.qty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewEquipment;
