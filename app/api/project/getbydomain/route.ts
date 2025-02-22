import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const domain = searchParams.get("domain");

    if(!domain) return;

    try {

        const projects = await prisma.project.findMany({
            where: {
                Domain: domain
            }
        })

        return NextResponse.json(projects)

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "got an error"})
    }
}