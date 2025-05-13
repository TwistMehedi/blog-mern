import express from "express";
import isloggedin from "../middleware/isAuthenticated.js";
import { createComment, getComment } from "../controller/commentController.js";

const router = express.Router();

router.route("/:postId/comment").post(isloggedin, createComment);
router.route("/:postId/comment").get(isloggedin, getComment);

export default router;