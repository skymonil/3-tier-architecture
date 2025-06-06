import Student from "../models/Student.model.js";
import College from "../models/College.model.js";

export const getCourses = async (req, res) => {
  try {
    const { email } = req.user; 
    const student = await Student.findOne({ email }).populate("collegeId");

    if (!student || !student.collegeId) {
      return res.status(404).json({ message: "Student or college not found." });
    }

    const college = await College.findById(student.collegeId).select("courses collegeName");

    if (!college || !college.courses) {
      return res.status(404).json({ message: "No courses found for this college." });
    }

    res.status(200).json({
      collegeName: college.collegeName,
      courses: college.courses.map((course) => ({
        id: course._id,
        name: course.courseName,
        baseFee: `₹${course.baseFee}`,
        subjects: course.subject.map((sub) => ({
          subjectName: sub.subjectName,
          minMarks: sub.marks.min,
          maxMarks: sub.marks.max,
        })),
        eligibility: course.eligibility,
      })),
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
