import { client } from "@repo/db/client";
import { Request, Response } from "express";

export const room = async (req: Request, res: Response) => {
    const slug = req.body;
    //@ts-ignore
    const userId = req.userId;
    try {
        const room = await client.room.create({
            data: {
                slug: slug,
                //@ts-ignore
                adminId: userId
            }
        })
        res.json({
            roomId: room.id
        })
    } catch (e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }

}