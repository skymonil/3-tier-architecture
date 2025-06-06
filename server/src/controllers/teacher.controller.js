import Student from "../models/Student.model.js";
import StudentDetail from "../models/StudentDetail.model.js";

export const updateTeacherDashboard = async (req, res) => {
  try {
    const response = req.body;

    const students = await Student.findById(response.map((id) => id));

    res.status(200).json(students);
  } catch (error) {
    console.error("Error in update Admin Dashboard: ", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateStudentDashboard = async (req, res) => {
  try {
    const StudentEmail = req.user.email;
    const practicals = await StudentDetail.find({
      email: StudentEmail,
    }).select("name status");

    res.status(200).json(practicals);
  } catch (error) {
    console.error("Error in update Student Dashboard: ", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
