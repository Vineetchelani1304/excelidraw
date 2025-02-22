"use client";
import { ws_backend } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export const RoomCanvas = ({ roomId }: { roomId: string }) => {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log("token",token);
        const ws = new WebSocket(`${ws_backend}?token=${token}`)
        ws.onopen = () => {
            setSocket(ws)
            const data = JSON.stringify({
                type: "join",
                room:roomId
            });
            console.log(data);
            ws.send(data)
        }
    }, [])

    if (!socket) {
        return (
            <div>
                connecting to server
            </div>
        )
    }
    return <div>
    <Canvas roomId={roomId} socket={socket} />
</div>
};
