import { Schema, model } from 'mongoose';

export const experimentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacherId: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher', 
    }],
    comment: {
        type: String,
        default: ''
    }
}, {timestamps:true});

const Experiment = model('Experiment', experimentSchema);

export default Experiment;