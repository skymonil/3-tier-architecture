import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStudent } from "../context/StudentContext";
import { Loader2 } from "lucide-react";
import { API_ROUTES } from "../utils/apiConfig";

interface StudentData {
  name: string;
  email: string;
}

const Navbar = () => {
  const { setStudentId } = useStudent();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_ROUTES.getStudent, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setStudentData(response.data);
        setStudentId(response.data.id);
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

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        API_ROUTES.studentLogout,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      console.log("User logged out: ", response.data);
    } catch (error: any) {
      console.error("Error in logging out: ", error);
    }
    navigate("/log-in");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="flex justify-between w-full items-center bg-[#053f64] text-white p-4">
      <div className="flex items-center">
        <i className="fas fa-user"></i>
        <div className="ml-2 text-lg font-semibold">
          {studentData?.name}
        </div>{" "}
        {/* Name */}
      </div>
      <button
        className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
        onClick={handleLogout}
      >
        <i className="fas fa-right-from-bracket"></i>
        <span className="ml-2">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
