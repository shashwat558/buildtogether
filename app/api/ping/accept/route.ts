import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const session = await auth();
    
    
    if(!session){
        return NextResponse.json({message: "Unauthorized"})

    }
    try {
        
        const body = await req.json();
        console.log("this is body",body)
        
        console.log("this is pingid: ", body.id)

        const transaction = await prisma.$transaction([
            prisma.notification.delete({
                where: {
                    id: body.id
                },
                
            }),

            prisma.project.update({
                where:{
                    id: body.projectId
                },
                data:{
                    memberIds : {connect: {id: body.senderName }},
                    membersCount: {increment: 1}
                }
            })
        ])
        
        return NextResponse.json({message: "Ping accepted", transaction})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Got an error"})
    }


}