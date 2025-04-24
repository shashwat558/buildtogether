import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get("projectId");
    
    if(!projectId){
        return NextResponse.json({message: "Incomplete request"})

    }

    try {

        const comments = await prisma.comment.findMany({
            where: {
                projectId: projectId
            }
        })
        
        return NextResponse.json({comments})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Got an error"})
    }


}

export async function POST(req: NextRequest){
    const { userId, projectId, content }: { userId: string; projectId: string; content: string } = await req.json();

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }

    })
    if(!user){
        return NextResponse.json({message: 'User not exist'})
    }

    if(!userId || !projectId){
        return NextResponse.json({message:"Invalid request"});
    }
    try {
        await prisma.comment.create({
            data: {
                user: {
                    connect: { id: userId }
                },
                project: {
                    connect: { id: projectId }
                },
                content: content
            }
        })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Got an error"})
    }


}


export async function DELETE(req:NextRequest){
    const {commentId} = await req.json();

    await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

    return NextResponse.json({message: "Comment deleted succesfully"})
}