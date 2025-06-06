import { NavLink } from "react-router-dom";

function HOD_Navbar() {
  return (
      <nav className="bg-gray-300 text-gray-950 border-b border-slate-500/30 flex justify-center">
        <ul className="flex gap-x-4">
          <li>
            <NavLink
              to="/admin-grievance"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 transition-all duration-300 ${
                  isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
                }`
              }
            >
              <i className="fas fa-exclamation-circle"></i>
              <span className="ml-2">Grievance Addressal</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-leave"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 transition-all duration-300 ${
                  isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
                }`
              }
            >
              <i className="fas fa-calendar-times"></i>
              <span className="ml-2">Leave Approval</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-scholarship"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 transition-all duration-300 ${
                  isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
                }`
              }
            >
              <i className="fas fa-graduation-cap"></i>
              <span className="ml-2">Handle Scholarships</span>
            </NavLink>
          </li>
        </ul>
      </nav>
  );
}

export default HOD_Navbar;
