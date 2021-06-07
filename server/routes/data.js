import express from 'express';

import { addData, getData, getAllDeviceData, getChartData } from '../controllers/data.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/:id', getData);
router.get('/all/:id', getAllDeviceData);
router.get('/chart/:id', getChartData);
router.post('/', addData);


export default router;