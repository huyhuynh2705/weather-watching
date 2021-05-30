import express from "express";
const router = express.Router();

<<<<<<< HEAD
import { signin, signup, updateProfile, getAdminUser, getCountAdmin, getCountUser, getCountAllUser, getCountSubscriber, deleteUser, updateUser } from "../controllers/user.js";
=======
import { signin, addUser, updateProfile, getAdminUser, getCountUser, deleteUser, updateUser } from "../controllers/user.js";
>>>>>>> 2f3cf356b03801157a3fa88c8203581b48a0799a

router.post("/signin", signin);
router.post("/admin/adduser", addUser);
router.post("/updateprofile/:id", updateProfile);

router.get('/admin/countAdmin', getCountAdmin);
router.get('/admin/countUser', getCountUser);
router.get('/admin/countAllUser', getCountAllUser);
router.get('/admin/countSubscriber', getCountSubscriber);

router.post('/admin/all', getAdminUser);
router.delete('/admin/delete/:id', deleteUser);
router.post('/admin/update/:id', updateUser);

export default router;