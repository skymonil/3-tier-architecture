import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { API_ROUTES } from "../../utils/apiConfig";

interface Admin {
  _id: string;
  username: string;
  role: string;
}

const AdminDetails = () => {
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch admins on component load
  useEffect(() => {
    axios
      .get(API_ROUTES.getOtherAdminsCredential, {
        withCredentials: true,
      })
      .then((response) => {
        setAdminData(response.data.admins);
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

  // Handle password update
  const handlePasswordChange = async (adminId: string) => {
    if (!newPassword || !selectedAdmin) return;

    try {
      const response = await axios.post(
        API_ROUTES.updateAdminsPassword,
        { adminId, newPassword },
        { withCredentials: true }
      );

      console.log(response.data.message);
      setMessage("Password updated successfully");
      setTimeout(() => setMessage(null), 3000);

      // Update local state to reflect the change
      setAdminData((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === adminId ? { ...admin, password: "******" } : admin
        )
      );
      setNewPassword("");
      setSelectedAdmin(null);
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update password. Please try again.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Details</h2>

      {/* Admin Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg ">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Admin Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600">
                Password
              </th>
              <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((admin) => (
              <tr key={admin._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {admin.username}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {admin.role}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600 text-center">
                  *******
                </td>

                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => setSelectedAdmin(admin)}
                    className="bg-[#9c231b] text-white px-4 py-1 rounded-md hover:bg-[#502b28] transition-colors duration-200"
                  >
                    Change Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Change Password Section */}
      {selectedAdmin && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">
            Change Password for {selectedAdmin.username}
            Change Password for {selectedAdmin.username}
          </h3>
          <input
            type="password"
            placeholder="New Password"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handlePasswordChange(selectedAdmin._id)}
              className="px-4 py-2 bg-[#9c231b] text-white rounded-md hover:bg-[#502b28] transition-colors duration-200"
            >
              Save Password
            </button>
          </div>
        </div>
      )}
      {message && (
        <div className="mt-4 bg-green-100 text-green-800 p-2 rounded text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
