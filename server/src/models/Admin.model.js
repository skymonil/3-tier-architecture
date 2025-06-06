import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: /.+\@.+\..+/,
    },
    username: {
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superAdmin', 'docAdmin', 'marksAdmin', 'hod', 'accountantAdmin'],
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
}, {timestamps:true});

const Admin = model('Admin', adminSchema);

export default Admin;
