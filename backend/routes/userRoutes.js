import express from "express";
import User from "../models/User.js";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";
import { AppError } from "../utils/apperror.js";
import { globalErrorHandler } from "../controllers/errorController.js";

const router = express.Router();

// Signup a new user
router.post("/signup", authController.signup);

// Login a user
router.post("/login", authController.login);

// Get all users
router.get("/", userController.getAllUsers);

// Get a user
router.get("/:id", userController.getUser);

// Update the user profile
router.patch("/profilesetup", userController.updateUserProfile);
export default router;
