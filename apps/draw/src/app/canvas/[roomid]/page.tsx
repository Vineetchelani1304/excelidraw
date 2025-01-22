"use client";
import { useEffect, useRef } from "react";

type Shape={
    x:number;
    y:number;
    width:number;
    height:number;
    type:"rect"
} | {
    centerx:number,
    centery:number,
    radius:number
    type:"circle"
}
export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const cxt = canvas.getContext("2d");
      if (!cxt) {
        return;
      }
      cxt.strokeStyle = "white"; // Set stroke color to white

      let clicked = false;
      let startx = 0;
      let starty = 0;
      const existingShape:Shape[]=[];

      const clearCanvas=()=>{
        cxt.clearRect(0, 0, canvas.width, canvas.height)
        existingShape.map((shape:Shape)=>{
            if(shape.type === "rect"){
                cxt.strokeRect(shape.x, shape.y, shape.width, shape.height)
            }
        })
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (clicked) {
          console.log("mouse move", e.clientX, e.clientY);
          const width = e.clientX - startx;
          const height = e.clientY - starty;
            clearCanvas();
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
        existingShape.push({
            type:"rect",
            height,
            width,
            x:startx,
            y:starty
         })
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
  }, [canvasRef]);

  return <canvas width="1080" height="1080" ref={canvasRef}></canvas>;
}
