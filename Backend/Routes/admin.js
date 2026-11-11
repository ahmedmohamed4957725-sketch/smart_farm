import express from 'express';

import { verifyToken } from "../Middleware/authMiddleware.js";
import { checkRole } from "../Middleware/checkrole.js";

import {
    createAdmin,
    getAllUsers,
    getAllFarms,
    getAllFields,
} from "../Controller/adminController.js";

const router = express.Router();

router.post("/admin/createadmin", verifyToken,checkRole("ADMIN"), createAdmin);
router.get("/admin/users/all", verifyToken, checkRole("ADMIN"), getAllUsers);
router.get("/admin/farms/all", verifyToken, checkRole("ADMIN"), getAllFarms);
router.get("/admin/fields/all", verifyToken, checkRole("ADMIN"), getAllFields);

export default router;
