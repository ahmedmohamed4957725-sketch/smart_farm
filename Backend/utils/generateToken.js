import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: Number(user.id),
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15d"
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
            expiresIn: "1d"
        }
    );
};