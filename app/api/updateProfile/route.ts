import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {userId, username, college} = await req.json();

    if(!userId || !username){
        return NextResponse.json({
            error: "Missing required feilds",
        },{
            status: 400
        })
    }
    const updatedUser = await prisma.user.update({
        where:{
            id: userId
        },
        data: {
            username,
            college: {connect: {id: collegeI}}
        }
    })
    
}