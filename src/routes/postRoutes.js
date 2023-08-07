import express from "express";
import { getPosts, createPost,getSinglePost, updatePost, deletePost } from "../controllers/postController.js";
const router = express.Router();

router.get("/posts", getPosts);
router.post("/createpost", createPost);
router.get("/updatepost/:id", getSinglePost);
router.put("/updatepost/:id", updatePost);
router.delete("/deletepost/:id", deletePost);

export default router;
