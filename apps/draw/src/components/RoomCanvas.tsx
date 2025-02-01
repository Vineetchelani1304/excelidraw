"use client";
import { ws_backend } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export const RoomCanvas = ({ roomId }: { roomId: string }) => {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(`${ws_backend}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ2aW5lZUBnbWFpbC5jb20iLCJpYXQiOjE3Mzc4MTQ2MTMsImV4cCI6MTczNzgxODIxM30.E-184O0YPWCbNt8DG8-yHDtRcwL1MalFA9PG4Ztm2UY`)
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
