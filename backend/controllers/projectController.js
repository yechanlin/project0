import Project from "../models/Project.js";

// Fetch the next project
const projectController = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find(); // Fetch all projects (add filtering logic if needed)
      res.status(200).json({
        staus: "success",
        projects,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  },

  fetchProject: async (req, res) => {
    const { lastProjectId } = req.query; // Use query parameters to pass the last processed project ID
    try {
      let query = {};
      if (lastProjectId) {
        query = { _id: { $gt: lastProjectId } }; // Fetch the next project after the last one
      }
      const project = await Project.findOne(query).sort({ _id: 1 }); // Sort in ascending order
      if (!project) {
        return res.status(404).json({ message: "No more projects" });
      }
      res.status(200).json({ project });
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  },

  // Create a project
  createProject: async (req, res) => {
    const { title, description, skills, budget } = req.body;
    const project = new Project({
      title,
      description,
      skills,
      budget,
    });
    try {
      await project.save();
      res.status(201).json({ project });
    } catch (err) {
      res.status(400).json({ message: "Error creating project" });
    }
  },

  // Save a project

  saveProject: async (req, res) => {
    const projectId = req.params.id;
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      // Logic to save the project for the user
      res.status(200).json({ message: "Project saved" });
    } catch (error) {
      res.status(500).json({ message: "Error saving project" });
    }
  },
  // Apply for a project
  applyProject: async (req, res) => {
    // Logic to handle project application
    res.status(200).json({ message: "Applied successfully" });
  },

  // Skip a project
  skipProject: async (req, res) => {
    // Logic to skip the project
    res.status(200).json({ message: "Project skipped" });
  },
};
export default projectController;
