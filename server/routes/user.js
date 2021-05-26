import express from "express";
const router = express.Router();

import { signin, signup, updateProfile, getCountAdmin, getCountUser, getCountAllUser, getCountSubscriber } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updateprofile/:id", updateProfile);
router.get('/admin/countAdmin', getCountAdmin);
router.get('/admin/countUser', getCountUser);
router.get('/admin/countAllUser', getCountAllUser);
router.get('/admin/countSubscriber', getCountSubscriber);


export default router;