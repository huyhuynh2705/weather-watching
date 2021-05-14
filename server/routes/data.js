import express from 'express';

import { addData, getData, getAllData } from '../controllers/data.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getAllData);
router.get('/:id', getData);
router.post('/', addData);

export default router;