import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { API_ROUTES } from "../../utils/apiConfig";

interface AdminData {
  name: string;
  email: string;
}

const Navbar = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_ROUTES.getAdmin, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setAdminData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          navigate("/admin-login");
        } else {
          console.error("Error: ", err);
        }
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        API_ROUTES.adminLogout,
        {},
        { withCredentials: true }
      );
      console.log("User logged out: ", response.data);
    } catch (error: any) {
      console.error("Error in logging out: ", error);
    }
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <i className="fas fa-user"></i>
        <div className="ml-2 text-lg font-semibold">{adminData?.name}</div>{" "}
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
