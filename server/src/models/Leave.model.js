import { Schema, model } from "mongoose";

const leaveSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student", // Reference to Student model
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.startDate; // Ensure endDate is after or equal to startDate
        },
        message: "endDate must be on or after startDate",
      },
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // Default status is Pending
    },
  },
  {
    timestamps: true,
  }
);

const Leave = model("Leave", leaveSchema);

export default Leave;
