"use client";
import { ws_backend } from "@/config";
import { useEffect, useState } from "react";

export const Canvas = ({ roomId }: { roomId: string }) => {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(`${ws_backend}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ2aW5lZUBnbWFpbC5jb20iLCJpYXQiOjE3Mzc2NDgwNDYsImV4cCI6MTczNzY1MTY0Nn0.p9m319yuuvhTr_wRkZfgy-0Fhw1iwD61KsR7q0OmK-M`)
        ws.onopen = () => {
            setSocket(ws)
            ws.send(JSON.stringify({
                type: "join",
                room : roomId
            }))
        }
    }, [])

    if (!socket) {
        return (
            <div>
                connecting to server
            </div>
        )
    }
    return
    <div>
        <Canvas roomId={roomId}  />
    </div>
};
