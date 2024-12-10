import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET; // Use your JWT secret from .env

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token, forbidden
        req.user = user; // Save user info to request
        next(); // Proceed to the next middleware or route handler
    });
};
