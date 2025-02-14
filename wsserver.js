import { PrismaClient } from "@prisma/client";
import  {WebSocketServer} from "ws"


const prisma = new PrismaClient();

//initiate a websocket server on port 4000

const wss = new WebSocketServer({port: 4000});

//type of userSocket ex:- {user123: websocket{...}}

//stores the user ex:- users:{user123:websocket{...}}
const users = {};

//initiates the connection
wss.on("connection", (ws) => {
    //when a message arrives
    try{
        ws.on("message", async (message) => {

        const data = JSON.parse(message.toString());

        console.log("Recieved message data", data)
    //check if data is for registering
        if(data.type === "register"){
            //if yes then add it to the users object
            users[data.userId] = ws
        //checks if data type is ping 
        }if(data.type=== "chatMessage"){

            try {
                const [participants, message] = await prisma.$transaction([
                prisma.message.create({
                    data: {

                        chatId: data.chatId,
                        content: data.content,
                        senderId: data.senderId

                    },
                    include: {
                        sender: true
                    }
                }),
                prisma.participants.findMany({
                    where: {
                        chatId: data.chatId
                    },
                    select: {
                        userId: true
                    }
                })
            ])

            participants.forEach(({userId}) => {
                const userSocket = users[userId]
                if(userSocket){
                    userSocket.send(
                        JSON.stringify({
                            type: "chatMessage",
                            chatId: message.chatId,
                            content: message.content,
                            senderId: message.senderId,
                            senderName: message.sender.username,
                            timeStamp: message.timeStamp
                        })
                    )
                }
            })
                
            } catch (error) {
                console.log(error)
                
            }

            

        }else if(data.type === "ping"){
            //add the data in db
            await prisma.notification.create({
                data: {
                    projectId : data.projectId,
                    senderId: data.senderId,
                    projectName: data.projectName,
                    receiverId: data.targetedUserId
                }
            })
            //check what is the targeted socket 
            //ex:- users[user234] = ws--> this is targeted socket
            
            const targetedSocket = users[data.targetedUserId];
            // if target socket then ping
            if(targetedSocket){
                targetedSocket.send(
                    JSON.stringify({type: "ping",senderName: data.senderName, senderId: data.senderId, projectId: data.projectId, projectName: data.projectName})
                );
            };
             

        };
    });
} catch(error){
    console.log(error)
}
    //after all close the request
    
    ws.on("close", () => {
        Object.keys(users).forEach((userId) => {
            if(users[userId] === ws){
                delete users[userId]

            }
        })
    })
});


console.log("web socket server running on ws://localhost:4000")