
import jwt from "jsonwebtoken";
import crypto from "crypto";


const ACCESS_TOKEN_EXPIRES = "15d";
const REFRESH_TOKEN_EXPIRES = "30d";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: Number(user.id),
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES
        }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: Number(user.id)
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRES
        }
    );
};

export const hashRefreshToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};
