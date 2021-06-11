import express from 'express';
import auth from "../middleware/auth.js";

import { addDeviceSet, getDeviceSet, addUser, getAdminDeviceSet, getCountDeviceSet, deleteDeviceSet, getCountUsedSet, getCountUnusedSet, getNameSet, updateDeviceSet } from '../controllers/deviceSet.js';

const router = express.Router();

router.get('/', auth, getDeviceSet);
router.post('/', auth, addDeviceSet);
router.post('/admin/all', auth, getAdminDeviceSet);
router.delete('/admin/delete/:id', auth, deleteDeviceSet);
router.patch('/adduser', auth, addUser);
router.get('/admin/countDeviceSet', auth, getCountDeviceSet);
router.get('/admin/countUsedSet', auth, getCountUsedSet);
router.get('/admin/countUnusedSet', auth, getCountUnusedSet);
router.get('/admin/getNameSet', auth, getNameSet);

router.post('/admin/updateDeviceSet', auth, updateDeviceSet)

export default router;
