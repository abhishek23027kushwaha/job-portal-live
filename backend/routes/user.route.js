import express from "express";
import { register, login, logout, googleLogin, updateProfile, getProfile, forgotPassword, verifyOtp, resetPassword, saveJob, getSavedJobs } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/google").post(googleLogin);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/profile/view").get(isAuthenticated, getProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-otp").post(verifyOtp);
router.route("/reset-password").post(resetPassword);
router.route("/save/:id").get(isAuthenticated, saveJob);
router.route("/saved-jobs").get(isAuthenticated, getSavedJobs);

export default router;

