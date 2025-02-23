
import { prisma } from "@/lib/prisma";

import {  NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){

    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id")

   
    

    const chats = await prisma.chat.findMany({
        
        where: {
            participants: {some: {userId: id ?? ""}}
        },
        
    
        select:{
            id: true,
            
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