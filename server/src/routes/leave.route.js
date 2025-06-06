import express from 'express';
import { addLeave, approveLeave, fetchLeave, rejectLeave, fetchLeaveByStudent } from '../controllers/leave.controller.js';

const router = express.Router();

router.post('/add',addLeave);

router.get('/fetch-leaves',fetchLeave);

router.get('/fetch-leave-student/:studentId',fetchLeaveByStudent)

router.put('/approve-leave/:leaveId',approveLeave);

router.put('/reject-leave/:leaveId',rejectLeave);

export default router;