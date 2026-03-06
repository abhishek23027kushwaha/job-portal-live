import express from "express";
import { register, login, logout, googleLogin, updateProfile, getProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/google").post(googleLogin);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/profile/view").get(isAuthenticated, getProfile);

export default router;

