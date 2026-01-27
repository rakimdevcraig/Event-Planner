function GeneralEventInfo({ event }) {
  const { generalInfo } = event;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{generalInfo.name}</h1>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Client:</strong> {generalInfo.client}
        </p>
        <p>
          <strong>Location:</strong> {generalInfo.location}
        </p>
        <p>
          <strong>Guests:</strong> {generalInfo.guests}
        </p>
        <p>
          <strong>Type:</strong> {generalInfo.type}
        </p>
      </div>
    </div>
  );
}

export default GeneralEventInfo;
