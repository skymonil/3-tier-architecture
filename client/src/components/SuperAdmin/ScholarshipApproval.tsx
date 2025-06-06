import axios from "axios";
import { useEffect, useState } from "react";

interface Student {
  _id: string;
  name: string;
}

interface Scholarship {
  _id: string;
  name: string;
  approvedStudents: Student[];
}

const ScholarshipApproval = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const handleScholarshipChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const scholarshipId = event.target.value;
    const selected = scholarships.find(scholarship => scholarship._id === scholarshipId) || null;
    setSelectedScholarship(selected);

    // Fetch students for the selected scholarship
    if (selected) {
      setStudents(selected.approvedStudents);
    }
  };

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/scholarship/fetch-all/Pending');
        if (response.data.success) {
          setScholarships(response.data.scholarships);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchScholarships();
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Scholarship Approval
      </h2>

      {/* Scholarship Selection */}
      <div className="mb-4">
        <label htmlFor="scholarship-select" className="block text-sm font-medium text-gray-700">
          Select Scholarship
        </label>
        <select
          id="scholarship-select"
          value={selectedScholarship ? selectedScholarship._id : ''}
          onChange={handleScholarshipChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Scholarship</option>
          {scholarships.map((scholarship) => (
            <option key={scholarship._id} value={scholarship._id}>
              {scholarship.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Student Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {student.name}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  Pending To Pay
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pay Now Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ScholarshipApproval;
