import { useEffect, useState } from "react";
import HOD_Navbar from "../../components/HOD/HOD_Navbar";
import axios from "axios";
import Navbar from "../MarksAdmin/Navbar";
import { API_ROUTES } from "../../utils/apiConfig";

interface Leave {
  _id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

function LeaveApproval() {
  const [leave, setLeave] = useState<Leave[]>([]);
  const [selected, setSelected] = useState<string>("Pending");

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(API_ROUTES.getLeaves);
      if (response.data.success) {
        setLeave(response.data.leaves);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      <Navbar />
      <HOD_Navbar />
      <div className="max-w-5xl min-h-96 shadow-xl m-auto p-6 bg-white rounded-lg">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Leave Approval</h1>
        </div>
        <div className="flex justify-evenly text-xl py-4">
          <div
            onClick={() => setSelected("Pending")}
            className={`cursor-pointer px-6 py-2 rounded-lg transition-all ${selected === "Pending"
                ? "text-blue-600 bg-blue-100 border-b-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            Pending
          </div>
          <div
            onClick={() => setSelected("Rejected")}
            className={`cursor-pointer px-6 py-2 rounded-lg transition-all ${selected === "Rejected"
                ? "text-red-600 bg-red-100 border-b-4 border-red-600"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            Rejected
          </div>
          <div
            onClick={() => setSelected("Approved")}
            className={`cursor-pointer px-6 py-2 rounded-lg transition-all ${selected === "Approved"
                ? "text-green-600 bg-green-100 border-b-4 border-green-600"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            Approved
          </div>
        </div>
        {leave
          .filter((leave) => leave.status === selected)
          .map((leave) => (
            <LeaveTemplate key={leave._id} leave={leave} fetchLeaves={fetchLeaves} />
          ))}
      </div>
    </>
  );
}

const LeaveTemplate = ({ leave, fetchLeaves }: { leave: Leave; fetchLeaves: () => void }) => {
  const handleApproval = async (leaveId: string) => {
    try {
      await axios.put(API_ROUTES.approveLeave(leaveId));
      fetchLeaves();
    } catch (error) {
      console.log("Error");
    }
  };

  const handleRejection = async (leaveId: string) => {
    try {
      await axios.put(API_ROUTES.rejectLeave(leaveId));
      fetchLeaves();
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="p-4 border-t border-b border-gray-300 rounded-lg space-y-4 my-6 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <span className="font-semibold">Leave ID: </span>
        <span>{leave._id}</span>
      </div>
      <div>
        <span className="font-semibold">Starting From: </span>
        <span>{leave.startDate.split("T")[0]}</span>
      </div>
      <div>
        <span className="font-semibold">Till: </span>
        <span>{leave.endDate.split("T")[0]}</span>
      </div>
      <div>
        <span className="font-semibold">Description: </span>
        <span>{leave.reason}</span>
      </div>
      <div className={`space-x-5 font-semibold py-3 ${(leave.status === "Pending") ? "flex" : "hidden"}`}>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => handleApproval(leave._id)}
        >
          Approve Leave
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => handleRejection(leave._id)}
        >
          Reject Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveApproval;
