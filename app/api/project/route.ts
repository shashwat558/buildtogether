import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const session = await auth();
    if(!session){
        return null
    }
    
        try {
            const userId = session.user?.id;
            const body = await req.json();

            const {title, description, githubLink}:
            {title: string, description: string, githubLink: string, author: string} = body;

            const newProject = await prisma.project.create({
                data: {
                    title: title,
                    description: description,
                    githubLink: githubLink,
                    author: { connect: { id: userId } }
                }
            })

            return NextResponse.json({newProject})

        } catch (error) {
            console.log(error)
        }


    }


