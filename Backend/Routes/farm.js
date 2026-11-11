import express from "express";

import {
    verifyToken
} from "../Middleware/authMiddleware.js";


import {
    getAllFarms,
    createFarm,
    updateFarm,
    deleteFarm,
    getFarmByName
} from "../Controller/farmController.js";

const router = express.Router();

router.get("/farms/all", verifyToken, getAllFarms);
router.post("/farms/create", verifyToken, createFarm);
router.put("/farms/:farmId", verifyToken, updateFarm);
router.delete("/farms/:farmId", verifyToken, deleteFarm);
router.get("/farms/:name", verifyToken, getFarmByName);
export default router;