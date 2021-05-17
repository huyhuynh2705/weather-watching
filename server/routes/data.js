import express from 'express';

import { addData, getData, getAllData } from '../controllers/data.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getAllData);
router.get('/:id', getData);
router.post('/', addData);
// router.get('/trafficlight/:id', getAllTrafficLight);
// router.get('/dht11/:id', getAllDHT11);
// router.get('/light/:id', getAllLight);

export default router;