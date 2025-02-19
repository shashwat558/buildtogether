import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){  
    const {searchParams} = new URL(req.url);

    const collegeId =searchParams.get("collegeId")

    

    if(!collegeId){
        return NextResponse.json({message: "incomplete request"});
    }

    try{ 
          const collegeStudents = await prisma.college.findUnique({
      where: { id: collegeId },
      select: {
        name: true,
        users: {
          where: {
            projects: {
              some: {
                currentlyWorking: true
              }
            }
          },
          select: {
            id: true,
            username: true,
            githubUsername: true,
            projects: {
              select: {
                id: true,
                title: true,
                currentlyWorking: true,
                _count : {
                  select: {
                    upvotes: true
                  }
                }
              },
            },
          },
        },
      },
    });
       return NextResponse.json(collegeStudents)
    } catch(error){
        console.error(error)
        return NextResponse.json({message: "got an error"})
    }
    
}