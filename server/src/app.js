const isDev = process.env.NODE_ENV !== 'production';
import express from "express";
import helmet from "helmet"
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";
import accountantRoute from "./routes/accountant.route.js";
import grievanceRoute from "./routes/grievance.route.js";
import leaveRoute from "./routes/leave.route.js";
import collegeRoute from "./routes/college.routes.js";
import studentRoute from "./routes/student.route.js";
import adminRoute from "./routes/admin.route.js";
import scholarshipRoute from './routes/scholarship.route.js'
import razopayRoute from "./routes/razopay.route.js";
import courseRoute from "./routes/course.route.js";
import teacherRoute from "./routes/teacher.route.js";

const app = express();
const PORT = 5000;

dotenv.config();
connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://615915.xyz",
    "https://www.615915.xyz", // Add www subdomain if needed
    "https://staging.615915.xyz",
    
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://checkout.razorpay.com"], // Add trusted CDNs if used
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
     connectSrc: isDev
        ? ["'self'", "http://localhost:5173"] // allow dev frontend
        : ["'self'", "https://615915.xyz"],   // allow prod frontend
      frameSrc: ["https://api.razorpay.com", "https://checkout.razorpay.com"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  referrerPolicy: { policy: 'no-referrer' },
  crossOriginEmbedderPolicy: false, // Optional based on your use case
}));



app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/college", collegeRoute);
app.use("/api/admin/accountant", accountantRoute); //Endpoint to Add Money to Student Wallet from Accountant Side
app.use("/api/grievance", grievanceRoute); //Endpoint to Add Grievance from Student side and Resolve Grievance from HOD side
app.use("/api/leave", leaveRoute); //Endpoint to Add Leave from Student side and Approve or Reject Leave from HOD side
app.use("/api/razopay", razopayRoute); //Endpoint to Add Money to Student Wallet from Student Side using Razorpay
app.use("/api/course", courseRoute);
app.use('/api/scholarship',scholarshipRoute);
app.use('/api/teacher',teacherRoute);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});
