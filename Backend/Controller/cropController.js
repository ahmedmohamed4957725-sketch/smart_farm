import { db } from "../src/prisma/db.ts";
import { checkRole } from "../Middleware/checkrole.js";


export const getCrops = async (req, res) => {
    try {

        const crops = await db.orm.public.Crop
            .all();
        return res.status(200).json({
            message: "Crops retrieved successfully",
            crops: crops
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// select crop to field
export const selectCropToField = async (req, res) => {
    try {
        const { fieldId, cropId } = req.params;

        if (!cropId) {
            return res.status(400).json({
                message: "Crop ID is required"
            });
        }
        if (!fieldId) {
            return res.status(400).json({
                message: "Field ID is required"
            });
        }
        const newCrop = await db.orm.public.Field
            .where({
                id: fieldId
            })
            .update({
                cropId: cropId
            });
        const updatedField = await db.orm.public.Field
            .where({
                id: fieldId
            })
            .first();
        return res.status(201).json({
            message: "Crop selected successfully",
            field: updatedField
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
