
import { db } from "../src/prisma/db.ts";

export const checkRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await db.orm.public.Users
                .where({
                    id: req.user.id
                })
                .first();

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // Check user role
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            req.user.role = user.role;

            next();

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    };
};
