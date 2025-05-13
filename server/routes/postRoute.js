import express from "express";
import { createPost, deletePost, getAllPosts, getSinglePost, getSingleUserAllPosts, reactions, updatePost } from "../controller/postController.js";
import isloggedin from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create-post").post(isloggedin, createPost)
router.route("/update-post/:id").put(isloggedin, updatePost)
router.route("/get-single-user-all-post").get(isloggedin, getSingleUserAllPosts)
router.route("/get-all-posts").get(isloggedin, getAllPosts)
router.route("/reactions").post(isloggedin, reactions)
router.route("/delete/post").delete(isloggedin, deletePost)
router.route("/get-single-post/:id").get(isloggedin, getSinglePost)

export default router;