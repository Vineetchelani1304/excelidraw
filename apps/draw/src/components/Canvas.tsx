import { initDraw } from "@/canvas";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";



export type Tool = "circle" | "rect" | "pencil";

export const Canvas = ({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")

    useEffect(() => {
        //@ts-ignore
        window.selectedTool = selectedTool;
    },[selectedTool]);
    
    useEffect(() => {
        if (canvasRef.current) {
            if (socket) {
                initDraw(canvasRef.current, roomId, socket);
            }
        }
    }, [canvasRef, roomId, socket]);

    return <div className="h-screen overflow-hidden absolute">
        <TopBar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        <canvas width={window.innerWidth}  height={window.innerHeight} ref={canvasRef}></canvas>;

    </div>
}


function TopBar({selectedTool, setSelectedTool}:{
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}){
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            <div className="flex gap-t">
                <IconButton 
                    onClick={() => {
                        setSelectedTool("pencil")
                    }}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil />}
                />
                <IconButton onClick={() => {
                    setSelectedTool("rect")
                }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />} ></IconButton>
                <IconButton onClick={() => {
                    setSelectedTool("circle")
                }} activated={selectedTool === "circle"} icon={<Circle />}></IconButton>
            </div>
        </div>
}