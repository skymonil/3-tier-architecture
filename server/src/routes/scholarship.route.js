import express from 'express';
import { addScholarship, fetchAllParticipatedStudents, participateScholarship, scholarshipsWithoutParticipation, scholarshipsWithParticipation, approveStudents,payStudents, fetchByStatus } from '../controllers/scholarship.controller.js';

const router = express.Router()

router.post('/add',addScholarship);

router.post('/participate',participateScholarship);

router.get('/fetch-participated/:studentId',scholarshipsWithParticipation);

router.get('/fetch-non-participated/:studentId',scholarshipsWithoutParticipation);

router.get('/fetch-all/:status',fetchByStatus);

router.get('/fetch-students/:scholarshipId',fetchAllParticipatedStudents);

router.post('/approve-students',approveStudents);

router.get('/pay-students/:scholarshipId',payStudents);

export default router;