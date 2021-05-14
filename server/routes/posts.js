import express from 'express';
// Tham khảo
import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
// Tham khảo
const router = express.Router();
import auth from "../middleware/auth.js";
// Tham khảo
router.get('/', getPosts);
router.post('/',auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
// Tham khảo
export default router;