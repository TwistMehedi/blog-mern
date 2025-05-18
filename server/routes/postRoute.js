import express from "express";
import { createPost, deletePost, getAllPosts, getSinglePost, getSingleUserAllPosts, reactions, updatePost } from "../controller/postController.js";
import isloggedin from "../middleware/isAuthenticated.js";
import upload from './../middleware/multer.js';

const router = express.Router();

router.route("/create-post").post(isloggedin, upload.single("image"), createPost)
router.route("/update-post/:id").put(isloggedin, updatePost)
router.route("/get-single-user-all-post").get(isloggedin, getSingleUserAllPosts)
router.route("/get-all-posts").get(getAllPosts)
router.route("/reactions").post(isloggedin, reactions)
router.route("/delete/post").delete(isloggedin, deletePost)
router.route("/get-single-post/:id").get(isloggedin, getSinglePost)

export default router;