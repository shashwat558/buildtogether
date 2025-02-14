import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


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
            participants: true,
            messages: true,
        }

    })

    return NextResponse.json({chats})

}