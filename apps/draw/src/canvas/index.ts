import { http_backend } from "@/config";
import axios from "axios";

export type Shape = 
    | { x: number; y: number; width: number; height: number; type: "rect" }
    | { centerx: number; centery: number; radius: number; type: "circle" }
    | { path: { x: number; y: number }[]; type: "pencil" };

const existingShapes: Shape[] = []; // Store shapes persistently

export async function initDraw(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket
) {
    const cxt = canvas.getContext("2d");
    if (!cxt) return;

    cxt.fillStyle = "rgba(0, 0, 0)";
    cxt.strokeStyle = "white";

    // Fetch stored shapes and update the array
    const fetchedShapes = await getExistingShape(roomId);
    existingShapes.length = 0; // Clear array but retain reference
    existingShapes.push(...fetchedShapes); // Add fetched shapes

    console.log("Existing Shapes:", existingShapes);
    clearCanvas(cxt, canvas, existingShapes);

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "chat" && message.shape) {
            existingShapes.push(message.shape);
            clearCanvas(cxt, canvas, existingShapes);
        }
    };

    socket.onclose = () => {
        console.log("WebSocket disconnected. Reconnecting...");
        setTimeout(() => initDraw(canvas, roomId, new WebSocket(socket.url)), 1000);
    };

    let clicked = false;
    let startx = 0;
    let starty = 0;
    let currentPath: { x: number; y: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
        if (!clicked) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        //@ts-ignore
        const selectedTool = window.selectedTool;

        if (selectedTool === "rect") {
            clearCanvas(cxt, canvas, existingShapes);
            cxt.strokeRect(startx, starty, x - startx, y - starty);
        } else if (selectedTool === "circle") {
            const radius = Math.sqrt(Math.pow(x - startx, 2) + Math.pow(y - starty, 2));
            clearCanvas(cxt, canvas, existingShapes);
            cxt.beginPath();
            cxt.arc(startx, starty, radius, 0, 2 * Math.PI);
            cxt.stroke();
        } else if (selectedTool === "pencil") {
            currentPath.push({ x, y });
            clearCanvas(cxt, canvas, existingShapes);
            cxt.beginPath();
            cxt.moveTo(currentPath[0].x, currentPath[0].y);
            currentPath.forEach((point) => cxt.lineTo(point.x, point.y));
            cxt.stroke();
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        clicked = true;
        const rect = canvas.getBoundingClientRect();
        startx = e.clientX - rect.left;
        starty = e.clientY - rect.top;
        currentPath = [{ x: startx, y: starty }];
    };

    const handleMouseUp = (e: MouseEvent) => {
        clicked = false;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        //@ts-ignore
        const selectedTool = window.selectedTool;

        let shape: Shape;
        if (selectedTool === "rect") {
            shape = { type: "rect", x: startx, y: starty, width: x - startx, height: y - starty };
        } else if (selectedTool === "circle") {
            shape = { type: "circle", centerx: startx, centery: starty, radius: Math.sqrt(Math.pow(x - startx, 2) + Math.pow(y - starty, 2)) };
        } else {
            shape = { type: "pencil", path: currentPath };
        }

        existingShapes.push(shape);
        sendShape(socket, shape, roomId);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
}

async function getExistingShape(roomId: string) {
    try {
        console.log("roomId for existing shapes",roomId);
        const res = await axios.get(`${http_backend}/chats/${roomId}`);
        console.log("strokes in this room",res.data.messages)
        return res.data.messages
            .map((x: { message: string }) => {
                try {
                    return JSON.parse(x.message);
                } catch {
                    return null;
                }
            })
            .filter(Boolean);
    } catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}

function clearCanvas(cxt: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shapes: Shape[]) {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.strokeStyle = "white"; // Ensure all strokes are white

    shapes.forEach((shape) => {
        if (shape.type === "rect") {
            cxt.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            cxt.beginPath();
            cxt.arc(shape.centerx, shape.centery, shape.radius, 0, 2 * Math.PI);
            cxt.stroke();
        } else if (shape.type === "pencil") {
            cxt.beginPath();
            cxt.moveTo(shape.path[0].x, shape.path[0].y);
            shape.path.forEach((point) => cxt.lineTo(point.x, point.y));
            cxt.stroke();
        }
    });
}

function sendShape(socket: WebSocket, shape: Shape, roomId: string) {
    socket.send(JSON.stringify({ type: "chat", shape, room: roomId }));
}
