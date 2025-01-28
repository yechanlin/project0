import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Project from '../../models/Project.js';
import User from '../../models/User.js';

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

const users = JSON.parse(
  fs.readFileSync(`${process.cwd()}/backend/dev-data/data/users.json`, 'utf-8')
).users;

// Import Data into Database
const importData = async () => {
  try {
    // Hash passwords for all users
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );

    // First import users
    const createdUsers = await User.create(usersWithHashedPasswords, { validateBeforeSave: false });
    console.log('Users successfully loaded!');

    // Distribute projects among different users
    const projectsWithCreator = projects.map((project, index) => ({
      ...project,
      creator: createdUsers[index % createdUsers.length]._id, // Distribute projects evenly among users
      members: [createdUsers[index % createdUsers.length]._id],
      applications: []
    }));

    await Project.create(projectsWithCreator);
    console.log('Projects successfully loaded!');
    console.log('All data successfully loaded!');
  } catch (err) {
    console.log('Error loading data:', err);
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