import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../utils/apiConfig";

interface Student {
  _id: string;
  name: string;
}

interface Scholarship {
  _id: string;
  name: string;
}

function ApproveScholarship() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchScholarships = async () => {
    try {
      const response = await axios.get(API_ROUTES.getAllScholarships);
      if (response.data.success) {
        setScholarships(response.data.scholarships);
      }
    } catch (error) {
      setErrorMessage('Error fetching scholarships.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleCheck = (studentId: string, isChecked: boolean) => {
    setSelectedStudents((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (isChecked) {
        updatedSelection.add(studentId);
      } else {
        updatedSelection.delete(studentId);
      }
      return updatedSelection;
    });
  };

  const handleScholarshipSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const scholarshipId = event.target.value;
    setSelectedScholarshipId(scholarshipId);

    if (scholarshipId) {
      try {
        const response = await axios.get(API_ROUTES.getScholarshipById(scholarshipId));
        if (response.data) {
          setStudents(response.data.studentsParticipated);
        }
      } catch (error) {
        setErrorMessage('Error fetching students for the selected scholarship.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  const handleApproveClick = async () => {
    const selectedStudentIds = Array.from(selectedStudents);
    try {
      await axios.post(API_ROUTES.approveScholarship, {
        studentIds: selectedStudentIds,
        scholarshipId: selectedScholarshipId
      });
      setSuccessMessage('Students approved successfully.');
      setSelectedScholarshipId(null);
      setStudents([]);
      setScholarships((prev) => prev.filter((scholarship) => scholarship._id !== selectedScholarshipId));
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Error approving students.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="flex flex-col space-y-8 p-8">
      <h1 className="text-3xl font-bold text-gray-800">Approve Scholarship</h1>

      {errorMessage && (
        <div className="mb-4 text-red-500 text-lg">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mb-4 text-green-500 text-lg">{successMessage}</div>
      )}

      <div>
        <label htmlFor="scholarship" className="text-lg font-medium text-gray-700">Select Scholarship</label>
        <select
          id="scholarship"
          className="border border-gray-300 p-3 rounded-lg text-lg block mt-2 px-5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
          onChange={handleScholarshipSelect}
        >
          <option value="">-- Select a Scholarship --</option>
          {scholarships.map((scholarship) => (
            <option key={scholarship._id} value={scholarship._id} className="text-lg">
              {scholarship.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student._id}
              className="flex justify-between items-center border border-gray-300 p-4 mb-3 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 text-lg text-gray-700"
            >
              <div className="flex-1">{student.name}</div>
              <input
                type="checkbox"
                className="h-5 w-5 text-[#9c231b] rounded focus:ring-[#9c231b] focus:ring-2"
                onChange={(e) => handleCheck(student._id, e.target.checked)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No students available for this scholarship.</p>
        )}
      </div>

      {selectedScholarshipId && (
        <div className="flex justify-end">
          <button
            className="bg-green-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={handleApproveClick}
          >
            Approve Selected Students
          </button>
        </div>
      )}
    </div>
  );
}

export default ApproveScholarship;
