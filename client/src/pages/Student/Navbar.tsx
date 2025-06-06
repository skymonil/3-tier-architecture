import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-300 text-gray-950 border-b border-slate-500/30">
      {/* Navbar Header */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button
          onClick={toggleMenu}
          className="text-gray-950 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navbar Menu */}
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex md:space-x-6 bg-gray-300 md:bg-transparent md:p-0 p-4 space-y-4 md:space-y-0 justify-center transition-all duration-300 ease-in-out`}
      >
        <li>
          <NavLink
            to="/student-detail"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 w-full justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-user"></i>
            <span className="ml-2">Student Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admission/form"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-list-ul"></i>
            <span className="ml-2">Admission</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/fee-status"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-file-alt"></i>
            <span className="ml-2">Fee Status</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/practicals"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-pen"></i>
            <span className="ml-2">Practicals</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reexam"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-sync"></i>
            <span className="ml-2">Re-Exam</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/result"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-chart-bar"></i>
            <span className="ml-2">Result</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/scholarship"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-red-600" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-indian-rupee-sign"></i>
            <span className="ml-2">Scholarship</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/grievance"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-red-600" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-exclamation-circle"></i>
            <span className="ml-2">Grievance</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leave"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-calendar-times"></i>
            <span className="ml-2">Leave</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wallet"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
              }`
            }
          >
            <i className="fas fa-wallet mr-2"></i>
            <span>Wallet</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
