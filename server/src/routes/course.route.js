import express from "express";
import { getCourses } from "../controllers/course.controller.js";
import { authenticateStudent } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/get-courses", authenticateStudent, getCourses);

export default router;
