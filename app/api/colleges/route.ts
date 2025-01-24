import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get("query");

    if(!query || query.length < 3){
        return NextResponse.json([]);

    }

    try {
        const colleges = await prisma.college.findMany({
            where:{
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            },
            select: {
                name: true,
                id: true
            },
            
        });
        return NextResponse.json(colleges);

    } catch (error) {
        console.log("error in fetching colleges", error);
        return NextResponse.json({error: "Failed in fetching colleges"})
        
    }
}