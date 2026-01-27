const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event.js");

const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("➡️", req.method, req.originalUrl);
  next();
});

app.use("/api/users", authRoutes);
app.use("/api/events", eventRoutes);

connectDB();

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
