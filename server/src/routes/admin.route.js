import express from "express";
import { getAdmin, getAdmincredential, updatePassword } from "../controllers/admin.controller.js";
import { authenticateAdmin } from "../middleware/authAdmin.middleware.js";
const router = express.Router();

router.get('/get', authenticateAdmin, getAdmin);

router.get('/credential', authenticateAdmin, getAdmincredential);

router.post('/update-password', authenticateAdmin, updatePassword)

export default router;
