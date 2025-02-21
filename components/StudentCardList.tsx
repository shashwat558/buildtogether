"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import StudentCard from './StudentCard';

export interface StudentProps {
  id: string;
  username: string;
  githubUsername: string;
  projects: {
    currentlyWorking: boolean;
    title: string;
    id: string;
    _count: {
      upvotes: number;
    };
  }[];
}

interface StudentCardListProps {
  students: StudentProps[];
  onUpvote: (id: string, isUpvote: boolean) => Promise<void>;
}

const StudentCardList: React.FC<StudentCardListProps> = ({ students, onUpvote }) => {
  const [clientStudents, setClientStudents] = useState<StudentProps[]>([]);
  

  useEffect(() => {
    setClientStudents([ ...students].sort((a, b) => b.projects[0]._count.upvotes - a.projects[0]._count.upvotes))
    
  }, [students]);


  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6 w-full max-w-7xl mx-auto px-4"
    >
      {clientStudents.length > 0 ? (
        clientStudents.map((student) => (
          <StudentCard
            key={student.id}
            upvotes={student.projects[0]?._count.upvotes ?? 0}
            onUpvote={onUpvote}
            id={student.id}
            projectId={student.projects[0]?.id ?? ""}
            currentlyWorking={student.projects[0]?.currentlyWorking ?? false}
            githubUsername={student.githubUsername}
            projectTitle={student.projects[0]?.title ?? "No Project"}
            username={student.username}
          />
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="text-gray-400 text-lg">getting your college mates</div>
          
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentCardList;