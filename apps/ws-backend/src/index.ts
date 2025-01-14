import { WebSocketServer } from 'ws';


const wss = new WebSocketServer({ port: 5173 });

wss.on('connection',function Connection(socket){
    socket.on('message',function message(message: string){
        console.log('Received:', message);
        socket.send("pong");
    })
})