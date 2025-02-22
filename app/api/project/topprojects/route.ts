import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    
    const topProjects = await prisma.project.findMany({
        include: {
           _count: {
             select: {
                upvotes: true
             }
           },
           
            
        },
        orderBy : {
            upvotes: {
                _count: "desc"
            }
        }
    })

    return NextResponse.json(topProjects)
}