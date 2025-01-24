import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const {userId, username, collegeId} = body;

    console.log("reached here")
    

    if(!userId || !username){
        return NextResponse.json({
            error: "Missing required feilds",
        },{
            status: 400
        })
    }
    console.log("hii")
    const updatedUser = await prisma.user.update({
        where:{
            id: userId
        },
        data: {
            username: username || null,
            collegeId: collegeId || null
        }
    })
    console.log("here")
    return NextResponse.json({success: true, message: "Profile update succesfully", user: updatedUser}, {status: 200})
}