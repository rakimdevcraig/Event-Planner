import { Link } from "react-router-dom";
import { BiCalendarEvent, BiUserCircle, BiMap, BiGroup } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdCelebration } from "react-icons/md";

function EventCard({ event }) {
  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 relative hover:shadow-xl">
      <div className="flex justify-start gap-x-2">
        <Link
          to={`/events/details/${event._id}`}
          className="flex items-center gap-2 group"
        >
          <BiCalendarEvent className="text-blue-500" />
          <h2 className="my-1 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {event.generalInfo.name}
          </h2>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <BiUserCircle className="text-red-400" />
        <h2 className="my-1">{event.generalInfo.client}</h2>
      </div>
      <div className="flex items-center gap-x-2">
        <MdCelebration className="text-pink-500 text-lg" />
        <h2 className="my-1">{event.generalInfo.type}</h2>
      </div>
      <div className="flex items-center gap-x-2">
        <BiGroup className="text-purple-500" />
        <h2 className="my-1">{event.generalInfo.guests} Guests</h2>
      </div>
      <h2 className="flex items-center gap-2 text-gray-700 mt-2">
        <BiMap className="text-green-500" />
        {event.generalInfo.location}
      </h2>
      <div className="flex justify-between gap-x-2 mt-4 p-4">
        <Link to={`/events/details/${event._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/events/edit/${event._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/events/delete/${event._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
