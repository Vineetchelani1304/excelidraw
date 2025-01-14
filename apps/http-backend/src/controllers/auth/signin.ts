// import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secret = JWT_SECRET || "mysecret";
import { Request,Response } from 'express';
import { JWT_SECRET } from '../../config';
export const signin =async (req : Request, res : Response) => {
 try {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Please provide all the fields" });
        return;
    }
    const existingUser = await user.findOne(email);
    if (!existingUser) {
        res.status(400).json({ message: "User does not exist" });
        return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
    const token = jwt.sign({id: existingUser._id, email: existingUser.email }, secret, { expiresIn: '1h' });
 } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
 }    
}