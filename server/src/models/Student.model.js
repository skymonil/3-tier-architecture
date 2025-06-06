import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  collegeId: {
    type: Schema.Types.ObjectId,
    ref: "College",
    required:true
  }
}, {timestamps:true});

const Student = model("Student", studentSchema);

export default Student;
