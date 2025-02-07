import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const college = await prisma.user.findFirst({
      where: { id: session.user?.id },
      select: {
        college: {
          select: { name: true },
        },
      },
    });

    if (!college?.college?.name) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    const collegeStudents = await prisma.college.findMany({
      where: { name: college.college.name },
      select: {
        users: {
          select: {
            id: true,
            username: true,
            githubUsername: true,
            projects: {
              select: {
                title: true,
                currentlyWorking: true,
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
