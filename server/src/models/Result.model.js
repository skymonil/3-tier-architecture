import { Schema, model } from "mongoose";

const resultSchema = Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  marksObtained: [
    {
      subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
      marks: {
        type: Number,
        required: true,
      },
    },
  ],
}, {timestamps:true});

const Result = model("Result", resultSchema);

export default Result;
