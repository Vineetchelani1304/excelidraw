// import { WebSocketServer, WebSocket } from 'ws';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { JWT_SECRET } from '@repo/backend-common/config';
// import { client } from "@repo/db/client";
// const wss = new WebSocketServer({ port: 3333 });

// interface User {
//     ws: WebSocket;
//     userId: string;
//     rooms: string[];
// }

// const users: User[] = [];

// wss.on('connection', (socket, req: any) => {
//     const url = req.url;
//     const secret = JWT_SECRET || "mysecret";

//     if (!url) {
//         socket.send(JSON.stringify({ error: "Unauthorized: Missing URL" }));
//         socket.close();
//         return;
//     }

//     const queryParams = new URLSearchParams(url.split("?")[1]);
//     const token = queryParams.get("token") || "";

//     let userId: string;
//     try {
//         const decoded = jwt.verify(token, secret) as JwtPayload;
//         if (!decoded || !decoded.id) {
//             socket.send(JSON.stringify({ error: "Unauthorized: Invalid token" }));
//             socket.close();
//             return;
//         }
//         userId = decoded.id;

//         users.push({ ws: socket, userId, rooms: [] });

//         console.log(`User connected: ${userId}`);
//     } catch (error) {
//         socket.send(JSON.stringify({ error: "Unauthorized: Invalid token" }));
//         socket.close();
//         return;
//     }

//     socket.on('message', async (message) => {
//         try {
//             const parsedMessage = JSON.parse(message as unknown as string);
//             console.log("Received message:", parsedMessage);
//             if (parsedMessage.type === "join" && parsedMessage.room) {
//                 const user = users.find((user) => user.ws === socket);
//                 if (user) {
//                     user.rooms.push(parsedMessage.room);
//                     console.log(`User ${user.userId} joined room: ${parsedMessage.room}`);
//                 }
//             }
//             if (parsedMessage.type === "ping") {
//                 socket.send(JSON.stringify({ type: "pong" }));
//             }

//             if (parsedMessage.type === "chat" && parsedMessage.room && parsedMessage.message) {
//                 const user = users.find((user) => user.ws === socket);
//                 if (user) {
//                     const existingRoom = user.rooms.find((room) => {
//                         return room === parsedMessage.room;
//                     })
//                     if (!existingRoom) {
//                         socket.send(JSON.stringify({ error: "User not in room" }));
//                         return;
//                     }
//                     const message = parsedMessage.message;

//                     await client.chat.create({
//                         data: {
//                             message: parsedMessage.message,
//                             roomId: parseInt(parsedMessage.room),
//                             userId: parseInt(user.userId),
//                         }
//                     })

//                     users.forEach((user) => {
//                         if (user.rooms.includes(parsedMessage.room)) {
//                             user.ws.send(JSON.stringify({ type: "chat", room: parsedMessage.room, message: message }));
//                         }
//                     });

//                 }
//             }

//             if (parsedMessage.type === "leave" && parsedMessage.room) {
//                 const user = users.find((user) => user.ws === socket);
//                 if (user) {
//                     users.filter((user) => user.ws === socket).forEach((user) => {
//                         user.rooms = user.rooms.filter((room) => room !== parsedMessage.room);
//                         console.log(`User ${user.userId} left room: ${parsedMessage.room}`);
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error("Error handling message:", error);
//             socket.send(JSON.stringify({ error: "Invalid message format" }));
//         }
//     });

//     socket.on('close', () => {
//         console.log(`User disconnected: ${userId}`);
//         const index = users.findIndex((user) => user.ws === socket);
//         if (index !== -1) {
//             users.splice(index, 1);
//         }
//     });

//     socket.on('error', (error) => {
//         console.error(`WebSocket error for user ${userId}:`, error);
//     });
// });



import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 3333 });

interface User {
    ws: WebSocket;
    userId: string;
    rooms: Set<string>;
}

const users = new Map<WebSocket, User>();

wss.on('connection', (socket, req: any) => {
    const url = req.url;
    const secret = JWT_SECRET || "mysecret";

    if (!url) {
        socket.send(JSON.stringify({ error: "Unauthorized: Missing URL" }));
        socket.close();
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";

    let userId: string;
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        if (!decoded || !decoded.id) {
            socket.send(JSON.stringify({ error: "Unauthorized: Invalid token" }));
            socket.close();
            return;
        }
        userId = decoded.id;

        users.set(socket, { ws: socket, userId, rooms: new Set() });

        console.log(`User connected: ${userId}`);
    } catch (error) {
        socket.send(JSON.stringify({ error: "Unauthorized: Invalid token" }));
        socket.close();
        return;
    }

    socket.on('message', async (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            console.log("Received message:", parsedMessage);
            const user = users.get(socket);
            if (!user) return;

            if (parsedMessage.type === "join" && parsedMessage.room) {
                user.rooms.add(parsedMessage.room);
                console.log(`User ${user.userId} joined room: ${parsedMessage.room}`);
            }

            if (parsedMessage.type === "ping") {
                socket.send(JSON.stringify({ type: "pong" }));
            }

            if (parsedMessage.type === "draw" && parsedMessage.room && parsedMessage.shape) {
                if (!user.rooms.has(parsedMessage.room)) {
                    socket.send(JSON.stringify({ error: "User not in room" }));
                    return;
                }

                users.forEach((u) => {
                    if (u.rooms.has(parsedMessage.room)) {
                        u.ws.send(JSON.stringify({ type: "draw", room: parsedMessage.room, shape: parsedMessage.shape }));
                    }
                });
            }

            if (parsedMessage.type === "leave" && parsedMessage.room) {
                user.rooms.delete(parsedMessage.room);
                console.log(`User ${user.userId} left room: ${parsedMessage.room}`);
            }
        } catch (error) {
            console.error("Error handling message:", error);
            socket.send(JSON.stringify({ error: "Invalid message format" }));
        }
    });

    socket.on('close', () => {
        console.log(`User disconnected: ${userId}`);
        users.delete(socket);
    });

    socket.on('error', (error) => {
        console.error(`WebSocket error for user ${userId}:`, error);
    });
});
