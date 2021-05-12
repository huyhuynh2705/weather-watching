import express from 'express';

import { addData, getData } from '../controllers/data.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getData);
router.post('/', addData);

export default router;