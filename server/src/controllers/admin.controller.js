import Admin from "../models/Admin.model.js";
import bcrypt from "bcryptjs";

export const getAdmin = async (req, res) => {
  try {
    const AdminEmail = req.admin.email;
    const admin = await Admin.findOne({ email: AdminEmail });

    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    res.json({
      id: admin._id,
      name: admin.username,
      email: admin.email,
      role: admin.role,
      collegeName: admin.collegeName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAdmincredential = async (req, res) => {
  try {
    const AdminEmail = req.admin.email;
    const collegeName = await Admin.findOne({ email: AdminEmail }).select(
      "collegeName"
    );

    console.log(collegeName);

    if (!collegeName) {
      return res.status(404).json({ message: "admin not found" });
    }

    const admins = await Admin.find({
      collegeName: collegeName.collegeName,
    }).select("username role password");

    console.log(admins);

    if (!admins || admins.length === 0) {
      return res
        .status(404)
        .json({ message: "No admins found for this college" });
    }

    res.status(200).json({ admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error", error });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { adminId, newPassword } = req.body;

    if (!adminId || !newPassword) {
      return res
        .status(400)
        .json({ message: "Admin ID and new password are required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Password updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getCredentials = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const superAdminId = req.user._id;
    console.log("Super Admin ID:", superAdminId);

    // Fetch the super admin
    const superAdmin = await Admin.findById(superAdminId).select("collegeName");

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    const { collegeName } = superAdmin;

    // Fetch all admins for the college
    const admins = await Admin.find({ collegeName }).select("username role"); // Include only necessary fields

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found for this college" });
    }

    // Prepare the response
    const adminCredentials = admins.map((admin) => ({
      username: admin.username,
      role: admin.role,
    }));

    console.log("Admin credentials:", adminCredentials);

    return res.status(200).json({ admins: adminCredentials });
  } catch (error) {
    console.error("Error in getCredentials controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
