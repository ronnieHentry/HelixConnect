// server.js
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("././src/models/User");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my first app!!");
});

mongoose
  .connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("An error occurred while registering user");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// UserName: ronniehentry
// Pass: 9K49VywkgN25qjFR

// mongodb+srv://ronniehentry:9K49VywkgN25qjFR@mycluster.tqirnsb.mongodb.net/
