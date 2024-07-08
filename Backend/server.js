const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const User = require("././src/models/User");
const Member = require("././src/models/Member");
const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

app.use(express.json());

app.use(bodyParser.json());

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

const client = new MongoClient(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sendWhatsAppMessage = async (phoneNumber, messageBody) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v13.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: { body: messageBody },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message
    );
  }
};

app.get("/", (req, res) => {
  try {
    const messageBody = `hello_world`;

    sendWhatsAppMessage("+919961114880", messageBody);

    res.send("Message sent successfully!");
  } catch (error) {
    res.send(error);
  }
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

app.get("/members/:admissionNumber", async (req, res) => {
  try {
    const admissionNumber = req.params.admissionNumber;
    const member = await Member.findOne({ admissionNumber });
    console.log(member);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.send(member);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
