import express from "express";

import { checkRole } from "../Middleware/checkrole.js";



import {
    register,
    login,
    googleLogin,
    refreshAccessToken
} from "../Controller/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", 
    login);

router.post("/auth/google", googleLogin);

router.post("/refresh", refreshAccessToken);

export default router;