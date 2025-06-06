import { Schema, model } from 'mongoose';

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    minMarks: {
        type: Number,
        required: true,
        min: 0,
    },
    maxMarks: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function(value) {
                return value > this.minMarks;
            },
            message: 'maxMarks must be greater than minMarks',
        },
    },
}, {timestamps:true});

const Subject = model('Subject', subjectSchema);

export default Subject;
