import express from 'express';

import { addDevice, getDevice } from '../controllers/device.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDevice);
router.post('/', addDevice);
// router.get('/admin', getAdminDevice);
// router.get('/admin/count', getCountDevice);
// router.post('/admin/updatedevice', getCountDevice);

export default router;