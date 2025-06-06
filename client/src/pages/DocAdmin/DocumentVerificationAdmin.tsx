import React, { useState, useEffect } from "react";
import Navbar from "../MarksAdmin/Navbar";
import axios from "axios";
import { API_ROUTES } from "../../utils/apiConfig";

type Student = {
  address: string;
  collegeId: string;
  course: string;
  createdAt: string;
  dob: string;
  documents: string[];
  fullName: string;
  gender: string;
  lastInstitution: string;
  parentName: string;
  parentPhone: string;
  phone: string;
  score: number;
  status: string;
  studentId: string;
  updatedAt: string;
  walletBalance: number;
  __v: number;
  _id: string;
};


const DocumentVerificationAdmin: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Fetch students data from an API (mocked here for demonstration)
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(API_ROUTES.getStudentsDetails, {
          withCredentials: true,
        })
        .then((response) => {
          setStudents(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    };

    fetchData();
  }, []);

  const handleApprove = (id: string) => {
    setStudents((prev) => prev.filter((student) => student._id !== id));
    setSelectedStudent(null);
  };

  const handleReject = (id: string) => {
    setStudents((prev) => prev.filter((student) => student._id !== id));
    setSelectedStudent(null);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mt-4 p-4">Document Verification</h1>

      {/* Student List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {students.map((student) => (
          <div
            key={student._id}
            className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <h2 className="text-lg font-semibold">{student.fullName}</h2>
            <div className="mt-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprove(student._id);
                }}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject(student._id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Student Details Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Admission Form</h2>
            <p>
              <strong>Full Name:</strong> {selectedStudent.fullName}
            </p>
            <p>
              <strong>Gender:</strong> {selectedStudent.gender}
            </p>
            <p>
              <strong>Parent Name:</strong> {selectedStudent.parentName}
            </p>
            <p>
              <strong>Address:</strong> {selectedStudent.address}
            </p>
            <p>
              <strong>Contact Number:</strong> {selectedStudent.phone}
            </p>
            <p>
              <strong>Parent Number:</strong> {selectedStudent.parentPhone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {selectedStudent.dob}
            </p>
            <p>
              <strong>Last Institution:</strong> {selectedStudent.lastInstitution}
            </p>
            <p>
              <strong>Percentage:</strong> {selectedStudent.score}%
            </p>

            <h3 className="text-lg font-semibold mt-4">Documents</h3>
            <ul className="list-disc pl-4">
              {selectedStudent.documents.map((doc, index) => (
                <li key={index}>
                  <a href={doc} target="_blank" rel="noreferrer">
                    Document {index + 1}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleApprove(selectedStudent._id)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleReject(selectedStudent._id)}
              >
                Reject
              </button>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedStudent(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVerificationAdmin;
