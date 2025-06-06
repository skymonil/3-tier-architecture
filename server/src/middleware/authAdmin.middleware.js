import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Get token from cookies
    // console.log("token: " + token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - NO Token Provided" });
    }

    // Verify the token
    const decoded_token = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded_token) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Find the admin in the database
    const admin = await Admin.findById(decoded_token.userID).select(
      "-password"
    );

    if (!admin) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Admin Not Found" });
    }

    // Attach the admin to the request object
    req.admin = admin;
    next();
  } catch (err) {
    console.error("Error in authentication middleware:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
