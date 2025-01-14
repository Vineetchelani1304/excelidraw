import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';
const wss = new WebSocketServer({ port: 5173 });

wss.on('connection',function Connection(socket,req){
    const url = req.url;
    const secret = JWT_SECRET || "mysecret";
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    const decoded = jwt.verify(token, secret);
    if(!decoded){
        socket.send("Unauthorized");
        socket.close();
        return; 
    }
    socket.on('message',function message(message: string){
        console.log('Received:', message);
        socket.send("pong");
    })
})