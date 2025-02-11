import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const session = await auth();

    if(!session){
        return NextResponse.json({message: "Unauthorized"})
    }

    const user = await prisma.user.findFirst({
        where: {
            email: session.user?.email ?? ""
        }

    })

    if(!user){
        return NextResponse.json({message: "Unauthorizes"})
    };

    try {

        const data = await req.json();

        const alreadyVoted = await prisma.upvote.findFirst({
            where: {
                userId: user.id,
                projectId: data.projectId
            }
        });
        if(alreadyVoted){
            return NextResponse.json({message: "You have already voted on this project"}, {status: 400})
        }

        await prisma.upvote.create({
            data: {
                userId: user.id,
                projectId: data.projectId
            }
        })

        return NextResponse.json({message: "Voted succesfully"});
        
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}