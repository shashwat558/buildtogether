"use client";
import React, { useState } from "react";
import StudentCardList, { StudentProps } from "@/components/StudentCardList";

type Props = {
  students: StudentProps[];
};

const DashboardClient = ({ students }: Props) => {
  const [sameCollegeGuys, setSameCollegeGuys] = useState(students);

  const handleVote = async (id: string, isUpvote: boolean) => {
    const res = await fetch(`/api/project/${isUpvote ? "upvote" : "downvote"}`, {
      method: "POST",
      body: JSON.stringify({ projectId: id }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return console.log("Error");

    
    setSameCollegeGuys((prev) =>
      prev.map((student) => ({
        ...student,
        projects: student.projects.map((project) =>
          project.id === id
            ? { ...project, _count: { upvotes: project._count.upvotes + (isUpvote ? 1 : -1) } }
            : project
        ),
      }))
    );
  };

  return <StudentCardList students={sameCollegeGuys} onUpvote={handleVote} />;
};

export default DashboardClient;
