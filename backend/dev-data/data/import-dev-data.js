import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Project from '../../models/Project.js';
import User from '../../models/User.js';
import { users } from "./users.json" assert { type: "json" };

dotenv.config({ path: './backend/.env' });

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// Read JSON Files
const projects = JSON.parse(
  fs.readFileSync(`${process.cwd()}/backend/dev-data/data/projects.json`, 'utf-8')
).projects;

// Import Data into Database
const importData = async () => {
  try {
    await User.create(users);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete All Data from Collections
const deleteData = async () => {
  try {
    await Project.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log('Error deleting data:', err);
  }
  process.exit();
};

// Process command line arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please provide proper command: --import or --delete');
  process.exit();
}