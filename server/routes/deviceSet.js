import express from 'express';

import { addDeviceSet, getDeviceSet, addUser, getAdminDeviceSet, getCountDeviceSet, deleteDeviceSet, getCountUsedSet, getCountUnusedSet, getNameSet, updateDeviceSet } from '../controllers/deviceSet.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDeviceSet);
router.post('/', addDeviceSet);
router.post('/admin/all', getAdminDeviceSet);
router.delete('/admin/delete/:id', deleteDeviceSet);
router.patch('/adduser', addUser);
router.get('/admin/countDeviceSet', getCountDeviceSet);
router.get('/admin/countUsedSet', getCountUsedSet);
router.get('/admin/countUnusedSet', getCountUnusedSet);
router.get('/admin/getNameSet', getNameSet);

router.post('/admin/updateDeviceSet', updateDeviceSet)

export default router;
