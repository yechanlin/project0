import express from "express";
import projectController from "../controllers/projectController.js";

const router = express.Router();

// Get all projects
router.get("/", projectController.getAllProjects);
// create a project
router.post("/", projectController.createProject);

// Fetch the next project
router.get("/next", projectController.fetchProject);

// Save a project
router.post("/:id/save", projectController.saveProject);

// Apply for a project
router.post("/:id/apply", projectController.applyProject);

// Skip a project
router.post("/:id/skip", projectController.skipProject);

export default router;
