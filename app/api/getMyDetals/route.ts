

import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
   

   const session = await auth();
   
   
  
    
        try {
            const user = await prisma.user.findUnique({
            where: {
                email:session?.user?.email ?? ""
                
            }, 
            select: {
                username: true,
                college: {
                    select:{
                        name: true,
                        city: true
                    }
                },
                email: true,
                githubUsername: true,
                profileImage: true

            }
        })
        return NextResponse.json({user}, {status: 200})
        } catch (error) {
            console.log(error)
            return NextResponse.json({message: error})
            
        }
    


}