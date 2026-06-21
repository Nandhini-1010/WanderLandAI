require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 5000;

// Import Routes
const journalRoutes = require("./src/routes/journalRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("WanderLand AI Backend Running");
});

app.use("/api/journals", journalRoutes);
app.use("/api/auth", authRoutes);

// Connect DB
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});