
import { db } from "../src/prisma/db.ts";

const getUserFarm = async (farmId, userId) => {
    return await db.orm.public.Farm
        .where({
            id: farmId,
            userId: userId
        })
        .first();
};


export const getAllFields = async (req, res) => {
    try {
        const { farmId } = req.params;
        const userId = req.user.id;

        const farm = await getUserFarm(farmId, userId);

        if (!farm) {
            return res.status(404).json({
                message: "Farm not found"
            });
        }

        const allFields = await db.orm.public.Field
            .where({
                farmId: farmId
            })
            .all();

        return res.status(200).json({
            message: "Fields retrieved successfully",
            fields: allFields,
            farmName: farm.name
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



export const getFieldByName = async (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.user.id;

        // Get all user's farms
        const farms = await db.orm.public.Farm
            .where({
                userId: userId
            })
            .all();

        if (farms.length === 0) {
            return res.status(200).json({
                message: "No fields found",
                fields: []
            });
        }

        // Search fields in all user's farms
        const fields = [];

        for (const farm of farms) {
            const farmFields = await db.orm.public.Field
                .where({
                    farmId: farm.id,
                    name: name
                })
                .all();

            fields.push(...farmFields);
        }

        return res.status(200).json({
            message: "Fields retrieved successfully",
            fields: fields
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export const createField = async (req, res) => {
    try {
        const { farmId } = req.params;
        const { name, area } = req.body;
        const userId = req.user.id;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const farm = await getUserFarm(farmId, userId);

        if (!farm) {
            return res.status(404).json({
                message: "Farm not found"
            });
        }

        const newField = await db.orm.public.Field.create({
            farmId: farmId,
            name,
            area
        });

        return res.status(201).json({
            message: "Field created successfully",
            field: newField
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const deleteField = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const field = await db.orm.public.Field
            .where({
                id: id
            })
            .first();

        if (!field) {
            return res.status(404).json({
                message: "Field not found"
            });
        }

        const farm = await getUserFarm(field.farmId, userId);

        if (!farm) {
            return res.status(404).json({
                message: "Field not found"
            });
        }

        const deletedField = await db.orm.public.Field
            .where({
                id: id
            })
            .delete();

        return res.status(200).json({
            message: "Field deleted successfully",
            field: deletedField
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const updateField = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, area } = req.body;
        const userId = req.user.id;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const field = await db.orm.public.Field
            .where({
                id: id
            })
            .first();

        if (!field) {
            return res.status(404).json({
                message: "Field not found"
            });
        }

        const farm = await getUserFarm(field.farmId, userId);

        if (!farm) {
            return res.status(404).json({
                message: "Field not found"
            });
        }

        const updatedField = await db.orm.public.Field
            .where({
                id: id
            })
            .update({
                name,
                area
            });

        return res.status(200).json({
            message: "Field updated successfully",
            field: updatedField
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
