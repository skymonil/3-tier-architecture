import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useStudent } from "../../context/StudentContext";
import { API_ROUTES } from "../../utils/apiConfig";

const Grievance = () => {
  const { studentId } = useStudent();
  const [grievanceHistory, setGrievanceHistory] = useState<{
    date: string;
    title: string;
    status: string;
  }[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get(API_ROUTES.getGrievanceStudents(studentId));
        if (response.data.success) {
          setGrievanceHistory(response.data.data);
        }
      } catch (error) {
        console.log('Error Occured While Fetching Grievance '+error)
      }
    };
    if (studentId) {
      fetchGrievances();
    }
  }, [studentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(API_ROUTES.addGrievance, {
        studentId,
        title: formData.title,
        details: formData.details
      });

      const newGrievance = {
        date: new Date().toISOString().split('T')[0],
        title: formData.title,
        status: "Pending",
      };

      setGrievanceHistory((prev) => [...prev, newGrievance]);
      setFormData({ title: "", details: "" });
      setShowMessage(true);
      setShowErrorMessage(null); 
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      setShowErrorMessage("Error occurred while submitting the grievance.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-center text-[#9c231b]">
              Grievance Redressal
            </h1>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Grievance Redressal Form
          </h2>
          <form onSubmit={handleSubmit}>
            {showMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                Grievance submitted successfully!
              </div>
            )}
            {showErrorMessage && (
              <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                {showErrorMessage}
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="grievanceTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="grievanceTitle"
                name="title"
                type="text"
                placeholder="Enter the title of your grievance"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="grievanceDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Details
              </label>
              <textarea
                id="grievanceDetails"
                name="details"
                rows={4}
                placeholder="Provide details about your grievance"
                value={formData.details}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-[#9c231b] text-white px-4 py-2 rounded-lg hover:bg-[#502b28] w-full sm:w-auto"
              >
                Submit Grievance
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Grievance History</h2>
            {
              grievanceHistory.length === 0 ? (
                <div className="flex text-gray-600 justify-center text-lg">No Grievance History Found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="py-2 px-4 text-left border-b">Date</th>
                        <th className="py-2 px-4 text-left border-b">Title</th>
                        <th className="py-2 px-4 text-left border-b">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grievanceHistory.map((grievance, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{grievance.date}</td>
                          <td className="py-2 px-4 border-b">{grievance.title}</td>
                          <td
                            className={`py-2 px-4 border-b ${
                              grievance.status === "Resolved"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {grievance.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievance;
