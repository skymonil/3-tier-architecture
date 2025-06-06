import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useStudent } from "../../context/StudentContext";
import { API_ROUTES } from "../../utils/apiConfig";

type Scholarship = {
  _id: string;
  name: string;
  amount: string;
  examDate: string;
};

const Scholarship: React.FC = () => {
  const { studentId } = useStudent();
  const [activeScholarships, setActiveScholarships] = useState<Scholarship[]>([]);

  const [appliedScholarships, setAppliedScholarships] = useState<Scholarship[]>(
    []
  );
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);


  const fetchActiveScholarShips = async () => {
    try {
      const response = await axios.get(API_ROUTES.getStudentNotAppliedForScholarship(studentId));
      if (response.data.success) {
        setActiveScholarships(response.data.scholarships);
      }
    }
    catch (error) {
      console.log('Error')
    }
  }

  const fetchAppliedScholarships = async () => {
    try {
      const response = await axios.get(API_ROUTES.getStudentAppliedForScholarship(studentId));
      if (response.data.success) {
        setAppliedScholarships(response.data.scholarships);
      }
    }
    catch (error) {
      console.log('Error');
    }
  }

  useEffect(() => {

    fetchActiveScholarShips()
    fetchAppliedScholarships()
  }, [studentId])

  const handleApply = async (scholarshipId: string) => {
    try {
      const response = await axios.post(API_ROUTES.getScholarshipParticipation, {
        studentId,
        scholarshipId
      });
      if (response.data) {
        setConfirmationMessage(response.data.message);

        // First, update active scholarships
        setActiveScholarships((prevActiveScholarships) =>
          prevActiveScholarships.filter((s) => s._id !== scholarshipId)
        );

        // Then, update applied scholarships
        setAppliedScholarships((prevAppliedScholarships) => {
          const scholarshipToAdd = activeScholarships.find(
            (scholarship) => scholarship._id === scholarshipId
          );
          if (scholarshipToAdd) {
            return [...prevAppliedScholarships, scholarshipToAdd];
          }
          return prevAppliedScholarships;
        });

        // Reset the selected scholarship
        setSelectedScholarship(null);
        setTimeout(() => {
          setConfirmationMessage('');
        }, 3000);
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#9c231b] pb-3 border-b border-gray-200">
            Scholarships
          </h2>

          {confirmationMessage && (
            <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
              {confirmationMessage} Be Ready For Exam on Specified Date
            </div>
          )}

          {/* Active Scholarships Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Active Scholarships</h3>
            {activeScholarships.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b py-2">Title</th>
                    <th className="border-b py-2">Amount</th>
                    <th className="border-b py-2">Test Date</th>
                    <th className="border-b py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeScholarships.map((scholarship) => (
                    <tr key={scholarship._id}>
                      <td className="py-2 border-b">{scholarship.name}</td>
                      <td className="py-2 border-b">{scholarship.amount}</td>
                      <td className="py-2 border-b">{scholarship.examDate.split('T')[0]}</td>
                      <td className="py-2 border-b">
                        <button
                          className="bg-[#9c231b] text-white py-1 px-3 rounded hover:bg-[#502b28]"
                          onClick={() => setSelectedScholarship(scholarship)}
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No active scholarships available.</p>
            )}
          </div>

          {/* Applied Scholarships Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Applied Scholarships</h3>
            {appliedScholarships.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b py-2">Title</th>
                    <th className="border-b py-2">Amount</th>
                    <th className="border-b py-2">Test Date</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedScholarships.map((scholarship) => (
                    <tr key={scholarship._id}>
                      <td className="py-2 border-b">{scholarship.name}</td>
                      <td className="py-2 border-b">{scholarship.amount}</td>
                      <td className="py-2 border-b">{scholarship.examDate.split('T')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">
                You have not applied for any scholarships yet.
              </p>
            )}
          </div>

          {/* Scholarship Guidelines Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Scholarship Guidelines
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Once applied, you must attend the scholarship test offline at
                the specified date.
              </li>
              <li>
                The application fee will be ₹50 for each scholarship and will be
                deducted from your payment wallet.
              </li>
              <li>
                The scholarship amount will be rewarded only to the
                top-performing students.
              </li>
              <li>
                The reward will be added directly to your payment wallet on the
                portal.
              </li>
              <li>Reach out to us for any additional queries.</li>
            </ul>
          </div>
        </div>
      </div>
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Payment</h3>
            <p className="text-gray-700 mb-4">
              The fee of <strong>50</strong> for{" "}
              <strong>{selectedScholarship.name}</strong> will be deducted
              from your wallet.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-800 py-1 px-4 rounded hover:bg-gray-400"
                onClick={() => setSelectedScholarship(null)}
              >
                Cancel
              </button>
              <button
                className="bg-[#9c231b] text-white py-1 px-4 rounded hover:bg-[#502b28]"
                onClick={() => handleApply(selectedScholarship._id)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholarship;
