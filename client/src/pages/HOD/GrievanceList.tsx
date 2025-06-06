import { useEffect, useState } from "react";
import HOD_Navbar from "../../components/HOD/HOD_Navbar";
import axios from "axios";
import Nabar from "../MarksAdmin/Navbar";
import { API_ROUTES } from "../../utils/apiConfig";

interface Grievance {
  _id: string;
  createdAt: string;
  updatedAt: string;
  studentId: string;
  title: string;
  description: string;
  status: string;
}

function GrievanceList() {
  const [isPendingOpen, setPendingOpen] = useState<boolean>(true);
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(API_ROUTES.getGrievances);
      if (response.data.success) {
        console.log(response.data.data);
        setGrievances(response.data.data);
      }
    } catch (error) {
      console.log('Error');
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, [isPendingOpen]);

  const approveGrievance = async (grievanceId: string): Promise<void> => {
    try {
      await axios.put(API_ROUTES.resolveGrievance(grievanceId));
      fetchGrievances();
    } catch (error) {
      console.log('Error');
    }
  };

  const filteredGrievances = grievances.filter((grievance) => grievance.status === (isPendingOpen ? 'Pending' : 'Resolved'));

  return (
    <>
      <Nabar />
      <HOD_Navbar />
      <div className="max-w-screen-lg min-h-screen p-6 shadow-lg m-auto bg-white rounded-lg">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Grievance Addressal</h2>
          <hr className="bg-gray-300 my-3" />
          <div className="flex justify-evenly font-semibold py-4 text-lg text-gray-700">
            <div
              className={`cursor-pointer px-4 py-2 rounded-lg ${isPendingOpen ? 'bg-green-200 border-b-4 border-green-500 text-green-600' : 'hover:bg-gray-200'}`}
              onClick={() => setPendingOpen(true)}
            >
              Pending Grievances
            </div>
            <div
              className={`cursor-pointer px-4 py-2 rounded-lg ${!isPendingOpen ? 'bg-red-200 border-b-4 border-red-500 text-red-600' : 'hover:bg-gray-200'}`}
              onClick={() => setPendingOpen(false)}
            >
              Resolved Grievances
            </div>
          </div>
          <hr className="bg-gray-300 my-2" />
          <div className="flex justify-center">
            {filteredGrievances.length > 0 ? (
              <table className="w-full border-collapse table-auto shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    {isPendingOpen && <th className="py-3 px-6 text-left">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredGrievances.map((grievance) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      key={grievance._id}
                    >
                      <td className="py-4 px-6">{grievance.status === 'Pending' ? grievance.createdAt.split('T')[0] : grievance.updatedAt.split('T')[0]}</td>
                      <td className="py-4 px-6 font-semibold">{grievance.title}</td>
                      <td className="py-4 px-6">{grievance.description}</td>
                      {isPendingOpen && (
                        <td className="py-4 px-6 text-center">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => approveGrievance(grievance._id)}
                          >
                            Resolve
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 py-4 text-xl">No Grievances to {isPendingOpen ? 'Resolve' : 'Show'}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GrievanceList;
