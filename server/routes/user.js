import express from "express";
import auth from "../middleware/auth.js";

import { signIn, signUp, addUser, updateProfile, getAdminUser, getCountUser, deleteUser, updateUser, getCountAdmin, getCountAllUser, getCountSubscriber, getUserName, forgotPassword } from "../controllers/user.js";
const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/forgotpassword", forgotPassword);

router.post("/admin/adduser", auth, addUser);
router.post("/updateprofile/:id", auth, updateProfile);

router.get('/admin/countAdmin', auth, getCountAdmin);
router.get('/admin/countUser', auth, getCountUser);
router.get('/admin/countAllUser', auth, getCountAllUser);
router.get('/admin/countSubscriber', auth, getCountSubscriber); 

router.get('/admin/username', auth, getUserName)

router.post('/admin/all', auth, getAdminUser);
router.delete('/admin/delete/:id', auth, deleteUser);
router.post('/admin/update', auth, updateUser);

export default router;