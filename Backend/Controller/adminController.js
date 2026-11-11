import { db } from "../src/prisma/db.ts";


//create new admin 
export const createAdmin = async (req, res) => {
    const { name, email, password , role } = req.body;
    role = role.toUpperCase();
    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "All fields are required"
        });
    };
    try{
        //check if email already exists
        const user = await db.orm.public.Users.first({
            email
        });
        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        //create admin
        const admin = await db.orm.public.Users.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role
        });
        return res.status(201).json({
            message: "Admin created successfully",
            admin
        });
    }catch(err){
        return res.status(500).json({
            message: err?.message
        });
    }
}

