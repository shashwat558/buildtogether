import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const session = await auth();

    if(!session){
        return NextResponse.json({message: "Unauthorized request"})
    }

    try {


        const {userId2} = await req.json();
        console.log(userId2)

        const chatAlreadyExist = await prisma.chat.findFirst({
            where: {
                AND: [
                    {participants: {some: {userId: session.user?.id}}},
                    {participants: {some: {userId: userId2}}}
                ]
            }
        })

        if(chatAlreadyExist){
            return NextResponse.json({message: "chat already exist", chatId: chatAlreadyExist.id}, {status: 200})
        }
        

        const newChat = await prisma.chat.create({
            data: {
                participants: {
                    create: [
                        {userId: session.user?.id ?? ""},
                        {userId: userId2}
                    ]
                }
            },
            include: {
                participants: true
            }
        })

        return NextResponse.json({message: "successfully created chat", chatId: newChat.id})
        


    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An error occured"})
    }

}