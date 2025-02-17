import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const session = await auth();
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get("projectId");
    if(!session){
        return NextResponse.json({message: "Unauthorized"})
    }
    if(!searchParams || !projectId) {

        return NextResponse.json({message: "Incomplete request"})
    }

    try {
        const project = await prisma.project.findFirst({
            where: {
                id: projectId
            }
        })

        return NextResponse.json(project);
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "Got an error"})
    }
}
