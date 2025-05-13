import express from "express";
import { deleteUser, getAllUser, profile, loginUser, logOut, register, updateUser, verifyEmail } from "../controller/userController.js";
import isloggedin from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/verify-email").get(verifyEmail);
router.route("/login-user").post(loginUser);
router.route("/logout").get(isloggedin, logOut);
router.route("/profile").get(isloggedin,profile);
router.route("/update-user").put(isloggedin, updateUser);
router.route("/get-all-user").get(isloggedin, getAllUser);
router.route("/delete-user").delete(isloggedin, deleteUser);

export default router;