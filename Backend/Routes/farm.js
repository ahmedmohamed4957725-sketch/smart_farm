import express from "express";

import {
    protect
} from "../Middleware/checkuser.js";


import {
    getAllFarms,
    createFarm,
    updateFarm,
    deleteFarm,
    getFarmByName
} from "../Controller/farmController.js";

const router = express.Router();

router.get("/farms/all", protect, getAllFarms);
router.post("/farms/create", protect, createFarm);
router.put("/farms/:farmId", protect, updateFarm);
router.delete("/farms/:farmId", protect, deleteFarm);
router.get("/farms/:name", protect, getFarmByName);
export default router;