import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";

import {  NextResponse } from "next/server";


export async function GET(){

    const session = await auth()

    if(!session){
        return NextResponse.json({message: "Unauthorized request"});
    }
    

    const chats = await prisma.chat.findMany({
        
        where: {
            participants: {some: {userId: session.user?.id}}
        },
        
    
        include:{
            
            participants: {
                select: {sender: {select: {username: true, profileImage: true, lastSeen: true, isOnline: true}},
                userId: true, 
            },
                
                                    

        },
            messages: true,
            
        }

    })
   

    return NextResponse.json({chats})

}