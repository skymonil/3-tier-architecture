import express from "express";
import { authenticateAdmin, authenticateStudent } from "../middleware/auth.middleware.js";
import {
  register,
  login,
  logout,
  checkAuth,
  verifyOTP,
} from "../controllers/auth.student.controller.js";
import {
  adminRegister,
  adminLogin,
  adminLogout,
  adminCheckAuth,
  adminVerifyOTP,
} from "../controllers/auth.admin.controller.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/check", authenticateStudent, checkAuth);

router.post("/verify-otp",verifyOTP);

router.post("/admin-register", adminRegister);

router.post("/admin-login", adminLogin);

router.post("/admin-logout", adminLogout);

router.post("/admin-check", authenticateAdmin, adminCheckAuth);

router.post("/admin-verify-otp",adminVerifyOTP);

export default router;
