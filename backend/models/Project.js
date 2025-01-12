import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  responsibilities: [String],
  skills: [String],
  teamMembers: [String],
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
