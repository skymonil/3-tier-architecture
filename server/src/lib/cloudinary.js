import cloudinary from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const { v2 } = cloudinary;
cloudinary.config({
  cloud_name: "dyy6jhc3l",
  api_key: 957226542832995,
  api_secret: "Uo6ojZHYWn35MZqKnL5-BxYechk",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "student_documents",
    allowed_formats: ["jpg", "png", "pdf"],
  },
});

const upload = multer({ storage });

export default upload;
