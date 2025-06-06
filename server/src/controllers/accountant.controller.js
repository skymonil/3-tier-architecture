import StudentDetails from "../models/StudentDetail.model.js";
import College from '../models/College.model.js';

export const fetchCourses = async(req,res)=>{
    const {collegeId} = req.body;
    
    if(!collegeId)
    {
        return res.status(400).send({message: 'Provide Valid College ID'});
    }
    try
    {
        //Fetch College and courses id Array and from Array fetch the course details i.e. only name
        const college = College.findById(collegeId).populate({path: "courses", select: "name"});

        if(!college)
        {
            return res.status(400).json({message: "College not Found!"})
        }

        const courseNames = college.courses.map(course => course.name);

        return res.status(200).json({ 
            message: "Courses Fetched Successfully!",
            courses: courseNames
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error Occured!"});
    }
}


export const addFunds = async(req,res)=>{
    const {studentId, amount} = req.body;
    
    if(!studentId|| !amount)
    {
        return res.status(400).json({message: "Invalid Data Request. Ensure Correct Values are provided"})
    }
    try
    {
        const student = await StudentDetails.findOne({studentId});
        console.log(student)
        if(!student)
        {
            return res.status(404).json({message: 'Student Not Found!'});
        }
        console.log("Before: "+student.walletBalance);
        student.walletBalance += Number.parseInt(amount);

        await student.save()
        console.log("After Adding "+amount+" Balance: "+student.walletBalance)
        console.log("Funds Added Success")
        return res.status(200).json({message: "Funds Added Successfully!"})
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error Occured!"})
    }
}