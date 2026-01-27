// import { Link, useNavigate } from "react-router-dom";

// function Navbar({ user, setUser }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gray-800 p-4 text-white">
//       <div className=" mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-lg font-bold">
//           Event Planner
//         </Link>
//         <div>
//           {user ? (
//             <button
//               onClick={handleLogout}
//               className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <Link className="text-white mx-2 hover:underline" to="/login">
//                 Login
//               </Link>
//               <Link className="text-white mx-2 hover:underline" to="register">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Event Planner
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm text-gray-200">
              <span className="font-semibold">Username:</span> {user.username}
              {" | "}
              <span className="font-semibold">Role: </span>
              <span className="ml-1 px-2 py-1 rounded bg-slate-600 text-xs uppercase">
                {user.role}
              </span>
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="text-white mx-2 hover:underline" to="/login">
                Login
              </Link>
              <Link className="text-white mx-2 hover:underline" to="register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
