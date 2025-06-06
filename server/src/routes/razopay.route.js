import express from "express";
import { verifyPayment } from "../controllers/verifyPayment.controller.js";
import { authenticateStudent } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/verify-payment', authenticateStudent, verifyPayment);

export default router;
