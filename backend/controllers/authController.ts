import type { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

// Zod Schemas
export const signupSchema = z.object({
    name: z.string().min(2),
    email:z.string().email(),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

//Signup
export const signup = async (req:Request, res:Response)=>{
    try{
        const data = signupSchema.parse(req.body);
        const existingUser = await User.findOne({email:data.email});
        if(existingUser) return res.status(400).json({message:"Email already exists"});

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await User.create({
            name: data.name,
            email:data.email,
            password:hashedPassword,
        });

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET!,{expiresIn: "7d"});

        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(200).json({
            user:{id: user._id, 
            name: user.name, 
            email:user.email,
        }});
    } catch (err:any){
        res.status(400).json({message:err.message});
    }
};

// Login
export const login = async (req:Request, res:Response)=>{
    try{
        const data = loginSchema.parse(req.body);
        const user = await User.findOne({email: data.email});
        if(!user) return res.status(400).json({message:"Invalid email"})
        
        const isValid = await bcrypt.compare(data.password, user.password);
        if(!isValid) return res.status(400).json({message:"Invalid password"});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {expiresIn:"7d"});

        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(200).json({
            user:{id: user._id, 
            name: user.name, 
            email:user.email,
        }});
    } catch (err:any){
        res.status(400).json({message:err.message});
    }
}

export const logout = async(req: Request, res:Response)=>{
    res.clearCookie("token");
    res.json({message:"Logged out successfully"});
};