import { NavLink } from "react-router-dom"

function Teacher_Navbar() {
  return (
    <nav className="bg-gray-300 text-gray-950 border-b border-slate-500/30 flex justify-center">
        <ul className="flex gap-x-4">
          <li>
            <NavLink
              to="/teacher/mark"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 transition-all duration-300 ${
                  isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
                }`
              }
            >
              <i className="fas fa-exclamation-circle"></i>
              <span className="ml-2">Mark Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/approve"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 transition-all duration-300 ${
                  isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
                }`
              }
            >
              <i className="fas fa-calendar-times"></i>
              <span className="ml-2">Approve Requests</span>
            </NavLink>
          </li>
        </ul>
      </nav>

  )
}

export default Teacher_Navbar
