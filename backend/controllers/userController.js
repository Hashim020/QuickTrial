import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helper/generateToken.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      subscriptionStatus: false, // default: not subscribed
      subscriptionEnd: null, // no subscription end date initially
    });

    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        fullname: user.fullname,
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("first");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        fullname: user.fullname,
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

export const googleRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = generateToken(user._id);
      console.log("User exists and logged in.");

      res.status(201).json({
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionEnd: user.subscriptionEnd,
        },
        token,
        success:true,
      });
    } else {
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        subscriptionStatus: false, // default: not subscribed
        subscriptionEnd: null, // no subscription end date initially
      });

      const token = generateToken(user._id);
      console.log("New user created and logged in.");

      res.status(201).json({
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionEnd: user.subscriptionEnd,
        },
        token,
        success:true,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data", error });
  }
};


export const updateSubscription = async (req, res) => {
  try {
    const userId = req.user._id
    const { trialType } = req.body;

    let subscriptionEnd = null;
    if (trialType === "1-Minute Trial") {
      subscriptionEnd = new Date(Date.now() + 1 * 60 * 1000); // Add 1 minute
    } else if (trialType === "7-Day Trial") {
      subscriptionEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Add 7 days
    } else {
      return res.status(400).json({ message: "Invalid trial type" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscriptionStatus: true,
        subscriptionStart: new Date(), // Set the subscription start date to now
        subscriptionEnd: subscriptionEnd, // Set the calculated subscription end date
      },
      { new: true } // Return the updated user document
    );

    return res.status(200).json({ message: "Subscription updated successfully", user: updatedUser,success:true });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

