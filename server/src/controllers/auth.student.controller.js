import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Student from "../models/Student.model.js";

const otpStore = {};

export const sendOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999);
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { otp, expiresAt  };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationMail = {
    from: "CAAM Email Verification Bot",
    to: email,
    subject: "CAAM - Email Verification (Valid for 5 minutes)",
    text: `The OTP for registration is ${otp}. It is only valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(verificationMail);
  } catch (error) {
    console.log("Error sending email:", error.message);
    return res.status(500).json({ message: "Failed to send OTP" });
  }

  return otp;
};

export const register = async (req, res) => {
  const { username, email, password, collegeId } = req.body;
  console.log("User model:", Student);
  console.log("Request body:", req.body);

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("MongoDB connection state:", mongoose.connection.readyState);

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = await sendOTP(email);

    otpStore[email] = { otp, hashedPassword, username, collegeId  };

    res.status(201).json({
      message:
        "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (error) {
    console.log("Error in student register controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP has expired or is invalid" });
    }

    const { otp: storedOTP, expiresAt, hashedPassword, username, collegeId } = otpStore[email];
    if (Date.now() > expiresAt) {
      delete otpStore[email]; 
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (parseInt(otp) != storedOTP) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again!" });
    }

    const newStudent = new Student({
      name: username,
      email,
      password: hashedPassword,
      collegeId,
      collegeId,
    });

    await newStudent.save();
    delete otpStore[email];

    res
      .status(200)
      .json({ message: "Registration Succesfull. You can now login!" });
  } catch (error) {
    console.log("Error in student verifyOTP controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({
        message: "Username or password is incorrect",
        error: "Username or password is incorrect",
      });
    }

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      console.log("Password comparison failed:", {
        password,
        hashed: student.password,
      });
      return res.status(400).json({
        message: "Username or password is incorrect",
        error: "Username or password is incorrect",
      });
    }

    if (!process.env.SECRET_KEY) {
      return res.status(500).json({
        error: "JWT secret is not defined in environment variables",
      });
    }

    const token = generateToken(student._id, res);

    console.log("Student Login Successful!");

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.log("Error in student login controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    console.log("Token cookie cleared.");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in student logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.student);
  } catch (error) {
    console.log("Error in student checkAuth controller: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
