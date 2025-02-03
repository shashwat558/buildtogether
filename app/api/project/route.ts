import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const session = await auth();
    if(!session){
        return null
    }
    
        try {
            const username = session.user?.username;
            const body = await req.json();

            const {title, description, githubLink}:
            {title: string, description: string, githubLink: string, author: string} = body;

            const newProject = await prisma.project.create({
                data: {
                    title: title,
                    description: description,
                    githubLink: githubLink,
                    author: {connect: {username: username ?? ""}}
                }
            })

            return NextResponse.json({newProject});

        } catch (error) {
            console.log(error)
        }


    }


export async function GET(){
    const session = await auth();
    if(!session){
        return null;
    }

    try{

        const projects = await prisma.project.findMany({
            where: {
                authorName: session.user?.username
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
    }

}

