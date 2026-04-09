import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({message:"Unauthorized - No token"});
    }

    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        return res.status(500).json({message:"JWT_SECRET is not configured"});
    }
    
    try{
        const decoded = jwt.verify(token, jwtSecret);
        (req as any).user = decoded;
        next();
    } catch{
        return res.status(401).json({message:"Unauthorized - Invalid token"});
    }
}