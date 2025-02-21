import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest){
   const { userMessage, history } = await req.json();
   if(!userMessage) return;

   try {



    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY ?? "");
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

    
    const chat = model.startChat({history})

    const result = await chat.sendMessage(userMessage);
    const botResponse = result.response.text();

    const updatedHistory = [
        ...history,
        {role: "user", parts: [{text: userMessage}]}, {role: "model", parts: [{text: botResponse}] }
    ]
    console.log(updatedHistory)


    return NextResponse.json({response: result.response.text(), history: updatedHistory})

    
   } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Got an error getting response"})
   }




}