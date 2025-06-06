import { useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../../utils/apiConfig";

interface FeeStructure {
  [course: string]: {
    baseFee: number;
    eligibility: string;
    subjects: {
      name: string;
      minMarks: number;
      maxMarks: number;
    }[];
  };
}

const CollegeDetails = () => {
  const [collegeID, setCollegeID] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeAddress, setCollegeAddress] = useState("");
  const [feeStructure, setFeeStructure] = useState<FeeStructure>({});
  const [newCourse, setNewCourse] = useState("");
  const [baseFee, setBaseFee] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [minMarks, setMinMarks] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [_message, setMessage] = useState("");
  const [_messageType, setMessageType] = useState("");
  const [newGlobalFeeName, setNewGlobalFeeName] = useState("");
  const [newGlobalFeeAmount, setNewGlobalFeeAmount] = useState("");
  const [globalFees, setGlobalFees] = useState<{ [key: string]: number }>({});

  const handleAddCourse = () => {
    if (
      newCourse.trim() &&
      baseFee.trim() &&
      !isNaN(Number(baseFee)) &&
      eligibility.trim()
    ) {
      setFeeStructure((prev) => ({
        ...prev,
        [newCourse]: {
          baseFee: parseInt(baseFee),
          eligibility,
          subjects: [],
        },
      }));
      setNewCourse("");
      setBaseFee("");
      setEligibility("");
    } else {
      setMessageType("error");
      setMessage("Please enter valid course name, base fee, and eligibility.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddSubjectToCourse = (course: string) => {
    if (
      newSubject.trim() &&
      minMarks.trim() &&
      maxMarks.trim() &&
      !isNaN(Number(minMarks)) &&
      !isNaN(Number(maxMarks))
    ) {
      setFeeStructure((prev) => {
        const updatedCourse = { ...prev[course] };

        // Avoid duplicate subject entries
        if (
          updatedCourse.subjects.some((subject) => subject.name === newSubject)
        ) {
          setMessageType("error");
          setMessage("This subject already exists for the course.");
          setTimeout(() => setMessage(""), 3000);
          return prev;
        }

        updatedCourse.subjects = [
          ...updatedCourse.subjects,
          {
            name: newSubject,
            minMarks: parseInt(minMarks),
            maxMarks: parseInt(maxMarks),
          },
        ];
        setMessageType("success");
        setMessage("Subject added successfully!");
        setTimeout(() => setMessage(""), 3000);
        return { ...prev, [course]: updatedCourse };
      });

      setNewSubject("");
      setMinMarks("");
      setMaxMarks("");
    } else {
      setMessageType("error");
      setMessage(
        "Please enter valid subject name, minimum marks, and maximum marks."
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddGlobalFee = () => {
    if (
      newGlobalFeeName.trim() &&
      newGlobalFeeAmount.trim() &&
      !isNaN(Number(newGlobalFeeAmount))
    ) {
      setGlobalFees((prev) => ({
        ...prev,
        [newGlobalFeeName]: parseInt(newGlobalFeeAmount),
      }));
      setNewGlobalFeeName("");
      setNewGlobalFeeAmount("");
    } else {
      setMessageType("error");
      setMessage("Please enter valid fee amount.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSaveCollege = async (e: any) => {
    e.preventDefault();

    const courses = Object.entries(feeStructure).map(
      ([courseName, details]) => ({
        courseName,
        baseFee: details.baseFee,
        eligibility: details.eligibility,
        subjects: details.subjects,
      })
    );

    const collegeData = {
      collegeID,
      collegeName,
      address: collegeAddress,
      globalFees: Object.entries(globalFees).map(([title, amount]) => ({
        title,
        amount,
      })),
      courses,
    };

    try {
      const response = await axios.post(
        API_ROUTES.addCollege,
        collegeData
      );
      console.log("College added successfully: ", response.data);
    } catch (error: any) {
      console.error("Error saving college details:", error);
      setMessageType("error");
      setMessage("Error saving college details. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">College Details</h2>

      {/* College Info */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College ID:
        </label>
        <input
          type="text"
          value={collegeID}
          onChange={(e) => setCollegeID(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#9c231b] w-full"
        />
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College Name:
        </label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#9c231b] w-full"
        />
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College Address:
        </label>
        <input
          type="text"
          value={collegeAddress}
          onChange={(e) => setCollegeAddress(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#9c231b] w-full"
        />
      </div>
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Global Fees:
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Fee Name"
            value={newGlobalFeeName}
            onChange={(e) => setNewGlobalFeeName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#9c231b] w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newGlobalFeeAmount}
            onChange={(e) => setNewGlobalFeeAmount(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#9c231b] w-full"
          />
          <button
            onClick={handleAddGlobalFee}
            className="p-3 bg-[#9c231b] text-white rounded-lg hover:bg-[#502b28] w-2/5"
          >
            Add Fee
          </button>
        </div>
      </div>
      
      {Object.keys(globalFees).length > 0 && (
        <div className="mt-6 border border-gray-300 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Global Fees</h3>
          <ul className="list-disc list-inside">
            {Object.entries(globalFees).map(([feeName, amount]) => (
              <li key={feeName} className="text-gray-700">
                {feeName}: ₹{amount}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Course */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Add Course:
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c231b] w-full"
          />
          <input
            type="number"
            placeholder="Base Fee"
            value={baseFee}
            onChange={(e) => setBaseFee(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c231b] w-full"
          />
          <input
            type="text"
            placeholder="Eligibility"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c231b] w-full"
          />
          <button
            onClick={handleAddCourse}
            className="p-3 bg-[#9c231b] text-white rounded-lg hover:bg-[#502b28] w-3/5"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* List Courses and Add Subjects */}
      {Object.entries(feeStructure).map(([course, details]) => (
        <div
          key={course}
          className="mt-6 border border-gray-300 p-4 rounded-lg"
        >
          <h3 className="text-xl font-bold text-gray-700 mb-4">{course}</h3>
          <p className="text-gray-700">Base Fee: ₹{details.baseFee}</p>
          <p className="text-gray-700">Eligibility: {details.eligibility}</p>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Add Subject to {course}:
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Subject Name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c231b] w-full"
              />
              <input
                type="number"
                placeholder="Passing Marks"
                value={minMarks}
                onChange={(e) => setMinMarks(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c231b] w-full"
              />
              <input
                type="number"
                placeholder="Max Marks"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c231b] w-full"
              />
              <button
                onClick={() => handleAddSubjectToCourse(course)}
                className="p-3 bg-[#9c231b] text-white rounded-lg hover:bg-[#502b28] w-3/5"
              >
                Add Subject
              </button>
            </div>
            <ul className="mt-4">
              {details.subjects.map((subject, index) => (
                <li key={index} className="text-gray-700">
                  - {subject.name} (Passing: {subject.minMarks}, Max:{" "}
                  {subject.maxMarks})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Save College Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveCollege}
          className="px-6 py-3 bg-[#9c231b] text-white rounded-lg hover:bg-[#502b28] transition-colors w-full"
        >
          Save College
        </button>
      </div>
    </div>
  );
};

export default CollegeDetails;
