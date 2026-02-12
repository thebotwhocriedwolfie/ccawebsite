/*import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from '../db/conn.mjs';  


dotenv.config();

const router = express.Router();

// Utility function to clean input
//const cleanInput = (input) => input?.trim()?.toLowerCase();

// Signup route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Access the members collection using the db object
    const collection = db.collection("member");
    const existingUser = await collection.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash password and insert new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email: email.toLowerCase(),
      password: hashedPassword,
    };
    await collection.insertOne(newUser); // Insert new user into the collection

    return res.status(201).json({ message: "Registration successful. Please log in." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user by email
    const collection = db.collection("member");
    const user = await collection.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("No user found with email:", email);
      return res.status(404).json({ message: "Invalid email or password." });
}




    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.APP_SECRET, { expiresIn: "1d" });

    return res.status(200).json({ token, message: "Login successful." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;*/

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../db/conn.mjs";

dotenv.config();

const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Continue to the protected route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Signup route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const collection = db.collection("member");
    const existingUser = await collection.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await collection.insertOne({ email: email.toLowerCase(), password: hashedPassword });

    return res.status(201).json({ message: "Registration successful. Please log in." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const collection = db.collection("member");
    const user = await collection.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ email: user.email }, process.env.APP_SECRET, { expiresIn: "1d" });

    return res.status(200).json({ token, message: "Login successful." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Protected route for logged-in users
router.get("/protected", authMiddleware, (req, res) => {
  return res.status(200).json({ message: "You have access to this protected route." });
});

export default router;

