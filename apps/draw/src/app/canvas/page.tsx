"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { http_backend } from "../../config";
import { Grid, UserPlus, LogIn } from "lucide-react";

export default function RoomPage() {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.target.value);
    };

    const handleJoinRoom = async () => {
        if (!roomId.trim()) {
            setError("Room ID is required");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`${http_backend}/room/${roomId}`); 
            const data = res.data;
            console.log("data",data)
    
            if (!data.room) throw new Error("Room not found");
    
            router.push(`/canvas/${data.room.id}`);
        } catch (e) {
            setError("Failed to join room");
            console.log("Error occurred", e);
        } finally {
            setLoading(false);
        }
    };
    

    const handleCreateRoom = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const slug = roomId || generateSlug(); 

            const res = await axios.post(
                `${http_backend}/room`,
                { slug }, 
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            const data = res.data;
            console.log("data", data)
            if (!data.roomId) throw new Error("Room creation failed");
            router.push(`/canvas/${data.roomId}`);
        } catch (error) {
            setError("Failed to create room");
            console.log("Error creating room", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to generate a unique slug (room ID)
    const generateSlug = () => {
        return `room-${Math.random().toString(36).substring(2, 8)}`;
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-lg p-10 space-y-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Grid className="h-10 w-10 text-blue-600" />
                        <span className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">DrawSheet</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Join or Create a Room</h2>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={roomId}
                        onChange={handleInputChange}
                        placeholder="Enter Room ID or leave empty to generate"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={handleJoinRoom}
                        disabled={loading}
                        className={`w-full flex items-center justify-center py-3 text-lg font-semibold text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                            } focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        <LogIn className="mr-2" /> {loading ? "Joining..." : "Join Room"}
                    </button>
                    <button
                        onClick={handleCreateRoom}
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 text-lg font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <UserPlus className="mr-2" /> Create Room
                    </button>
                </div>
            </div>
        </div>
    );
}
