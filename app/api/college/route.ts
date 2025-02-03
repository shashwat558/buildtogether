import { auth } from "@/app/auth"
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await auth();
    if(!session){
        return null;
    }
    const college = await prisma.user.findFirst({
        where: {
            id: session.user?.id
        }, select: {
            college: {
                select: {
                    name: true
                }
            }
        }
        

    })
    const collegeStudnets = await prisma.college.findMany({
        where: {
            name: college?.college?.name
        }, select: {
            users: {
                select: {
                    username: true,
                    githubUsername: true,
                    
                }
            }
        }
    })
    console.log(collegeStudnets);
    return NextResponse.json(collegeStudnets)
   
}