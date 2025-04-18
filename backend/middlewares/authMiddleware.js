const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

// Middleware to check if the user is authenticated

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await user.findById(decoded.id).select("-password");
            next();
        } else {
            res.status(401).json({ message: "Not authorized, no token provided" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
}

// Middleware to check if the user is an admin

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        // User is an admin, proceed to the next middleware or route handler
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
}

module.exports = { protect, adminOnly };