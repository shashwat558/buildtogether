

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  


  try {
    
    const collegeStudents = await prisma.college.findMany({
    where: {
        users: {
            some: {
                projects: {
                    some: {
                        currentlyWorking: true
                    }
                }
            }
        }
    },
      select: {
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

    return NextResponse.json(collegeStudents , { status: 200 });
  } catch (error) {
    console.error("Error fetching college students:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
