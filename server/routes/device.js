import express from 'express';
import auth from "../middleware/auth.js";

import { addDevice, getDevice, getAdminDevice, getCountDevice, updateDevice, deleteDevice, getTrafficlightName, getDHT11Name, getLightName } from '../controllers/device.js';

const router = express.Router();

router.get('/', auth, getDevice);
router.post('/',auth, addDevice);
router.post('/admin/all', auth, getAdminDevice);
router.get('/admin/count', auth, getCountDevice);
router.post('/admin/update', auth, updateDevice);
router.delete('/admin/delete/:id', auth,deleteDevice);

router.get('/admin/TrafficlightName', auth, getTrafficlightName);
router.get('/admin/DHT11Name', auth, getDHT11Name);
router.get('/admin/LightName', auth, getLightName);

export default router;