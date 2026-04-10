import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface jwtPayload{
    id: string;
    email: string;
    role?: string;
}

export const authMiddleware = (roles: string[]=[])=>{
    return (req:Request, res:Response, next:NextFunction)=>{
    let token = req.cookies?.token;

    if(!token && req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return res.status(401).json({message:"Unauthorized - No token"});
    }

    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        return res.status(500).json({message:"JWT_SECRET is not configured"});
    }
    
    try{
        const decoded = jwt.verify(token, jwtSecret) as jwtPayload;
        (req as any).user = decoded;

        // Role check
        if(roles.length && !roles.includes(decoded.role || "")){
            return res.status(403).json({message:"Forbidden - Access denied"});
        }
        next();
    } catch{
        return res.status(401).json({message:"Unauthorized - Invalid token"});
    }
}
}