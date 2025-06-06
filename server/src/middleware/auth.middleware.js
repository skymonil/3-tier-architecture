import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js"; 
import Admin from "../models/Admin.model.js";

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("TokenExpired");
    }
    throw new Error("InvalidToken");
  }
};

export const authenticateStudent = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decodedToken = verifyToken(token);

    const student = await Student.findById(decodedToken.userID).select("-password");    

    if (!student) {
      return res.status(401).json({ message: "Unauthorized - Student Not Found" });
    }

    req.user = student;
    next();
  } catch (err) {
    console.error("Error in authenticateStudent middleware:", err.message);
    const errorMessage = err.message === "TokenExpired" ? "Unauthorized - Token Expired" : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decodedToken = verifyToken(token);

    const admin = await Admin.findById(decodedToken._id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized - Admin Not Found" });
    }

    const allowedAdminRoles = ["superAdmin", "docAdmin", "marksAdmin", "hod", "accountantAdmin"];
    if (!allowedAdminRoles.includes(admin.role)) {
      return res.status(403).json({ message: "Forbidden - Not an Admin" });
    }

    req.user = admin;
    next();
  } catch (err) {
    console.error("Error in authenticateAdmin middleware:", err.message);
    const errorMessage = err.message === "TokenExpired" ? "Unauthorized - Token Expired" : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
};
