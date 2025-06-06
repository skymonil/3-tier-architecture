import mongoose from "mongoose";
import dotenv from "dotenv";

import College from "../models/College.model.js";
import Course from "../models/Course.model.js";
import Admin from "../models/Admin.model.js";
import Fee from "../models/Fee.model.js";
import Subject from "../models/Subject.model.js";
import Teacher from "../models/Teacher.model.js";

import { colleges } from "./college.data.js";
import { courses } from "./course.data.js";
import { admins } from "./admin.data.js";
import { fees } from "./fees.data.js";
import { subjects } from "./subject.data.js";
import { teachers } from "./teacher.data.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name";

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    // 1. Clear existing data
    await Promise.all([
      College.deleteMany({}),
      Course.deleteMany({}),
      Admin.deleteMany({}),
      Fee.deleteMany({}),
      Teacher.deleteMany({}),
      Subject.deleteMany({}),
    ]);

    // 2. Insert base data
    const insertedColleges = await College.insertMany(colleges);
    const insertedSubjects = await Subject.insertMany(subjects);
    await Admin.insertMany(admins);
    await Fee.insertMany(fees);
    

    // 3. Create a map from names or positions to ObjectIds
    const collegeIdMap = {};
    insertedColleges.forEach((college, index) => {
      collegeIdMap[`COL00${index + 1}`] = college._id;
    });

    const subjectIdMap = {};
    insertedSubjects.forEach((subject, index) => {
      subjectIdMap[`SUB00${index + 1}`] = subject._id;
    });

    // 4. Replace subject codes and collegeId in courses with real ObjectIds
    const updatedCourses = courses.map((course) => ({
      ...course,
      subjects: course.subjects.map((code) => subjectIdMap[code]),
      collegeId: collegeIdMap[course.collegeId],
    }));

    // 5. Insert updated courses
    await Course.insertMany(updatedCourses);

    const allSubjects = await Subject.find();
    const subjectCodeMap = {};
  allSubjects.forEach(subject => {
    subjectCodeMap[subject.subjectCode] = subject._id;
  });
  const teacherDocs = teachers.map(teacher => ({
    ...teacher,
    subjectId: teacher.subjectId.map(code => subjectCodeMap[code]), // Replace with ObjectId
  }));
  await Teacher.insertMany(teacherDocs);

    console.log("Seeding successful");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();
