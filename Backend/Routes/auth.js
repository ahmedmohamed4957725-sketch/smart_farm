import express from "express";




import {
    register,
    login,
    googleLogin,
    logout,
    refreshAccessToken
} from "../Controller/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/auth/google", googleLogin); 

router.post("/logout", logout);

router.post("/refresh", refreshAccessToken);

export default router;