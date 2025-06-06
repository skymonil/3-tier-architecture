import { Schema, model } from 'mongoose';

const scholarshipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    examDate: {
        type: Date,
        required: true,
    },
    participatedStudents: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    approvedStudents: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    status: {
        type: String,
        enum: ['Pending','Approved','Paid'],
        default: 'Pending'
    }
}, {timestamps:true});

const Scholarship = model('Scholarship', scholarshipSchema);

export default Scholarship;
