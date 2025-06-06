import express from "express";
import { updateTeacherDashboard, updateStudentDashboard } from "../controllers/teacher.controller.js";
// import { authenticateAdmin } from "../middleware/authAdmin.middleware.js";

const router = express.Router();

router.get("/updateTeacherDashboard", updateTeacherDashboard);

router.get("/updateStudentDashboard", updateStudentDashboard);

export default router;
