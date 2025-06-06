import College from "../models/College.model.js";

export const getColleges = async (req,res) => {
    try {
        const colleges = await College.find({}, '_id collegeName');
    
        if (!colleges) {
          return res.status(404).json({ message: "No colleges found" });
        }
    
        res.status(200).json(colleges);

      } catch (error) {
        console.error("Error fetching colleges: ", error);
        res.status(500).json({ message: "Server error" });
      }
}