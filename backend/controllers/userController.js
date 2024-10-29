import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helper/generateToken.js";



export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      subscriptionStatus: false, // default: not subscribed
      subscriptionEnd: null, // no subscription end date initially
    });

    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEnd: user.subscriptionEnd,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





export const login = async (req, res) => {
    console.log("hi")
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log(password+user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("first")
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEnd: user.subscriptionEnd,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
