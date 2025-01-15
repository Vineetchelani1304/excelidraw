import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { room } from "../controllers/room/room.js";

export const roomRouter = Router();

// Route to create a room, with authentication middleware
roomRouter.post("/room", auth, room);
