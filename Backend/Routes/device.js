import express from "express";

import {
    verifyToken
} from "../Middleware/authMiddleware.js";


import {
    getDeviceofFaild,
    connectDevice
} from "../Controller/deviceController.js";
const router = express.Router();

router.post("/field/:fieldId/getdevice", verifyToken, getDeviceofFaild);
router.post("/field/:fieldId/connectdevice", verifyToken, connectDevice);

export default router;