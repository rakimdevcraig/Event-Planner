function ViewStaff({ staff }) {
  if (!staff.length) {
    return <p className="text-gray-500">No staff added yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Staff</h2>

      <ul className="space-y-2">
        {staff.map((member, index) => (
          <li key={index} className="border p-3 rounded bg-white">
            <p>
              <strong>Name:</strong> {member.name}
            </p>
            <p>
              {member.start} – {member.end}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewStaff;
