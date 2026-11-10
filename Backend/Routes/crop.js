import express from "express";

import {
    protect
} from "../Middleware/checkuser.js";

import {
    getCrops,
    selectCropToField,
} from "../Controller/cropController.js";


const router = express.Router();

router.get("/crops/all", protect, getCrops);
router.patch("/fields/:fieldId/crops/:cropId", protect, selectCropToField);


export default router;