import { db } from "../src/prisma/db.ts";
import {
    generateAccessToken,
    generateRefreshToken,
    hashRefreshToken
} from "../utils/generateToken.js";


export const createSession = async (user, req) => {

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const tokenHash = hashRefreshToken(refreshToken);

    const deviceInfo = {
        userAgent: req.headers["user-agent"] || null,
        deviceType: req.headers["device-type"] || null,
        ip: req.headers["ip"] || null,
        location: req.headers["location"] || null,
        browser: req.headers["browser"] || null,
        os: req.headers["os"] || null,
        language: req.headers["language"] || null,
    };

    const expiresAt = Temporal.Now.instant().add({ hours: 24 * 30 });

    await db.orm.public.RefreshTokens.create({
        userId: user.id,
        tokenHash,
        deviceInfo,
        expiresAt
    });

    return {
        accessToken,
        refreshToken
    };
};