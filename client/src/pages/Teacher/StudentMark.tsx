import {  useState } from "react"
import Teacher_Navbar from "./Teacher_Navbar";

interface student
{
    id: string,
    name: string
}
function StudentMark() {
    const [students,_setStudents] = useState<student[]>([{
        id: 'S001',
        name: "Akshat"
    },
{
    id: 'S002',
    name: 'Monil'
}]);
    const [selectedStudents, _setSelectedStudents] = useState<Set<string>>(new Set());

    const handleChange = (id: string, isChecked: boolean) =>{
        if(isChecked)
        {
            selectedStudents.add(id);
        }
        else{
            selectedStudents.delete(id);
        }
    }

    const handleSubmit = (event: any) =>{
        event.preventDefault();
        const selectedStudentIds = Array.from(selectedStudents);
        console.log(selectedStudentIds);
    }

    
    const date = new Date()
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
      <div className="max-w-4xl m-auto min-h-96 shadow-xl p-5">
        <h1 className="text-3xl font-semibold pb-5">List of Students</h1>
        <div className="text-xl font-semibold">Date: {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>
        <div className="flex justify-end text-lg py-3 font-semibold"></div>
        <form action="" className="flex flex-col justify-center items-center space-y-4">
        {students.map((student)=>{
            return(

                <div className="flex w-96 h-12 items-center px-3 justify-between border border-gray-500 rounded-lg">
                    <div>{student.name}</div>
                    <div><input type="checkbox" 
                    onChange={(e)=>handleChange(student.id,e.target.checked)}
                    />
                    </div>
                </div>
            )
        })}
        <button type="submit" className="bg-green-500 w-fit my-4 px-5 py-3  rounded-lg text-white hover:bg-green-700" onClick={(e)=>handleSubmit(e)}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default StudentMark
