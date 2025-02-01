import { http_backend } from "@/config";
import axios from "axios";

export type Shape = {
          x: number;
          y: number;
          width: number;
          height: number;
          type: "rect";
      }
    | {
          centerx: number;
          centery: number;
          radius: number;
          type: "circle";
      }
    | {
          path: { x: number; y: number }[];
          type: "pencil";
      };

export async function initDraw(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket
) {
    const cxt = canvas.getContext("2d");
    const existingShape: Shape[] = await getExistingShape(roomId);
    console.log("Existing Shapes:", existingShape);

    if (!cxt) {
        return;
    }
    cxt.fillStyle = "rgba(0, 0, 0)";
    cxt.strokeStyle = "white";

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "chat") {
            const parsedMessage = JSON.parse(message.message);
            existingShape.push(parsedMessage.shape || parsedMessage);
            clearCanvas(cxt, canvas, existingShape);
        }
    };
    clearCanvas(cxt, canvas, existingShape);

    let clicked = false;
    let startx = 0;
    let starty = 0;
    let currentPath: { x: number; y: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
        if (!clicked) return;
        //@ts-ignore
        const selectedTool = window.selectedTool;

        if (selectedTool === "rect") {
            const width = e.clientX - startx;
            const height = e.clientY - starty;
            clearCanvas(cxt, canvas, existingShape);
            cxt.strokeRect(startx, starty, width, height);
        } else if (selectedTool === "circle") {
            const radius = Math.sqrt(
                Math.pow(e.clientX - startx, 2) + Math.pow(e.clientY - starty, 2)
            );
            clearCanvas(cxt, canvas, existingShape);
            cxt.beginPath();
            cxt.arc(startx, starty, radius, 0, 2 * Math.PI);
            cxt.stroke();
        } else if (selectedTool === "pencil") {
            currentPath.push({ x: e.clientX, y: e.clientY });
            clearCanvas(cxt, canvas, existingShape);
            cxt.beginPath();
            cxt.moveTo(currentPath[0].x, currentPath[0].y);
            currentPath.forEach((point) => cxt.lineTo(point.x, point.y));
            cxt.stroke();
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        clicked = true;
        startx = e.clientX;
        starty = e.clientY;
        currentPath = [{ x: e.clientX, y: e.clientY }];
    };

    const handleMouseUp = (e: MouseEvent) => {
        clicked = false;
        //@ts-ignore
        const selectedTool = window.selectedTool;

        if (selectedTool === "rect") {
            const width = e.clientX - startx;
            const height = e.clientY - starty;
            const shape: Shape = { type: "rect", height, width, x: startx, y: starty };
            existingShape.push(shape);
            sendShape(socket, shape, roomId);
        } else if (selectedTool === "circle") {
            const radius = Math.sqrt(
                Math.pow(e.clientX - startx, 2) + Math.pow(e.clientY - starty, 2)
            );
            const shape: Shape = { type: "circle", centerx: startx, centery: starty, radius };
            existingShape.push(shape);
            sendShape(socket, shape, roomId);
        } else if (selectedTool === "pencil") {
            const shape: Shape = { type: "pencil", path: currentPath };
            existingShape.push(shape);
            sendShape(socket, shape, roomId);
        }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mouseup", handleMouseUp);
    };
}

async function getExistingShape(roomId: string) {
    const res = await axios.get(`${http_backend}/v1/chats/${roomId}`);
    const message = res.data.messages;
    return message
        .map((x: { message: string }) => {
            try {
                const data = JSON.parse(x.message);
                return data.shape || data;
            } catch {
                return null;
            }
        })
        .filter(Boolean);
}

function clearCanvas(cxt: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shapes: Shape[]) {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
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
    socket.send(
        JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            room: roomId,
        })
    );
}
