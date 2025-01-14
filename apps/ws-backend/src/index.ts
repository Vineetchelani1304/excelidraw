import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
const wss = new WebSocketServer({ port: 5173 });

wss.on('connection', function Connection(socket, req: any) {
    const url = req.url;
    const secret = JWT_SECRET || "mysecret";

    if (!url) {
        socket.send("Unauthorized: Missing URL");
        socket.close();
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        if (!decoded || !decoded.id) {
            socket.send("Unauthorized");
            socket.close();
            return;
        }
    } catch (error) {
        socket.send("Unauthorized: Invalid token");
        socket.close();
        return;
    }

    socket.on('message', function message(message: string) {
        console.log('Received:', message);
        socket.send("pong");
    });
});
