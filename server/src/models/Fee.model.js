import { Schema, model } from 'mongoose';

const feeSchema = new Schema({
    feeId: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: String, // <-- changed from ObjectId to String
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    receiptUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Failed'],
        required: true
    }
}, { timestamps: true });

const Fee = model('Fee', feeSchema);

export default Fee;
