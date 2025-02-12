import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const session = await auth();

    if(!session){
        return NextResponse.json({message: "Unauthorized"})

    }
    try {
        const pingId = await req.json();
        console.log("this is pingid: ", pingId)

        await prisma.notification.update({
            where: {
                id: pingId
            },
            data: {
                status: "accept"
            }
        }) 
        return NextResponse.json({message: "Ping accepted"})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Got an error"})
    }


}