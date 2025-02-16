import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const session = await auth();

    const {username} = await req.json();
    

    if(!session){
        return NextResponse.json({message: "unauthorized"}, {status: 400});

    }
    
        try {
            const user = await prisma.user.findUnique({
            where: {
                username: username?? ''
            }, 
            select: {
                username: true,
                college: {
                    select:{
                        name: true,
                        city: true
                    }
                },
                projects: {
                    select: {
                      title: true,
                      description: true,
                      currentlyWorking: true,
                      authorName: true,
                      githubLink: true
                    }
                },
                email: true,
                githubUsername: true,
                profileImage: true

            }
        })
        return NextResponse.json(user, {status: 200})
        } catch (error) {
            return NextResponse.json({message: error})
            
        }
    


}