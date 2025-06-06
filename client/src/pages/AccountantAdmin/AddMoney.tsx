import { useState } from "react";
import Navbar from "../MarksAdmin/Navbar";

interface Course {
    courseId: string;
    courseName: string;
}

interface Student {
    studentCourse: string;
    studentName: string;
    studentId: string;
    walletBalance: number;
}

function AddMoney() {
    const [courses] = useState<Course[]>([
        { courseId: "C001", courseName: "BSCIT" },
        { courseId: "C002", courseName: "BMS" },
        { courseId: "C003", courseName: "BMM" },
    ]);

    const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
    const [students] = useState<Student[]>([
        { studentId: "S001", studentName: "Akshat", studentCourse: "BSCIT", walletBalance: 2000 },
        { studentId: "S001", studentName: "Chirag", studentCourse: "BSCIT", walletBalance: 2000 },
        { studentId: "S001", studentName: "Aditya", studentCourse: "BSCIT", walletBalance: 2000 },
        { studentId: "S001", studentName: "Aryan", studentCourse: "BMS", walletBalance: 2000 },
        { studentId: "S001", studentName: "Monil", studentCourse: "BMS", walletBalance: 2000 },
        { studentId: "S001", studentName: "Yash", studentCourse: "BMS", walletBalance: 2000 },
        { studentId: "S001", studentName: "Suren", studentCourse: "BMM", walletBalance: 2000 },
        { studentId: "S001", studentName: "Sarvagya", studentCourse: "BMM", walletBalance: 2000 },
        { studentId: "S001", studentName: "Krishna", studentCourse: "BMM", walletBalance: 2000 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [funds, setFunds] = useState("");

    const handleChange = (course: Course) => {
        setSelectedCourse(course);
    };

    const handleAddFundsClick = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setFunds("");
    };

    const handleFundsSubmit = () => {
        console.log(`Funds added: ${funds} for student: ${selectedStudent?.studentName}`);
        handleModalClose();
    };

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 mt-6 shadow-lg shadow-gray-400 bg-white rounded-lg">
                <Navbar />
                <h1 className="text-3xl font-semibold text-center mt-6 text-gray-800 mb-6">
                    Add Money to Wallet
                </h1>

                <form className="mb-6">
                    <div className="text-xl font-medium text-gray-700 mb-4">Select Course</div>
                    <div className="space-y-4">
                        {courses.map((course, index) => (
                            <div className="flex items-center space-x-3" key={course.courseId}>
                                <input
                                    type="radio"
                                    name="course"
                                    id={`course-${index}`}
                                    onChange={() => handleChange(course)}
                                    className="h-5 w-5"
                                />
                                <label htmlFor={`course-${index}`} className="text-lg text-gray-700">
                                    {course.courseName}
                                </label>
                            </div>
                        ))}
                    </div>
                </form>

                {selectedCourse && (
                    <div className="mb-6 text-lg text-gray-700">
                        <strong>Selected Course:</strong> {selectedCourse.courseName}
                    </div>
                )}

                <div className="space-y-4">
                    {students
                        .filter((student) => student.studentCourse === selectedCourse?.courseName)
                        .map((student) => (
                            <div
                                key={student.studentId}
                                className="border border-gray-300 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="space-y-2">
                                        <div className="font-medium text-gray-800">Name: {student.studentName}</div>
                                        <div className="text-gray-600">Course: {student.studentCourse}</div>
                                    </div>
                                    <button
                                        onClick={() => handleAddFundsClick(student)}
                                        className="bg-green-500 px-6 py-2 text-white rounded-lg hover:bg-green-600 transition"
                                    >
                                        Add Funds
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h2 className="text-2xl font-semibold mb-4">Add Funds</h2>
                            <p className="text-gray-600 mb-4">
                                Adding funds for <strong>{selectedStudent?.studentName}</strong>
                            </p>
                            <p className="text-gray-600 mb-4">
                                Available Balance: {selectedStudent?.walletBalance}
                            </p>
                            <input
                                type="number"
                                value={funds}
                                onChange={(e) => setFunds(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleModalClose}
                                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleFundsSubmit}
                                    className="bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    Add Funds
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddMoney;