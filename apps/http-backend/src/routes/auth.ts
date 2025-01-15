import { Router } from "express";
import { signup } from "../controllers/auth/signup.js";
import { signin } from "../controllers/auth/signin.js";

export const authRouter = Router();

// Define routes using authRouter
authRouter.post("/signup", signup);
authRouter.post("/signin", signin); 
