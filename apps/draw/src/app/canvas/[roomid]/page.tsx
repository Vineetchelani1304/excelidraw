import { Canvas } from "@/components/RoomCanvas";

export default async function CanvasPage({params}:{
    params:{
        roomid: string
    }
}) {
    const roomId = (await params).roomid;
    console.log("roomId",roomId);
    return <Canvas roomId={roomId}/>
}
