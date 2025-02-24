import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Validate input fields
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create user
        const newUser = new User({
            fullname,
            email: normalizedEmail,
            password, // Password is already hashed in the model
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        console.log("Login Request Body:", req.body);

        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase();

        // Find user and explicitly select password field (since it's excluded by default)
        const user = await User.findOne({ email: normalizedEmail }).select("+password");

        console.log("User Found:", user);

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // ✅ Use matchPassword method from user model
        const isMatch = await user.matchPassword(password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
