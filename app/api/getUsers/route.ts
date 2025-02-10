import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);
    const query = searchParams.get("query");

    if(!query || query.length < 3){
        return NextResponse.json([]);
    }

    try {

        const users = await prisma.user.findMany({
            where:{
                username: {
                    contains: query,
                    mode: "insensitive"
                },
                
            },
            select: {
                username: true,
                profileImage: true
            }
        })

        return NextResponse.json(users);
        
    } catch (error) {
        return NextResponse.json({message: error}, {status: 500});
    }
}