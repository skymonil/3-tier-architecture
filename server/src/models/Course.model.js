import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject', 
    }],
    duration: {
        type: Number,
        required: true,
        default:3,
    },
    eligibility: {
        type: String,
        required: true, 
    },
    feeAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    collegeId: {
        type: Schema.Types.ObjectId,
        ref: 'College'
    }
}, {timestamps:true});

const Course = model('Course', courseSchema);

export default Course;
