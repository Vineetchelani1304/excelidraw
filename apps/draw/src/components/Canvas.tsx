import { initDraw } from "@/canvas";
import { useEffect, useRef } from "react";

export const Canvas = (socket: WebSocket, {roomId}:{
    roomId: string
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            if (socket) {
                initDraw(canvasRef.current, roomId, socket);
            }
        }
    }, [canvasRef]);

    return <div>
        <canvas width="1080" height="1080" ref={canvasRef}></canvas>;
    </div>
}