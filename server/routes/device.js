import express from 'express';

import { addDevice, getDevice, getAdminDevice, getCountDevice, updateDevice, deleteDevice } from '../controllers/device.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDevice);
router.post('/', addDevice);
router.post('/admin/all', getAdminDevice);
router.get('/admin/count', getCountDevice);
router.post('/admin/update', updateDevice);
router.post('/admin/delete', deleteDevice);

export default router;