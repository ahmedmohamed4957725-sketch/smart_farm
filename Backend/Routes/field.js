import express from "express";

import {
    verifyToken
} from "../Middleware/authMiddleware.js";

import {
    getAllFields,
    getFieldByName,
    createField,
    updateField,
    deleteField
} from "../Controller/fieldController.js";

const router = express.Router();

router.get("/farms/:farmId/fields/all", verifyToken, getAllFields);
router.get("/farms/fields/search/:name", verifyToken, getFieldByName);
router.post("/farms/:farmId/fields/create", verifyToken, createField);
router.put("/farms/:farmId/fields/:id", verifyToken, updateField);
router.delete("/farms/:farmId/fields/:id", verifyToken, deleteField);

export default router;