import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt, { hash } from 'bcrypt';
export const signup = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            res.status(400).json({ message: "Please provide all the fields" });
            return;
        }
        const existingUser = await user.findOne(email);
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await user.create({ userName, email, hashedPassword });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

