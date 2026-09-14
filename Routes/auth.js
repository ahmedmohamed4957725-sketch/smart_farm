import express from "express";

import {
    register,
    login,
    googleLogin
} from "../Controller/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/auth/google", googleLogin);

export default router;