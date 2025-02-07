import { useEffect, useState } from "react"

const WSS_URL = "wss://localhost:3000";

interface PingProps {
    senderId: string;
    type: "ping";
    receiverId: string
}

const UsePingWebSocket = (userId: string) => {
    

    const [recievedPings, setReceivedPings] = useState<PingProps[] | null>(null);

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {

        const socket = new WebSocket(WSS_URL);
        socket.onopen = () => {
            console.log("Websocket connection started");

            socket.send(JSON.stringify({type: "register", userId: userId}));
        };

        socket.onmessage = (event) => {
            
            const data: PingProps = JSON.parse(event.data);

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


    const sendPing = (receiverId: string) => {
        if(ws && ws.readyState === WebSocket.OPEN){
            const message: PingProps = {type: "ping", senderId: userId, receiverId: receiverId};
            ws.send(JSON.stringify(message))
        }
    };

    return {recievedPings, sendPing};
}


export default UsePingWebSocket;


