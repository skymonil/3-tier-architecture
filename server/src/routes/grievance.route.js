import express from 'express';

import { addGrievance, resolveGrievance, fetchGrievances, fetchGrievancesByStudent } from '../controllers/grievance.controller.js';

const router = express.Router()

router.post('/add',addGrievance);

router.get('/fetch-grievances',fetchGrievances);

router.get('/fetch-grievance-student/:studentId',fetchGrievancesByStudent);

router.put('/resolve-grievance/:grievanceId',resolveGrievance);

export default router;