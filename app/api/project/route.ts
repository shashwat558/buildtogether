import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";



import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const session = await auth();
    
    
    
        try {
            const username = session?.user?.username;
            const body = await req.json();

            const {title, description, githubLink, techStack, domain}:
            {title: string, description: string, githubLink: string, author: string, techStack: string[], domain: string} = body;

            const newProject = await prisma.project.create({
                data: {
                    techStack:techStack,
                    title: title,
                    Domain: domain,
                    description: description,
                    githubLink: githubLink,
                    author: {connect: {username: username ?? ""},
                    

                    

                    
                    
                },
                memberIds: [username ?? ""],
                membersCount: 1
                }
            })

            return NextResponse.json({newProject});

        } catch (error) {
            console.log(error)
        return NextResponse.json({error: "Got an error"}, {status: 500})
        }


    }


export async function GET(){
    const session = await auth();
    

    

    try{

        const projects = await prisma.project.findFirst({
            where: {
                authorName: session?.user?.username
            }, select :{
                authorName: true,
                title: true,
                description: true,
                currentlyWorking: true,
                githubLink: true
            }
        })

        return NextResponse.json({projects})

    }catch(error){
        
        console.log(error)
        return NextResponse.json({error: "Got an error"}, {status: 500})
    }

}

