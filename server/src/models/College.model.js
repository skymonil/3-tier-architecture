import { Schema, model } from "mongoose";

const FeeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const SubjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  marks: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
});

const CourseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    baseFee: {
      type: Number,
      required: true,
    },
    subject: [SubjectSchema],
    eligibility: {
      type: String,
      required: true,
    },
  },
  { _id: true }
);

const CollegeSchema = new Schema({
  collegeID: {
    type: String,
    required: true,
    unique: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  globalFees: [FeeSchema],
  courses: [CourseSchema], 
});

const College = model("College", CollegeSchema);

export default College;
