import { useEffect, useState } from "react"

const WSS_URL = "ws://localhost:4000";

interface PingProps {
    senderId: string;
    type: "ping";
    targetedUserId: string,
    projectName: string
}

const UsePingWebSocket = ({userId}:{userId: string}) => {
    

    const [recievedPings, setReceivedPings] = useState<PingProps[] | null>(null);

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        console.log("J");
        const socket = new WebSocket(WSS_URL);
        socket.onopen = () => {
            console.log("Websocket connection started");

            socket.send(JSON.stringify({type: "register", userId: userId}));
        };
        console.log("H")
        socket.onmessage = (event) => {
            
            const data: PingProps = JSON.parse(event.data);
            console.log("fdl")
            if(data.type === "ping"){
                console.log("received ping", data);
                setReceivedPings((prev) => (prev ? [...prev, data] : [data]))

            }
        };
        socket.onclose = () => {
            console.log("connection ended")
        }

        setWs(socket);
      
    },[userId]);


    const sendPing = ({receiverId, projectName}: {receiverId: string, projectName: string}) => {

        console.log(receiverId);
        if(ws && ws.readyState === WebSocket.OPEN){
            const message: PingProps = {type: "ping", senderId: userId, targetedUserId: receiverId, projectName: projectName};
            ws.send(JSON.stringify(message))
        }
    };

    return {recievedPings, sendPing};
}


export default UsePingWebSocket;


