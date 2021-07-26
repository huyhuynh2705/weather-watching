import express from 'express';
import auth from "../middleware/auth.js";

import { addData, getData, getAllDeviceData, getChartData } from '../controllers/data.js';

const router = express.Router();

router.get('/:id', auth, getData);
router.get('/all/:id', auth, getAllDeviceData);
router.get('/chart/:id', auth, getChartData);
router.post('/', addData);


export default router;