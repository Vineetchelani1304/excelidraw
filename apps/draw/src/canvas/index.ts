import { http_backend } from "@/config";
import axios from "axios";

type Shape = {
    x: number;
    y: number;
    width: number;
    height: number;
    type: "rect"
} | {
    centerx: number,
    centery: number,
    radius: number
    type: "circle"
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket:WebSocket) {
    const cxt = canvas.getContext("2d");
    const existingShape: Shape[] = await getExistingShape(roomId);
    if (!cxt) {
        return;
    }
    cxt.fillStyle = "rgba(0, 0, 0)";

    cxt.strokeStyle = "white"; 

    socket.onmessage=(event)=>{
        const message = JSON.parse(event.data);
        if(message.type === "chat"){
            const parsedMessage = JSON.parse(message.message);
            existingShape.push(parsedMessage);
            clearCanvas(cxt, canvas, existingShape)

        }
    }
    clearCanvas(cxt, canvas, existingShape)
    let clicked = false;
    let startx = 0;
    let starty = 0;

    const handleMouseMove = (e: MouseEvent) => {
        if (clicked) {
            console.log("mouse move", e.clientX, e.clientY);
            const width = e.clientX - startx;
            const height = e.clientY - starty;
            clearCanvas(cxt, canvas, existingShape);
            cxt.strokeRect(startx, starty, width, height);
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        clicked = true;
        startx = e.clientX;
        starty = e.clientY;
        console.log("mouse down", e.clientX, e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
        clicked = false;
        console.log("mouse up", e.clientX, e.clientY);
        const width = e.clientX - startx;
        const height = e.clientY - starty;
        const shape:Shape = {
            type: "rect",
            height,
            width,
            x: startx,
            y: starty
        }
        existingShape.push(shape)

        socket.send(JSON.stringify({
            type : "chat",
            message : JSON.stringify(shape)
        }))
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


export async function getExistingShape(roomId: string) {
    const res = await axios.get(`${http_backend}/v1/chats/${roomId}`);
    const message = res.data.message;
    console.log("message",message)
    const shapes = message.map((x: { message: string }) => {
        const messagedata = JSON.parse(x.message);
        return messagedata;
    })
    return shapes;
}

const clearCanvas = (cxt: CanvasRenderingContext2D, canvas: HTMLCanvasElement, existingShape: Shape[]) => {
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    existingShape.map((shape: Shape) => {
        if (shape.type === "rect") {
            cxt.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
    })
}