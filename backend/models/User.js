import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  profilePicture: {
    type: String,
    default: "https://via.placeholder.com/120"
  },
  userName: String,
  dateOfBirth: Date,
  school: String,
  fieldOfStudy: String,
  bio: {
    type: String,
    maxlength: [500, "Bio cannot exceed 500 characters"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual populate for applied projects
userSchema.virtual("appliedProjects", {
  ref: "Project", // Reference the Project model
  localField: "_id", // The local field in the User schema
  foreignField: "applicants", // The field in the Project schema referencing User
});

const User = mongoose.model("User", userSchema);
export default User;
