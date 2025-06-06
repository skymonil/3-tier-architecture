import { Schema, model } from 'mongoose';

const teacherSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subjectId: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    }],
    comment: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Teacher = model('Teacher', teacherSchema);

export default Teacher;