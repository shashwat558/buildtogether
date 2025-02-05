import WebSocket, {WebSocketServer} from "ws"
import { prisma } from "./lib/prisma";

//initiate a websocket server on port 4000

const wss = new WebSocketServer({port: 4000});

//type of userSocket ex:- {user123: websocket{...}}
interface UserSockets {
    [userId: string] : WebSocket; 

}
//stores the user ex:- users:{user123:websocket{...}}
const users: UserSockets = {};

//initiates the connection
wss.on("connection", (ws) => {
    //when a message arrives
    ws.on("message", async (message) => {
        const data = JSON.parse(message.toString());
    //check if data is for registering
        if(data.type === "register"){
            //if yes then add it to the users object
            users[data.userId] = ws
        //checks if data type is ping 
        }else if(data.type === "ping"){
            //add the data in db
            await prisma.notification.create({
                data: {
                    senderId: data.userId,
                    receiverId: data.targetedUserId
                }
            })
            //check what is the targeted socket 
            //ex:- users[user234] = ws--> this is targeted socket
            
            const targetedSocket = users[data.targetedUserId];
            // if target socket then ping
            if(targetedSocket){
                targetedSocket.send(
                    JSON.stringify({type: "ping", from: data.userId})
                );
            };
             

        };
    });
    //after all close the request
    
    ws.on("close", () => {
        Object.keys(users).forEach((userId) => {
            if(users[userId] === ws){
                delete users[userId]

            }
        })
    })
});