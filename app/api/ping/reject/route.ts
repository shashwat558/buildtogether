import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const session = await auth();

    if(!session){
        return NextResponse.json({message: "Unauthorized"});
    }

    try {
        const body = await req.json();
        await prisma.notification.delete({
            where:{
                id: body.id
            }
        })

        return NextResponse.json({message: "Ping rejected"});

        
    } catch (error) {
       return NextResponse.json({message: error})   
    }
}