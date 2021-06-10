import express from "express";
const router = express.Router();

import { signin, addUser, updateProfile, getAdminUser, getCountUser, deleteUser, updateUser, getCountAdmin, getCountAllUser, getCountSubscriber, getUserName, forgotPassword } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/admin/adduser", addUser);
router.post("/forgotpassword", forgotPassword);
router.post("/updateprofile/:id", updateProfile);

router.get('/admin/countAdmin', getCountAdmin);
router.get('/admin/countUser', getCountUser);
router.get('/admin/countAllUser', getCountAllUser);
router.get('/admin/countSubscriber', getCountSubscriber);

router.get('/admin/username', getUserName)

router.post('/admin/all', getAdminUser);
router.delete('/admin/delete/:id', deleteUser);
router.post('/admin/update', updateUser);

export default router;