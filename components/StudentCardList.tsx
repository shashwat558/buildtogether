import { motion } from 'framer-motion';
import React from 'react'
import StudentCard from './StudentCard';

interface StudentProps {
  id: string;
  username: string;
  githubUsername: string;
  projects: [
    {currentlyWorking: boolean,
      title: string
    }
  ]

}

interface StudentCardListProps {
  students: StudentProps[]
}

const StudentCardList:React.FC<StudentCardListProps> = ({students}) => {

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
        {students.map((student, index) => (
            <motion.div key={index} variants={cardVariant}>
                <StudentCard 
                id={student.id}
                currentlyWorking={student.projects[0].currentlyWorking}
                githubUsername={student.githubUsername}
                projectTitle={student.projects[0].title}
                username={student.username}
                />
            </motion.div>
        ))}


    </motion.div>
  )
}

export default StudentCardList