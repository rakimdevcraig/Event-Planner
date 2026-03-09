import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import DeleteEvent from "./pages/DeleteEvent";
import EditEvent from "./pages/EditEvent";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUser(res.data);
        })
        .catch(err => {
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/events/create"
          element={user ? <CreateEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/events/details/:id"
          element={
            user ? <EventDetails user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/events/edit/:id"
          element={user ? <EditEvent /> : <Navigate to="/login" />}
        />

        <Route
          path="/events/delete/:id"
          element={user ? <DeleteEvent /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
