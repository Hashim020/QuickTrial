
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    subscriptionStatus: {
      type: Boolean,
      default: false, // Initially, the user is not subscribed
    },
    subscriptionEnd: {
      type: Date,
      default: null, // If subscribed, this will be the end date of the subscription
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);


const User = mongoose.model('User', userSchema);

export default User;
