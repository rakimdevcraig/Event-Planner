const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Token verification failed: ", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

    return User.findById(decoded.id)
      .select("-password")
      .then(user => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "Not authorized, user not found" });
        }

        req.user = user;
        next();
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      });
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

module.exports = { protect };
