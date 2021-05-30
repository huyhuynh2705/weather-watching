import express from "express";
const router = express.Router();

import { signin, signup, updateProfile, getAdminUser, getCountAdmin, getCountUser, getCountAllUser, getCountSubscriber, deleteUser, updateUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updateprofile/:id", updateProfile);

router.get('/admin/countAdmin', getCountAdmin);
router.get('/admin/countUser', getCountUser);
router.get('/admin/countAllUser', getCountAllUser);
router.get('/admin/countSubscriber', getCountSubscriber);

router.post('/admin/all', getAdminUser);
router.delete('/admin/delete/:id', deleteUser);
router.post('/admin/update', updateUser);

export default router;