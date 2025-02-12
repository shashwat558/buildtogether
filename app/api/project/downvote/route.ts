import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const session = await auth();
    if(!session){
        NextResponse.json({message: "Unauthorized"})
        return;
    }

    const user = await prisma.user.findFirst({
        where: {
            email: session.user?.email?? ""
        }

    })
    if(!user){
        return NextResponse.json({message: "User not found"})
    }

    try {

        const data = await req.json();
        await prisma.upvote.delete({
            where: {
                userId_projectId: {
                    userId: user.id,
                    projectId: data.projectId
                }
            }
        })

        return NextResponse.json({message: "DownVoted succesfully"})
        
    } catch (error) {
      return NextResponse.json({message: error})
    }
}
