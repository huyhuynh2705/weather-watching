import express from 'express';

import { addDeviceSet, getDeviceSet, addUser, getAdminDeviceSet, getCountDeviceSet, deleteDeviceSet, getCountUsedSet, getCountUnusedSet, getNameSet } from '../controllers/deviceset.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDeviceSet);
router.post('/', addDeviceSet);
router.post('/admin/all', getAdminDeviceSet);
//router.get('/admin/count', getCountDeviceSet);
router.delete('/admin/delete/:id', deleteDeviceSet);
router.patch('/adduser', addUser);
router.get('/admin/countDeviceSet', getCountDeviceSet);
router.get('/admin/countUsedSet', getCountUsedSet);
router.get('/admin/countUnusedSet', getCountUnusedSet);
router.get('/admin/getNameSet', getNameSet); // tra ve mang cac ten cua device set [SET001, SET002, SET003...]

export default router;