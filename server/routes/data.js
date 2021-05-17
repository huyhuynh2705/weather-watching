import express from 'express';

import { addData, getData, getAllDeviceData } from '../controllers/data.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/:id', getData);
router.get('/all/:id', getAllDeviceData);
router.post('/', addData);
// router.get('/trafficlight/:id', getTrafficLightData);
// router.get('/dht11/:id', getDHT11Data);
// router.get('/light/:id', getLightData);

export default router;