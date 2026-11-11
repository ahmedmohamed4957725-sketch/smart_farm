import express from "express";

import {
    verifyToken
} from "../Middleware/authMiddleware.js";

import {
    getCrops,
    selectCropToField,
} from "../Controller/cropController.js";


const router = express.Router();

router.get("/crops/all", verifyToken, getCrops);
router.patch("/fields/:fieldId/crops/:cropId", verifyToken, selectCropToField);


export default router;