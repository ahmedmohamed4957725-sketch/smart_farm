import { db } from "../src/prisma/db.ts";


//show all devices of a field
export const getDeviceofFaild = async (req , res) =>{
    try{
    const {fieldId} = req.params
    if (!fieldId || fieldId <= 0 || !Number(fieldId)) {
        return res.status(400).json({
            message: "Field ID is required"
        });
    }
    const field = await db.orm.public.Field
    .where((field) => field.id.eq(fieldId))
    .include("farm")
    .include("deviceFields", (deviceField) => deviceField.include("device").include("sensors"))
    .first()
        if (!field || field.farm.userId !== req.user.id) {
            return res.status(404).json({
                message: "Field not found"
            });
        }
    return res.json({field: 
        {
            name: field.name,
            id: field.id,
            farmId: field.farmId,
            userId: field.userId,
            createdAt: field.createdAt,
            updatedAt: field.updatedAt,
        },farm: {
            name: field.farm.name,
            id: field.farm.id,
            userId: field.farm.userId,
        }, deviceFields: field.deviceFields})
    }catch(err){
        return res.status(500).json(err.message)
    }
}


//connect device to field
export const connectDevice = async (req, res) => {
    try {
        const { fieldId } = req.params;
        const { device_uid } = req.body;

        // 1. Find device
        const device = await db.orm.public.Devices
            .where((device) => device.device_uid.eq(device_uid))
            .first();

        if (!device) {
            return res.status(404).json({
                data: device
            });
        }

        // 2. Find field and verify ownership
        const field = await db.orm.public.Field
            .where((field) => field.id.eq(fieldId))
            .include("farm")
            .first();

        if (!field || field.farm.userId !== req.user.id) {
            return res.status(404).json({
                message: "Field not found"
            });
        }

        // 3. Create relationship
        const connected = await db.orm.public.DeviceFields.create({
            deviceId: device.id,
            fieldId: field.id
        });

        return res.status(201).json({
            message: "Device connected successfully",
            data: connected ,
            device: device,
            field: field,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

