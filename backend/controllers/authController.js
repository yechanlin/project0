import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { promisify } from "util";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/apperror.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Signup Controller
const signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm } = req.body;

  console.log("Signup request received:", req.body); // Debugging

  // Validate input fields
  if (!email || !password || !passwordConfirm) {
    return next(new AppError("All fields are required.", 400));
  }
  if (password !== passwordConfirm) {
    return next(new AppError("Passwords do not match.", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists.", 400));
  }

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  // Sign token and send response
  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

// Login Controller
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }

  // Find user and validate password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password.", 400));
  }

  // Sign token and send response
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

// Protect Middleware (Authorization)
const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in ! Please log in to get access", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log("Decoded: ", decoded);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  // Grant access
  req.user = currentUser;
  next();
});

const authController = { signup, login, protect };
export default authController;
