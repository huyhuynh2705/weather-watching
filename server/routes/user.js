import express from "express";
const router = express.Router();

import { signin, signup, updateProfile, getAdminUser, getCountUser, deleteUser, updateUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updateprofile/:id", updateProfile);
router.post('/admin/all', getAdminUser);
router.get('/admin/count', getCountUser);
router.delete('/admin/delete/:id', deleteUser);
router.post('/admin/update', updateUser);

export default router;