import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const User = mongoose.model('User', userSchema);
export default User;
