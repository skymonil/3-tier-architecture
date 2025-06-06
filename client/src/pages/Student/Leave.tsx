import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useStudent } from "../../context/StudentContext";
import axios from "axios";
import { API_ROUTES } from "../../utils/apiConfig";

interface leave {
  _id: string,
  startDate: string,
  endDate: string,
  reason: string,
  status: string
}

const Leave = () => {
  const { studentId } = useStudent();
  const [leaveHistory, setLeaveHistory] = useState<leave[]>([]);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    if (studentId) {
      const fetchLeaves = async () => {
        try {
          console.log(studentId);
          const response = await axios.get(API_ROUTES.getLeaveById(studentId));
          if (response.data) {
            console.log(response.data.leaves)
            setLeaveHistory(response.data.leaves);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchLeaves();
    }
  }, [studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      const response = await axios.post(API_ROUTES.addLeave, {
        studentId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      });

      if (response.data) {
        const newLeave = response.data.leave;
        setLeaveHistory((prev) => [...prev, newLeave]);
        setFormData({ startDate: "", endDate: "", reason: "" });
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch (error:any) {
      setErrorMessage("Unknown Error Occured Please Try Again");
      setTimeout(() => {
        setErrorMessage('')
      }, 3000); // Set error message
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
          {/* Page Header */}
          <div className="border-b pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-center text-[#9c231b]">
              Leave Application
            </h1>
          </div>

          {/* Leave Application Form */}
          <form className="mb-8" onSubmit={handleSubmit}>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Apply for Leave
            </h2>
            {showMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                Leave application submitted successfully!
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Reason for Leave
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                rows={4}
                placeholder="Enter the reason for your leave"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#9c231b] text-white px-4 py-2 rounded-lg hover:bg-[#502b28] w-full sm:w-auto"
            >
              Submit Application
            </button>
          </form>

          {/* Leave History */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Leave History
            </h2>
            <div className="overflow-x-auto">
              {leaveHistory && leaveHistory.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 sm:px-4 py-2 text-left">
                        Date
                      </th>
                      <th className="border px-2 sm:px-4 py-2 text-left">
                        Reason
                      </th>
                      <th className="border px-2 sm:px-4 py-2 text-left">
                        Status
                      </th>
                      <th className="border px-2 sm:px-4 py-2 text-left">
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveHistory.map((leave) => (
                      <tr key={leave._id}>
                        <td className="border px-2 sm:px-4 py-2">
                          {leave.startDate.split('T')[0]} - {leave.endDate.split('T')[0]}
                        </td>
                        <td className="border px-2 sm:px-4 py-2">
                          {leave.reason}
                        </td>
                        <td
                          className={`border px-2 sm:px-4 py-2 ${leave.status === "Approved"
                              ? "text-green-600"
                              : leave.status === "Rejected"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                        >
                          {leave.status}
                        </td>
                        <td className="border px-2 sm:px-4 py-2">
                          N/A
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-gray-500 text-lg text-center">No Leave Request History Exists</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
