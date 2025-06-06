import { Schema, model } from 'mongoose';
import { experimentSchema } from './Experiment.model.js';

const studentDetailsSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student', 
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'male', 'Female', 'female', 'Other', 'other'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    parentName: {
        type: String,
        required: true,
    },
    parentPhone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    address: {
        type: String,
        required: true,
    },
    lastInstitution: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100, // Assuming a score is a percentage
    },
    collegeId: {
        type: Schema.Types.ObjectId,
        ref: 'College', // Reference to Student model
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    //TO DO: Make courseId a reference to the Course model
    // courseId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course', // Reference to Course model
    // },
    documents: {
        type: [String], // Array of strings containing document names or URLs
        // validate: {
        //     validator: function (arr) {
        //         return arr.length === 4; // Ensure exactly 4 documents are provided
        //     },
        //     message: 'Exactly 4 documents are required: Photo, Marksheet, Leaving Certificate, Aadhar.',
        // },
    },
    walletBalance: {
        type: Number,
        default: 0, 
        min: 0, 
    },
    status: { 
        type: String,
        enum: ['Registered', 'Form Submitted', 'Documents Verified', 'Admitted', 'Graduated'],
        default: 'Registered',
    },
    experiments:{
        type: {
            experimentId: {
                type: Schema.Types.ObjectId,
                ref: 'Experiment', 
            },
            status: {
                type: String,
                enum: ['Active','Approved'],
            }
        }
}
}, {timestamps:true});

const StudentDetails = model('StudentDetails', studentDetailsSchema);

export default StudentDetails;
