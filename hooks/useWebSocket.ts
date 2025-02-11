import { useEffect, useRef, useState } from "react"

const WSS_URL = "ws://localhost:4000";

interface PingProps {
    senderId: string;
    type: "ping";
    targetedUserId: string,
    projectId: string,
    projectName: string,
    senderName: string
}

const UsePingWebSocket = ({userId}:{userId: string}) => {
    const socketRef = useRef<WebSocket | null>(null);
    

    const [recievedPings, setReceivedPings] = useState<PingProps[] | null>(null);

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        if(!userId || socketRef.current) return ;
        console.log("J");
        const socket = new WebSocket(WSS_URL);
        socketRef.current = socket
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
            socketRef.current = null;
        }

        setWs(socket);
      
    },[userId]);


    const sendPing = ({receiverId, projectId, projectName, senderName
    }: {receiverId: string, projectId: string, projectName: string, senderName: string}) => {

        console.log(receiverId);
        if(ws && ws.readyState === WebSocket.OPEN){
            const message: PingProps = {type: "ping", senderId: userId, targetedUserId: receiverId, projectId: projectId, projectName: projectName, senderName: senderName};
            ws.send(JSON.stringify(message))
        }
    };

    return {recievedPings, sendPing};
}


export default UsePingWebSocket;


