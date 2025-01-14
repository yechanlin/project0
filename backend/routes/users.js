import express from "express";
import User from "../models/User.js";
import authController from "../controllers/authController.js";

const router = express.Router();

// Signup a new user
router.post("/signup", authController.signup);

// Login a user
router.post("/login", authController.login);

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users.",
    });
  }
});

export default router;
