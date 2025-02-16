import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url);

    const userId = searchParams.get("userId");

    if(!userId){
        return NextResponse.json({message: "User Id is required"}, {status: 500});
    }

   try{ const pings = await prisma.notification.findMany({
        where: {
            receiverId: userId
        },
        include: {
           
            sender: {select: {
                username: true,
                
            }},
            project: {select: {title: true}}
            
        },
        orderBy: {
            createdAt: "desc"
        }
    })
   

    return NextResponse.json(pings);
    } catch(error){
        
        return NextResponse.json(error)
    }
    
}