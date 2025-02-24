const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const UserModel = require('./models/Users')
const app = express()
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/crud")
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.log("MongoDB connection error:", err));

// Get all users
app.get('/', async (req, res) => {
   try {
      const users = await UserModel.find({});
      res.json(users);
   } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
   }
});

// Get a single user by ID
app.get('/getUser/:id', async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
   } catch (err) {
      res.status(500).json({ error: "Failed to fetch user" });
   }
});

// Update a user by ID
app.put('/updateUser/:id', async (req, res) => {
   try {
      const updatedUser = await UserModel.findByIdAndUpdate(
         req.params.id,  // Directly pass ID
         { name: req.body.name, email: req.body.email, age: req.body.age },
         { new: true } // Return the updated document
      );
      if (!updatedUser) return res.status(404).json({ error: "User not found" });
      res.json(updatedUser);
   } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
   }
});

// Create a new user
app.post("/createUser", async (req, res) => {
   try {
      const user = new UserModel(req.body);
      await user.save();
      res.json(user);
   } catch (err) {
      res.status(500).json({ error: "Failed to create user" });
   }
});

// Delete a user by ID
app.delete('/deleteUser/:id', async (req, res) => {
   try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted successfully" });
   } catch (err) {
      res.status(500).json({ error: "Failed to delete user" });
   }
});

// Start the server
app.listen(3001, () => {
   console.log("Server is Running")
});
