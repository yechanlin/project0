import express from "express";
import projectController from "../controllers/projectController.js";
import authController from "../controllers/authController.js"; // Adjusted import

const router = express.Router();

// Get all projects
router.get("/", authController.protect, projectController.getAllProjects);
// create a project
router.post("/", projectController.createProject);

// Fetch the next project
router.get("/next", projectController.fetchProject);

// Save a project
router.post("/:id/save", projectController.saveProject);

// Apply for a project
router.post("/:id/apply", projectController.applyProject);

export default router;
