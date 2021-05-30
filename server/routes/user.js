import express from "express";
const router = express.Router();

<<<<<<< HEAD
import { signin, signup, updateProfile, getCountAdmin, getCountUser, getCountAllUser, getCountSubscriber } from "../controllers/user.js";
=======
import { signin, signup, updateProfile, getAdminUser, getCountUser, deleteUser, updateUser } from "../controllers/user.js";
>>>>>>> eb989ca24c08c8f76709505364e3444f806a0f3b

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updateprofile/:id", updateProfile);
<<<<<<< HEAD
router.get('/admin/countAdmin', getCountAdmin);
router.get('/admin/countUser', getCountUser);
router.get('/admin/countAllUser', getCountAllUser);
router.get('/admin/countSubscriber', getCountSubscriber);

=======
router.post('/admin/all', getAdminUser);
router.get('/admin/count', getCountUser);
router.delete('/admin/delete/:id', deleteUser);
router.post('/admin/update', updateUser);
>>>>>>> eb989ca24c08c8f76709505364e3444f806a0f3b

export default router;