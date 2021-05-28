import express from 'express';

import { addDeviceSet, getDeviceSet, addUser, getAdminDeviceSet, getCountDeviceSet, deleteDeviceSet } from '../controllers/deviceset.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDeviceSet);
router.post('/', addDeviceSet);
router.post('/admin/all', getAdminDeviceSet);
router.get('/admin/count', getCountDeviceSet);
router.delete('/admin/delete/:id', deleteDeviceSet);
router.patch('/adduser', addUser);

export default router;