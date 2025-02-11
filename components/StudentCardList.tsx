"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import StudentCard from './StudentCard';

export interface StudentProps {
  id: string;
  username: string;
  githubUsername: string;
  projects: 

    {currentlyWorking: boolean,
      title: string,
      id: string,
      _count: {
          upvotes: number
      }
      

    }[]
  
 

}

interface StudentCardListProps {
  students: StudentProps[]
  onUpvote: (id: string, isUpvote: boolean) => Promise<void>;
}

const StudentCardList:React.FC<StudentCardListProps> = ({students, onUpvote}) => {

  const [clientStudents, setClientStudents] = useState<StudentProps[]>([]);

  useEffect(() => {
    setClientStudents(students)
  },[students])

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const cardVariant = {
        hidden: {opacity: 0, y:20},
        visible: {
            opacity: 1,
            y:0,
            transition: {
                duration: 0.5
            }
        }
    }
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className='space-y-4'>
        {clientStudents.length > 0 ? clientStudents.map((student, index) => (
            <motion.div key={index} variants={cardVariant}>
                <StudentCard 
                upvotes = {student.projects[0]._count.upvotes}
                onUpvote={onUpvote}
                id={student.id ?? ""}
                projectId={student.projects[0]?.id}
                currentlyWorking={student.projects[0]?.currentlyWorking ?? false}
                githubUsername={student.githubUsername ?? ""}
                projectTitle={student.projects[0]?.title ?? ""}
                username={student.username ?? ""}
                />
            </motion.div>
        )): <p>No students right now..</p>}


    </motion.div>
  )
}

export default StudentCardList