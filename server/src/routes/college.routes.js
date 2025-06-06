import express from "express";
// import College from "../models/College.model.js";
import {
  addCollege,
  getCollege,
  getColleges,
  getCollegeById,
  getAllCourses
} from "../controllers/college.controllers.js";

const router = express.Router();

router.post("/add", addCollege);

router.get("/get", getCollege);

router.get("/getAllCourses", getAllCourses);

router.get('/get-colleges',getColleges);

router.get('/getCollegeById/:id',getCollegeById);

// Update a college
// router.put("/:id", async (req, res) => {
//   const { collegeName, address, courses } = req.body;
//   try {
//     const updatedCollege = await College.findByIdAndUpdate(
//       req.params.id,
//       { collegeName, address, courses },
//       { new: true }
//     );
//     res.status(200).json({ message: "College updated successfully", college: updatedCollege });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating college", error });
//   }
// });

// Delete a college
// router.delete("/:id", async (req, res) => {
//   try {
//     await College.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "College deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting college", error });
//   }
// });

export default router;
