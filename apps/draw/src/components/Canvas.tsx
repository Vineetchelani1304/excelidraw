import { initDraw } from "@/canvas";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, Eraser } from "lucide-react";

export type Tool = "circle" | "rect" | "pencil" | "eraser";

export const Canvas = ({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("pencil");

    useEffect(() => {
        //@ts-ignore
        window.selectedTool = selectedTool;
    }, [selectedTool]);

    useEffect(() => {
        if (canvasRef.current) {
            if (socket) {
                initDraw(canvasRef.current, roomId, socket);
            }
        }
    }, [canvasRef, roomId, socket]);

    return (
        <div className="h-screen overflow-hidden absolute w-full">
            <TopBar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
            <canvas width={window.innerWidth} height={window.innerHeight} ref={canvasRef}></canvas>
        </div>
    );
};

function TopBar({
    selectedTool,
    setSelectedTool
}: {
    selectedTool: Tool;
    setSelectedTool: (s: Tool) => void;
}) {
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 p-1 pl-2 pr-2 rounded-lg flex gap-2">
            <IconButton 
                onClick={() => setSelectedTool("pencil")}
                activated={selectedTool === "pencil"}
                icon={<Pencil />}
            />
            <IconButton 
                onClick={() => setSelectedTool("rect")} 
                activated={selectedTool === "rect"} 
                icon={<RectangleHorizontalIcon />} 
            />
            <IconButton 
                onClick={() => setSelectedTool("circle")} 
                activated={selectedTool === "circle"} 
                icon={<Circle />} 
            />
            <IconButton 
                onClick={() => setSelectedTool("eraser")} 
                activated={selectedTool === "eraser"} 
                icon={<Eraser />}
            />
        </div>
    );
}
