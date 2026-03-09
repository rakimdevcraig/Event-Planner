const mongoose = require("mongoose");

const connectDB = () => {
  console.log("Attempting DB connection...");
  console.log("URI exists:", !!process.env.MONGODB_URI);
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(conn => {
      console.log(`DB CONNECTED...... `);
      console.log(`DB Name: ${conn.connection.name}`);
      return conn;
    })
    .catch(err => {
      console.log(`MongoDB connection error: ${err}`);
      // process.exit(1);
    });
};

module.exports = connectDB;
