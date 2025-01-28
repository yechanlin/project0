import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
  },
  location: {
    type: String,
    required: [true, "Project location is required"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
  },
  skillsRequired: {
    type: [String],
    required: [true, "At least one skill is required"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  maxMembers: {
    type: Number,
    required: [true, "Maximum members count is required"],
  },
  category: {
    type: String,
    required: true,
    enum: ["Software", "Design", "Research", "Business", "Competition"],
  },
  projectType: {
    type: String,
    required: true,
    enum: ["Academic", "Professional", "Hobby", "Startup", "Hackathon"],
    default: "Hobby",
  },
  applications: [{  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",    
    },
    status: {
      type: String, 
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ["open", "closed"], 
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
