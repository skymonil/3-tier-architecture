import { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStudent } from "../../context/StudentContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import jsPDF AutoTable plugin
import { Loader2 } from "lucide-react";
import { API_ROUTES } from "../../utils/apiConfig";

interface Subject {
  name: string;
  maxMarks: number;
  obtainedMarks: number;
  grade?: string;
}

interface StudentData {
  id: string;
  name: string;
  email: string;
}

const Result = () => {
  const { setStudentId } = useStudent();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      name: "Java Programming",
      maxMarks: 100,
      obtainedMarks: 76,
      grade: "A+",
    },
    {
      name: "Embedded Systems",
      maxMarks: 100,
      obtainedMarks: 88,
      grade: "A",
    },
    {
      name: "Computer Graphics",
      maxMarks: 100,
      obtainedMarks: 92,
      grade: "A+",
    },
    {
      name: "Software Engineering",
      maxMarks: 100,
      obtainedMarks: 87,
      grade: "A",
    },
    {
      name: "Quantitative Techniques",
      maxMarks: 100,
      obtainedMarks: 95,
      grade: "A+",
    },
  ]);
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [grade, setGrade] = useState<string>("A+");
  const [status, setStatus] = useState<string>("PASS");
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(API_ROUTES.getStudent, { withCredentials: true })
      .then((response) => {
        setStudentData(response.data);
        setStudentId(response.data.id);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          navigate("/log-in");
        } else {
          console.error("Error: ", err);
        }
      });
  }, [navigate, setStudentId]);

  useEffect(() => {
    if (studentData) {
      calculateSummary();
    }
  }, [studentData]);

  const calculateSummary = () => {
    let total = 0;
    let max = 0;
    let isFail = false;

    const updatedSubjects = subjects.map((subject) => {
      const grade = calculateGrade(subject.obtainedMarks, subject.maxMarks);
      total += subject.obtainedMarks;
      max += subject.maxMarks;

      if (grade === "F") isFail = true;

      return { ...subject, grade };
    });

    setSubjects(updatedSubjects);
    setTotalMarks(total);

    const perc = (total / max) * 100;
    setPercentage(perc);

    const overallGrade = getOverallGrade(perc);
    setGrade(overallGrade);
    setStatus(isFail ? "FAIL" : "PASS");
  };

  const calculateGrade = (obtainedMarks: number, maxMarks: number): string => {
    const percentage = (obtainedMarks / maxMarks) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const getOverallGrade = (perc: number): string => {
    if (perc >= 90) return "A+";
    if (perc >= 80) return "A";
    if (perc >= 70) return "B";
    if (perc >= 60) return "C";
    return "D";
  };

  const handleDownloadPDF = () => {
    if (resultRef.current) {
      const doc = new jsPDF();

      // Adding header information
      doc.setFontSize(18);
      doc.text("Student Result", 14, 20);
      doc.setFontSize(12);
      doc.text(`Student Name: ${studentData?.name}`, 14, 30);
      doc.text(`Student ID: ${studentData?.id}`, 14, 35);
      doc.text(`Course: B.Sc. Information Technology`, 14, 40);

      // Summary
      doc.text(
        `Total Marks: ${totalMarks}/${subjects.reduce(
          (acc, subject) => acc + subject.maxMarks,
          0
        )}`,
        14,
        50
      );
      doc.text(`Percentage: ${percentage.toFixed(2)}%`, 14, 55);
      doc.text(`Grade: ${grade}`, 14, 60);
      doc.text(`Status: ${status}`, 14, 65);

      // Table for subjects
      const tableData = subjects.map((subject) => [
        subject.name,
        subject.maxMarks.toString(),
        subject.obtainedMarks.toString(),
        subject.grade || "N/A",
      ]);

      autoTable(doc, {
        startY: 70,
        head: [["Subject", "Max Marks", "Marks Obtained", "Grade"]],
        body: tableData,
      });

      // Notes
      const finalY = (doc as any).lastAutoTable?.finalY || 70;
      doc.text("Important Notes:", 14, finalY + 10);
      const notes = [
        "For re-evaluation, apply within 15 days of the result date.",
        "Original mark sheet will be provided in 30 working days.",
        "For any queries, contact the examination department.",
      ];

      notes.forEach((note, index) => {
        doc.text(`- ${note}`, 14, finalY + 15 + index * 5);
      });

      // Download the PDF
      doc.save("result.pdf");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div ref={resultRef}>
            <div className="flex justify-between flex-col md:flex-row items-center mb-6">
              <p className="text-gray-600 font-medium">
                Student Name: {studentData?.name}
                <br />
                Student ID: {studentData?.id}
              </p>
              <p className="text-gray-600">
                Course: B.Sc. Information Technology
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-around gap-4 text-center mb-6">
              <div>
                <p className="text-gray-600">Total Marks</p>
                <h4 className="text-xl font-bold">
                  {totalMarks}/
                  {subjects.reduce((acc, subject) => acc + subject.maxMarks, 0)}
                </h4>
              </div>
              <div>
                <p className="text-gray-600">Percentage & Grade</p>
                <h4 className="text-xl font-bold">
                  {percentage.toFixed(2)}% ({grade})
                </h4>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <h4
                  className={`text-xl font-bold ${
                    status === "PASS" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {status}
                </h4>
              </div>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Subject</th>
                    <th className="border p-2">Maximum Marks</th>
                    <th className="border p-2">Marks Obtained</th>
                    <th className="border p-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index} className="text-sm text-gray-600">
                      <td className="border p-2">{subject.name}</td>
                      <td className="border p-2">{subject.maxMarks}</td>
                      <td className="border p-2">{subject.obtainedMarks}</td>
                      <td className="border p-2">{subject.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end gap-4 mb-4">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
            >
              Download Result
            </button>
          </div>
          <div className="bg-red-100 p-4 rounded text-sm text-gray-700">
            <p>
              <strong>Important Notes:</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>
                For re-evaluation, apply within 15 days of the result date.
              </li>
              <li>Original mark sheet will be provided in 30 working days.</li>
              <li>For any queries, contact the examination department.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
