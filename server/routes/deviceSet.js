import express from 'express';

import { addDeviceSet, getDeviceSet, addUser } from '../controllers/deviceSet.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getDeviceSet);
router.post('/', addDeviceSet);
router.patch('/adduser', addUser);

export default router;