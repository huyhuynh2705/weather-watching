import express from 'express';

import { addDeviceSet, getDeviceSet, addUser, getAdminSet, deleteDeviceSet } from '../controllers/deviceSet.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDeviceSet);
router.post('/', addDeviceSet);
router.post('/admin/all', getAdminSet);
router.post('/admin/delete/:id', deleteDeviceSet);
router.patch('/adduser', addUser);

export default router;