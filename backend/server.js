const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;

const app = express();

//Converts anything in req.body to JSON
app.use(express.json());

app.use("/api/users", authRoutes);

connectDB();

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
