import { client } from "@repo/db/client";
import { Request, Response } from "express";
import { roomRouter } from "../../routes/room.js";

export const room = async (req: Request, res: Response) => {
    const {slug} = req.body;
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
        console.log(room.id);
    } catch (e) {
        res.status(411).json({
            message: "something went wrong"
        })
        console.log(e)
    }

}


export const getChats = async (req: Request, res: Response) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await client.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
}

export const getRooms = async (req:Request, res:Response) => {
    const slug = req.params.slug;
    const room = await client.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
}
