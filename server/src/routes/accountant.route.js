import express from "express";
import { addFunds } from "../controllers/accountant.controller.js";
import { fetchCourses } from "../controllers/accountant.controller.js";
const router = express.Router();

router.post('/add-funds',addFunds);

router.post('/fetch-courses',fetchCourses);

export default router;
