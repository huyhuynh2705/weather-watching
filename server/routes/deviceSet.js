import express from 'express';

<<<<<<< HEAD
import { addDeviceSet, getDeviceSet, addUser, getAdminSet, deleteDeviceSet, getCountDeviceSet, getCountUsedSet, getCountUnusedSet } from '../controllers/deviceSet.js';
=======
import { addDeviceSet, getDeviceSet, addUser, getAdminDeviceSet, getCountDeviceSet, deleteDeviceSet } from '../controllers/deviceset.js';
>>>>>>> eb989ca24c08c8f76709505364e3444f806a0f3b

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDeviceSet);
router.post('/', addDeviceSet);
router.post('/admin/all', getAdminDeviceSet);
router.get('/admin/count', getCountDeviceSet);
router.delete('/admin/delete/:id', deleteDeviceSet);
router.patch('/adduser', addUser);
router.get('/admin/countDeviceSet', getCountDeviceSet);
router.get('/admin/countUsedSet', getCountUsedSet);
router.get('/admin/countUnusedSet', getCountUnusedSet);

export default router;