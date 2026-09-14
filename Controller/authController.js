import db from "../Models/DB.js";
import bcrypt from "bcrypt";
import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/generateToken.js";

import  googleClient from "../config/google.js";

const saltRounds = 10;

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    try {
        const checkUser = await db.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (checkUser.rows.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            saltRounds
        );

        const result = await db.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,
            [name, email, hashedPassword]
        );

        const user = result.rows[0];

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(201).json({
            message: "User registered successfully",

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Register failed"
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];
        
        const match = await bcrypt.compare(
            password,
            user.password
        ); 

        if (!match) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({
            message: "Login successful",

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Login failed"
        });
    }
};


export const googleLogin = async (req, res) => {

    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({
            message: "Google credential is required"
        });
    }

    try {

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const googleId = payload.sub;
        const email = payload.email;
        const name = payload.name;

        if (!googleId || !email) {
            return res.status(401).json({
                message: "Invalid Google account"
            });
        }

        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        let user;

        if (result.rows.length > 0) {

            user = result.rows[0];

            if (!user.google_id) {

                const updatedUser = await db.query(
                    `UPDATE users
                     SET google_id = $1
                     WHERE id = $2
                     RETURNING id, name, email, google_id`,
                    [googleId, user.id]
                );

                user = updatedUser.rows[0];
            }

        } else {

            const newUser = await db.query(
                `INSERT INTO users
                 (name, email, google_id)
                 VALUES ($1, $2, $3)
                 RETURNING id, name, email, google_id`,
                [name, email, googleId]
            );

            user = newUser.rows[0];
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({

            message: "Google login successful",

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        });

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            message: "Google authentication failed"
        });
    }
};