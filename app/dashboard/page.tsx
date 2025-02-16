"use client"
import React, { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'

import StudentCardList, { StudentProps } from '@/components/StudentCardList'
import { motion } from 'framer-motion';
import SearchUser from '@/components/SearchUser'



const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sameCollegeGuys, setSameCollegeGuys] = useState<StudentProps[]>([]);
    const {data: session }= useSession();
    
    const handleVote = async (id: string, isUpvote: boolean) => {
      const res = await fetch(`/api/project/${isUpvote ? "upvote": "downvote"}`, {
        method: "POST",
        body: JSON.stringify({projectId: id}),
        headers: {
          'Content-Type': "application/json"
        }
      })
      if(!res.ok){
        console.log("Error");
        return;
      }

     setSameCollegeGuys((prev) => {
    const updatedStudents = prev.map((student) => {
      if (student.projects.length === 0 || student.projects[0].id !== id) return student;

      return {
        ...student,
        projects: student.projects.map((project, index) =>
          index === 0
            ? {
                ...project,
                _count: {
                  upvotes: (project._count.upvotes || 0) + (isUpvote ? 1 : -1), 
                },
              }
            : project
        ),
      };
    });

    
    return [...updatedStudents].sort(
      (a, b) => (b.projects[0]?._count.upvotes || 0) - (a.projects[0]?._count.upvotes || 0)
    );
  });






      
    }
    
    
    if(!session){
        redirect("/signin")
    } else if(session.user?.username === "default"){
      redirect("/completeProfile")
    }
    

    useEffect(() => {
      const colllegeMates = async () => {
        const res = await fetch("/api/college",{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const collegeStudnets = await res.json();
        setSameCollegeGuys(collegeStudnets[0].users)
      }
      colllegeMates()

    },[session])

   

  return (
    <div>
      <motion.div variants={{ hidden: {opacity: 0, y:-15},
        visible: {
            opacity: 1,
            y:0,
            transition: {
                duration: 1
            }
        }}} initial="hidden" animate="visible" className='flex justify-center items-center'>
        <Button variant={'outline'} onClick={() => setIsModalOpen(true)}>
        New Project
      </Button>
      </motion.div>

      <SearchUser />

      <motion.h1 variants={{hidden: {opacity: 0, y: -15},
        visible: {
          opacity: 1,
          y:0,
          transition: {
            duration: 1
          }
        }
    }} initial="hidden" animate="visible" className='text-white text-4xl font-bold mt-3'>Your College Mates</motion.h1>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm />
      </Modal>

      <div className='text-white w-[950px] flex flex-col gap-3 mt-8'>
        <StudentCardList students={sameCollegeGuys?? null} onUpvote={handleVote}/>

        
      </div>

    </div>
  )
}

export default Page;