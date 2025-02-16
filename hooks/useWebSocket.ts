import { useEffect, useRef, useState } from "react"

const WSS_URL = "wss://buildtogether-jamp.onrender.com";

export interface PingProps {
    senderId: string;
    type: "ping";
    pingId? : string,
    targetedUserId: string,
    projectId: string,
    projectName: string,
    senderName: string
}
interface ChatMessageProps {
    type: "chatMessage",
    chatId: string
    content: string
    senderId: string
    senderName: {username: string}
    timeStamp: Date

}
const UsePingWebSocket = ({userId}:{userId: string}) => {
    const socketRef = useRef<WebSocket | null>(null);
    

    const [recievedPings, setReceivedPings] = useState<PingProps[] | null>(null);
    const [messages, setMessages] = useState<ChatMessageProps[] | null>(null)

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        if(!userId || socketRef.current) return ;
        
        const socket = new WebSocket(WSS_URL);
        socketRef.current = socket
        socket.onopen = () => {
            

            socket.send(JSON.stringify({type: "register", userId: userId}));
        };
        
        socket.onmessage = (event) => {
            
            const data = JSON.parse(event.data);
            
            if(data.type === "ping"){
                
                setReceivedPings((prev) => (prev ? [...prev, data] : [data]))

            }
            if(data.type === "chatMessage"){
                
                setMessages((prev) => (prev ? [...prev, data] : [data]));
            }
            
        };
        socket.onclose = () => {
           
            socketRef.current = null;
        }

        setWs(socket);
      
    },[userId]);


    const sendPing = ({receiverId, projectId, projectName, senderName
    }: {receiverId: string, projectId: string, projectName: string, senderName: string}) => {

        
        if(ws && ws.readyState === WebSocket.OPEN){
            const message: PingProps = {type: "ping", senderId: userId, targetedUserId: receiverId, projectId: projectId, projectName: projectName, senderName: senderName};
            ws.send(JSON.stringify(message))
        }
    };

    

    const sendMessage = ({chatId, content, senderId, senderName, timeStamp}:{
        chatId: string, content: string, senderId: string, senderName: {username: string}, timeStamp: Date
    }) => {
        if(ws && ws.readyState === WebSocket.OPEN){
          try { const message: ChatMessageProps = {
                type: "chatMessage",
                chatId: chatId,
                content: content,
                senderId: senderId,
                senderName: senderName,
                timeStamp: timeStamp
            };
            ws.send(JSON.stringify(message))
        }catch{
            console.log("something happened")
            
        }
            
        }

    }

    return {sendPing, recievedPings, messages, sendMessage}
}


export default UsePingWebSocket;


