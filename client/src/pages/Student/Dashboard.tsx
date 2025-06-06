import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { API_ROUTES } from "../../utils/apiConfig";

interface StudentData {
  id: number;
  name: string;
  email: string;
}

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_ROUTES.getStudent, {
        withCredentials: true,
      })
      .then((response) => {
        setStudentData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          navigate("/log-in");
        } else {
          console.error("Error: ", err);
        }
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 sm:p-6 md:p-8 flex flex-col">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center border-b pb-2 text-[#9c231b]">
            Student Profile
          </h2>

          {/* User Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-6 mb-6 border-b pb-4">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#9c231b] to-[#253954] text-white font-bold rounded-full mb-4 sm:mb-0 flex items-center justify-center text-5xl">
              CV
            </div>
            <div className="text-center sm:text-left md:mt-9">
              <h3 className="text-lg sm:text-xl font-bold">
                {studentData?.name}
              </h3>
              <p className="text-gray-600">Student ID: {studentData?.id}</p>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Grid Items */}
            <div className="bg-slate-100 p-4 rounded-lg shadow-md">
              <span className="font-semibold text-gray-600">
                <i className="fas fa-calendar-alt mr-2"></i>
                Date of Birth
              </span>
              <div className="text-gray-600 pl-6">Dec 9, 2005</div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-md">
              <span className="font-semibold text-gray-600">
                <i className="fas fa-venus-mars mr-2"></i>
                Gender
              </span>
              <div className="text-gray-600 pl-7">Male</div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-md">
              <span className="font-semibold text-gray-600">
                <i className="fas fa-university mr-2"></i>
                College
              </span>
              <div className="text-gray-600 pl-6">UPG College</div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-md col-span-1 sm:col-span-2 md:col-span-1">
              <span className="font-semibold text-gray-600">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Address
              </span>
              <div className="text-gray-600 pl-4">[Student's Address]</div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-md col-span-1 sm:col-span-2 md:col-span-1">
              <span className="font-semibold text-gray-600">
                <i className="fas fa-mobile-alt mr-2"></i>
                Mobile
              </span>
              <div className="text-gray-600 pl-5">[Student's Mobile]</div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg shadow-md">
              <span className="font-semibold text-gray-600">
                <i className="fas fa-envelope mr-2"></i>
                Email
              </span>
              <div className="text-gray-600 pl-6">{studentData?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
