import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const secret = process.env.JWT_SECRET || "mysecret";
        const decoded = jwt.verify(token, secret);
        if(decoded){
            // @ts-ignore
            req.userId = decoded.id;
            next();
        }
        else{
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "i don't know what to do", error: error });        
    }
}