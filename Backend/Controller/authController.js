
import { db } from "../src/prisma/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSession } from "../services/session.js";
import { hashRefreshToken } from "../utils/generateToken.js";
import googleClient from "../config/google.js";

const saltRounds = 10;

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required",
        },
    );
    }
    try {
        const checkUser = await db.orm.public.Users.first({
            email
        });

        if (checkUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            saltRounds
        );

        const user = await db.orm.public.Users.create({
            name,
            email,
            password: hashedPassword
        });

        const { accessToken, refreshToken } = await createSession(user, req);
        
        return res.status(201).json({
            message: "User registered successfully",

            user: {
                id: String(user.id),
                name: user.name,
                email: user.email,
                role: user.role || null
                
            },
            accessToken,
            refreshToken
        });

    } catch (err) {
        console.log("REGISTER ERROR:");
        console.log(err);
        console.log(err?.message);
        console.log(err?.stack);

        return res.status(500).json({
            message: "Register failed",
            error: err?.message
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
        const user = await db.orm.public.Users.first({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email"
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const { accessToken, refreshToken } = await createSession(user, req);

        return res.status(200).json({
            message: "Login successful",

            user: {
                id: String(user.id),
                name: user.name,
                email: user.email,
                role: user.role || null
                
            },
            accessToken,
            refreshToken
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Login failed",
            error: err?.message
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

        let user = await db.orm.public.Users.first({
            email
        });

        if (user) {

            if (!user.googleId) {

                user = await db.orm.public.Users
                    .where({ id: user.id })
                    .update({
                        googleId
                    });
            }

        } else {

            user = await db.orm.public.Users.create({
                name,
                email,
                googleId
            });
        }

        const { accessToken, refreshToken } = await createSession(user, req);

        return res.status(200).json({

            message: "Google login successful",

            user: {
                id: String(user.id),
                name: user.name,
                email: user.email,
                role: user.role || null
            },
            accessToken,
            refreshToken
        });

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            message: "Google authentication failed"
        });
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token is required"
            });
        }

        const tokenHash = hashRefreshToken(refreshToken);

        const session = await db.orm.public.RefreshTokens.first({
            tokenHash
        });

        // Token doesn't exist or already revoked
        if (!session || session.revokedAt !== null) {
            return res.status(200).json({
                message: "Logged out successfully"
            });
        }

        const now = Temporal.Now.instant();

        await db.orm.public.RefreshTokens
            .where({ id: session.id })
            .update({
                revokedAt: now
            });

        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};




export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token is required"
            });
        }

        // 1. Verify JWT
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // 2. Hash token
        const tokenHash = hashRefreshToken(refreshToken);

        // 3. Find session
        const session = await db.orm.public.RefreshTokens.first({
            tokenHash
        });

        if (!session) {
            return res.status(401).json({
                message: "Refresh token not found"
            });
        }

        // 4. Validate session
        const now = Temporal.Now.instant();

        const isExpired =
            Temporal.Instant.compare(session.expiresAt, now) <= 0;

        if (
            session.userId !== Number(decoded.id) ||
            session.revokedAt !== null ||
            isExpired
        ) {
            return res.status(401).json({
                message: "Refresh token is invalid or revoked"
            });
        }

        // 5. Find user
        const user = await db.orm.public.Users.first({
            id: Number(decoded.id)
        });

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "User not found or inactive"
            });
        }

        // 6. Revoke old session
        await db.orm.public.RefreshTokens
            .where({ id: session.id })
            .update({
                revokedAt: now
            });

        // 7. Create new session
        const tokens = await createSession(user, req);

        return res.status(200).json({
            message: "Token refreshed successfully",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });

    } catch (error) {
        console.error("REFRESH TOKEN ERROR:", error);

        return res.status(401).json({
            message: "Invalid or expired refresh token",
            error: error?.message
        });
    }
};
