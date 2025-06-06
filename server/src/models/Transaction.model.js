import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student', // Reference to Student model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Ensures amount is non-negative
    },
    date: {
        type: Date,
        required: true,
        default: Date.now, // Default to current date and time if not provided
    },
    type: {
        type: String,
        enum: ['Credit', 'Debit'], // Can either be a Credit or Debit transaction
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending', // Default status is Pending
    },
}, {timestamps:true});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
