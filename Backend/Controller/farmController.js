import { db } from "../src/prisma/db.ts";

export const getAllFarms = async (req, res) => {
    try {
        const userId = req.user.id;

        const allFarms = await db.orm.public.Farm
        .where({
            userId: userId
        })
        .all();

        res.status(200).json({
            message: "Farms retrieved successfully",
            farms: allFarms
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getFarmByName = async (req, res) => {
    const { name } = req.params;

    try {

        const farm = await db.orm.public.Farm
        .where({
            userId: req.user.id,
            name: name
        })
        .first();

        if (!farm) {
            return res.status(404).json({
                message: "Farm not found"
            });
        }

        res.status(200).json({
            message: "Farm retrieved successfully",
            farm: farm
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const createFarm = async (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    try {
        const { name, location, area } = req.body;
        const userId = req.user.id;

        const newFarm = await db.orm.public.Farm.create({
                userId: userId,
                name,
                location,
                area
        });

        res.status(201).json({
            message: "Farm created successfully",
            farm: newFarm
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const updateFarm = async (req, res) => {

    const { id } = req.params;
    const { name, location, area } = req.body;

    if (!name ) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    try {

        const updatedFarm = await db.orm.public.Farm.where({
            id: id,
            userId: req.user.id
        }).update({
            name,
            location,
            area
        })

        res.status(200).json({
            message: "Farm updated successfully",
            farm: updatedFarm
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const deleteFarm = async (req, res) => {

    const { id } = req.params;

    try {

        const deletedFarm = await db.orm.public.Farm.where({
            id: id,
            userId: req.user.id
        }).delete();

        if (!deletedFarm) {
            return res.status(404).json({
                message: "Farm not found or you are not authorized to delete it"
            });
        }
        res.status(200).json({
            message: "Farm deleted successfully",
            farm: deletedFarm
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};