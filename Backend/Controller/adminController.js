import { db } from "../src/prisma/db.ts";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/generateToken.js";


const saltRounds = 10;

//create new admin 
export const createAdmin = async (req, res) => {
    const { name, email, password , role } = req.body;
    //role = role.toUpperCase();
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
            password: await bcrypt.hash(password, saltRounds),
            role: role.toUpperCase()
        });

        //generate access token and refresh token
        const accessToken = generateAccessToken(admin);
        const refreshToken = generateRefreshToken(admin);

        return res.status(201).json({
            message: "Admin created successfully",
            admin : {
                id: String(admin.id),
                name: admin.name,
                email: admin.email,
                role: admin.role || null
            },
            accessToken,
            refreshToken
        });
    }catch(err){
        return res.status(500).json({
            message: err?.message
        });
    }
}


//get all users

export const getAllUsers = async (req, res) => {
    try{
        const users = await db.orm.public.Users.all();
        const userCount = users.length;

        return res.status(200).json({
            message: "Users retrieved successfully",
            users: users.map(user => ({
                id: String(user.id),
                name: user.name,
                email: user.email,
                role: user.role || null
            })),
            userCount
        });
    }catch(err){
        return res.status(500).json({
            message: err?.message
        });
    }
}

//get all farms

export const getAllFarms = async (req, res) => {
    try{
        const farms = await db.orm.public.Farms.findMany();
        return res.status(200).json({
            message: "Farms retrieved successfully",
            farms
        });
    }catch(err){
        return res.status(500).json({
            message: err?.message
        });
    }
}

//get all fields

export const getAllFields = async (req, res) => {
    try{
        const fields = await db.orm.public.Fields.findMany();
        return res.status(200).json({
            message: "Fields retrieved successfully",
            fields
        });
    }catch(err){
        return res.status(500).json({
            message: err?.message
        });
    }
}

// admin actions 


