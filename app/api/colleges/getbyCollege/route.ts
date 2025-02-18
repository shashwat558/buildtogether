import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){  
    const {searchParams} = new URL(req.url);

    const collegeName = searchParams.get("collegeName");

    if(!collegeName){
        return NextResponse.json({message: "incomplete request"});
    }

    try {
       const college = await prisma.college.findMany({
        where: {
            name: collegeName
        },
        select: {
            users: {
                omit: {
                    profileImage: true
                }
            }
        },
        
       }) 
       return NextResponse.json(college)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "server error"})
    }
}