import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

function DeleteEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function handleDeleteEvent() {
    axios
      .delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        enqueueSnackbar("Event deleted successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch(() => {
        enqueueSnackbar("Failed to delete event", {
          variant: "error",
        });
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl my-4">Delete Event</h1>

      <div className="flex flex-col items-center border-2 border-red-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-xl text-center mb-6">
          Are you sure you want to delete this event?
        </h3>

        <button
          className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleDeleteEvent}
        >
          Yes, Delete Event
        </button>
      </div>
    </div>
  );
}

export default DeleteEvent;
