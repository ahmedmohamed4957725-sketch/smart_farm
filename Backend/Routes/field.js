import express from "express";

import {
    protect
} from "../Middleware/checkuser.js";

import {
    getAllFields,
    getFieldByName,
    createField,
    updateField,
    deleteField
} from "../Controller/fieldController.js";

const router = express.Router();

router.get("/farms/:farmId/fields/all", protect, getAllFields);
router.get("/farms/fields/search/:name", protect, getFieldByName);
router.post("/farms/:farmId/fields/create", protect, createField);
router.put("/farms/:farmId/fields/:id", protect, updateField);
router.delete("/farms/:farmId/fields/:id", protect, deleteField);

export default router;