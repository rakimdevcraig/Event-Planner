import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GeneralEventInfo from "../components/GeneralEventInfo";
import ViewStaff from "../components/ViewStaff";
import AddStaffForm from "../components/AddStaffForm";
import ViewEquipment from "../components/ViewEquipment";
import AddEquipment from "../components/AddEquipment";
import ViewBar from "../components/ViewBar";
import AddBar from "../components/AddBar";
import AddFeedback from "../components/AddFeedback";
import SidebarLink from "../components/SidebarLink";
import ViewFood from "../components/ViewFood";
import AddFood from "../components/AddFood";
import ViewFeedback from "../components/ViewFeedback";

function EventDetails({ user }) {
  const { id } = useParams();
  console.log(user);

  const [event, setEvent] = useState(null);
  const [view, setView] = useState(null);

  const fetchEvent = () => {
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (!event) {
    return <div className="p-6">Loading event...</div>;
  }

  const components = {
    eventHome: <GeneralEventInfo event={event} />,
    viewStaff: <ViewStaff staff={event.staff} />,
    addStaff: <AddStaffForm eventId={id} onStaffAdded={fetchEvent} />,
    viewEquipment: <ViewEquipment equipment={event.equipment} />,
    addEquipment: <AddEquipment eventId={id} onEquipmentAdded={fetchEvent} />,
    viewBar: <ViewBar bar={event.bar} />,
    addBar: <AddBar eventId={id} onBarAdded={fetchEvent} />,
    addFeedback: <AddFeedback eventId={id} onFeedbackAdded={fetchEvent} />,
    viewFeedback: <ViewFeedback feedback={event.feedback} />,
    viewFood: <ViewFood food={event.food} />,
    addFood: <AddFood eventId={id} onFoodSaved={fetchEvent} />,
  };

  function handleViewSwitch(e) {
    const selectedView = e.currentTarget.dataset.view;
    setView(selectedView);
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>

        <ul className="space-y-2">
          <SidebarLink
            label="Event Home"
            view="eventHome"
            onClick={handleViewSwitch}
          />
          <SidebarLink
            label="View Staff"
            view="viewStaff"
            onClick={handleViewSwitch}
          />
          {user.role === "admin" && (
            <SidebarLink
              label="Add Staff"
              view="addStaff"
              onClick={handleViewSwitch}
            />
          )}
          <SidebarLink
            label="View Equipment"
            view="viewEquipment"
            onClick={handleViewSwitch}
          />
          {(user.role === "equipment" || user.role === "admin") && (
            <SidebarLink
              label="Add Equipment"
              view="addEquipment"
              onClick={handleViewSwitch}
            />
          )}
          <SidebarLink
            label="View Bar Items"
            view="viewBar"
            onClick={handleViewSwitch}
          />
          {(user.role === "bar" || user.role === "admin") && (
            <SidebarLink
              label="Add Bar Item"
              view="addBar"
              onClick={handleViewSwitch}
            />
          )}
          {(user.role === "food" || user.role === "admin") && (
            <SidebarLink
              label="Add Food"
              view="addFood"
              onClick={handleViewSwitch}
            />
          )}
          <SidebarLink
            label="View Food"
            view="viewFood"
            onClick={handleViewSwitch}
          />
          {user.role === "admin" && (
            <SidebarLink
              label="Add Feedback"
              view="addFeedback"
              onClick={handleViewSwitch}
            />
          )}
          <SidebarLink
            label="View Feedback"
            view="viewFeedback"
            onClick={handleViewSwitch}
          />
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {view ? components[view] : <GeneralEventInfo event={event} />}
      </main>
    </div>
  );
}

export default EventDetails;
