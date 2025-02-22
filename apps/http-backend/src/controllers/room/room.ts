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
        console.log("room id",room.id);
        return;
    } catch (e) {
        res.status(411).json({
            message: "something went wrong"
        })
        console.log(e)
        return
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
        return;
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
        return;
    }
    
}

// export const getRooms = async (req:Request, res:Response) => {
//     const slug = req.params.slug;
//     const room = await client.room.findFirst({
//         where: {
//             slug
//         }
//     });

//     res.json({
//         room
//     })
//     return
// }


export const getRooms = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const room = await client.room.findFirst({ where: { slug } });

        if (!room) {
            res.status(404).json({ message: "Room not found" });
            return 
        }

        res.json({ room });
        return
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
