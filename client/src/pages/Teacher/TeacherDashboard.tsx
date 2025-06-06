import { useState } from "react";
import Teacher_Navbar from "./Teacher_Navbar";

interface Student {
    id: string,
    name: string
}

export default function TeacherDashboard() {
    const [student, setStudent] = useState<Student[]>([
        {
            id: "1234",
            name: "chirag"
        },
        {
            id: "1235",
            name: "Monil"
        },
        {
            id: "1236",
            name: "Aditya"
        },
        {
            id: "1237",
            name: "Akshat"
        }
    ]);
    
    const approveStudent = (key: string) => {
        setStudent(student.filter((s) => s.id !== key));
        console.log("Approved student ID:", key);
    };

    return (
        <div className="min-h-screen w-full">
            <div className="flex justify-between w-full items-center bg-[#053f64] text-white p-4">
                <div className="flex items-center">
                    <i className="fas fa-user"></i>
                    <div className="ml-2 text-lg font-semibold">
                        Rajesh Mouriya
                    </div>{" "}
                </div>
                <button
                    className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
                >
                    <i className="fas fa-right-from-bracket"></i>
                    <span className="ml-2">Logout</span>
                </button>
            </div>
            <Teacher_Navbar/>
            
            <div className="flex justify-center mt-16">
                <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            </div>
            <div className="flex justify-center items-center flex-col">
                <p className="text-2xl font-bold">Subject: C++ practical</p>
                <p className="text-2xl font-bold">Practical: 1</p>
            <div className="py-2">
                <a href="https://tinyurl.com/practical-responses" target="_new"><button className="bg-green-500 text-white px-4 py-3 rounded-lg">View Responses</button></a></div>
            </div>
            <div className="flex justify-center items-center gap-8 p-8 w-full">

                <table className="w-96 gap-8 bottom-2 bg-white shadow-md rounded-lg border-separate border-spacing-0">
                    <thead className="bg-gray-200 text-gray-600" >
                        <tr className="p-8 ">
                            <th className="py-3 px-6  text-lg">Name</th>
                            <th className="py-3 px-6  text-lg">Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {student.map((students) => (
                            <tr key={students.id} className="text-sm text-gray-600">
                                <td className="border p-2 text-center text-lg">{students.name}</td>
                                <td className="p-4 text-center border">
                                    <button className="bg-red-400 text-white py-1 px-3  mr-3 text-lg rounded hover:bg-red-500">reject</button>
                                    <button className="bg-green-400 text-white py-1 px-3  text-lg rounded hover:bg-green-600"
                                        onClick={() => approveStudent(students.id)}>approve</button>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td >Chirag</td>
                            <td >
                                <button className="bg-red-400 text-white py-1 px-3 rounded hover:bg-red-500">reject</button>
                                <button className="bg-green-400 text-white py-1 px-3 rounded hover:bg-green-500">approve</button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
