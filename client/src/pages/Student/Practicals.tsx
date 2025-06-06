import { useState } from "react";
import Navbar from "./Navbar";

const Practicals = () => {
    const [isActivePracticalsOpen, setActivePracticalsOpen] = useState<boolean>(true);
    const [activePracticals, _setActivePracticals] = useState<{ date: string; subject:string, title: string; comments: string }[]>([
      { date: "01/01/2025", subject: "Embedded System", title: "Gas Sensor", comments: "" },
      { date: "01/01/2025", subject: "Java Programming", title: "Method Overloading", comments: "" },
    ]);
    
    const [completedPracticals, _setCompletedPracticals] = useState<{ date: string; subject: String, title: string }[]>([
      { date: "01/01/2025", subject: "Software Engineering", title: "Use Case Diagram" },
  ]);
  
  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-center text-[#9c231b]">
              Practicals
            </h1>
          </div>
          <div className="flex justify-center gap-10 text-lg font-semibold mt-8">
            <div
              className={`cursor-pointer py-2 px-6 rounded-lg transition-all duration-300 ${isActivePracticalsOpen ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-red-600 hover:text-white"}`}
              onClick={() => setActivePracticalsOpen(true)}
            >
              Active Practicals
            </div>
            <div
              className={`cursor-pointer py-2 px-6 rounded-lg transition-all duration-300 ${!isActivePracticalsOpen ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-green-600 hover:text-white"}`}
              onClick={() => setActivePracticalsOpen(false)}
            >
              Completed Practicals
            </div>
          </div>

          <div className="mt-8">
            {isActivePracticalsOpen ? (
              activePracticals.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0 text-center">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="py-3 px-6">Date</th>
                      <th className="py-3 px-6">Subject</th>
                      <th className="py-3 px-6">Title</th>
                      <th className="py-3 px-6">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePracticals.map((practical, index) => (
                      <tr
                        key={index}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      >
                        <td className="py-4 px-6">{practical.date}</td>
                        <td className="py-4 px-6">{practical.subject}</td>
                        <td className="py-4 px-6">{practical.title}</td>
                        <td className="py-4 px-6">{practical.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-500 py-6">No Active Practicals</div>
              )
            ) : completedPracticals.length > 0 ? (
              <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0 text-center">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Subject</th>
                    <th className="py-3 px-6">Title</th>
                  </tr>
                </thead>
                <tbody>
                  {completedPracticals.map((practical, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="py-4 px-6">{practical.date}</td>
                      <td className="py-4 px-6">{practical.subject}</td>
                      <td className="py-4 px-6">{practical.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500 py-6">No Completed Practicals</div>
            )}
          </div>
        </div>
        </div>
      </div>
  );
};

export default Practicals;
