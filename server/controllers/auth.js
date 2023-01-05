import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      friends,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;
    // Check if user already exists
    // let user = await
    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Logging in a user

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    // Check if password is

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
