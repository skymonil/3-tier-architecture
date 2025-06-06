import React, { useState } from "react";
// import Navbar from "./Navbar";

type ReExamSubject = {
  id: number;
  subjectName: string;
  examDate: string;
  fee: string;
};

const ReExam: React.FC = () => {
  const [failedSubjects, setFailedSubjects] = useState<ReExamSubject[]>([
    {
      id: 1,
      subjectName: "Mathematics II",
      examDate: "2024-01-20",
      fee: "₹200",
    },
    {
      id: 2,
      subjectName: "Data Structures",
      examDate: "2024-02-05",
      fee: "₹200",
    },
  ]);

  const [paidSubjects, setPaidSubjects] = useState<ReExamSubject[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<ReExamSubject | null>(
    null
  );

  const handlePay = (subject: ReExamSubject) => {
    setPaidSubjects([...paidSubjects, subject]);
    setFailedSubjects(failedSubjects.filter((s) => s.id !== subject.id));
    setConfirmationMessage(
      `You have successfully paid the fee for "${subject.subjectName}". Prepare for the exam on ${subject.examDate}.`
    );
    setTimeout(() => setConfirmationMessage(""), 5000);
    setSelectedSubject(null);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#9c231b] text-center border-b border-gray-200 pb-4">Re-Exam</h2>

          {confirmationMessage && (
            <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
              {confirmationMessage}
            </div>
          )}

          {/* Failed Subjects Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Failed Subjects</h3>
            {failedSubjects.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b py-2">Subject Name</th>
                    <th className="border-b py-2">Exam Date</th>
                    <th className="border-b py-2">Fee</th>
                    <th className="border-b py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {failedSubjects.map((subject) => (
                    <tr key={subject.id}>
                      <td className="py-2 border-b">{subject.subjectName}</td>
                      <td className="py-2 border-b">{subject.examDate}</td>
                      <td className="py-2 border-b">{subject.fee}</td>
                      <td className="py-2 border-b">
                        <button
                          className="bg-[#9c231b] text-white py-1 px-3 rounded hover:bg-[#502b28]"
                          onClick={() => setSelectedSubject(subject)}
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">
                No failed subjects. You're all clear!
              </p>
            )}
          </div>

          {/* Paid Subjects Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Paid Subjects</h3>
            {paidSubjects.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b py-2">Subject Name</th>
                    <th className="border-b py-2">Exam Date</th>
                    <th className="border-b py-2">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {paidSubjects.map((subject) => (
                    <tr key={subject.id}>
                      <td className="py-2 border-b">{subject.subjectName}</td>
                      <td className="py-2 border-b">{subject.examDate}</td>
                      <td className="py-2 border-b">{subject.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">
                You have not paid for any re-exams yet.
              </p>
            )}
          </div>
          {/* Re-Exam Guidelines Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Re-Exam Guidelines</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Students must attend the re-exam on the designated date for each
                subject.
              </li>
              <li>
                The re-exam fee will be ₹250 for each subject and will be
                deducted from your payment wallet.
              </li>
              <li>
                Ensure you have sufficient balance in your wallet before
                attempting to pay the re-exam fee.
              </li>
              <li>
                For any additional queries, reach out to the administration
                team.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Payment</h3>
            <p className="text-gray-700 mb-4">
              The fee of <strong>{selectedSubject.fee}</strong> for{" "}
              <strong>{selectedSubject.subjectName}</strong> will be deducted
              from your wallet.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-800 py-1 px-4 rounded hover:bg-gray-400"
                onClick={() => setSelectedSubject(null)}
              >
                Cancel
              </button>
              <button
                className="bg-[#9c231b] text-white py-1 px-4 rounded hover:bg-[#502b28]"
                onClick={() => handlePay(selectedSubject)}
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

export default ReExam;
