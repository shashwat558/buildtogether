"use client"
import React, { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'

import StudentCardList from '@/components/StudentCardList'
import { motion } from 'framer-motion';
import SearchUser from '@/components/SearchUser'



const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sameCollegeGuys, setSameCollegeGuys] = useState([])
    const {data: session }= useSession();
    
    
    
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
        }}} initial="hidden" animate="visible">
        <Button variant={'outline'} onClick={() => setIsModalOpen(true)}>
        New Project
      </Button>
      </motion.div>

      <SearchUser />

      <h1 className='text-white text-4xl font-bold mt-3'>Your College Mates</h1>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm />
      </Modal>

      <div className='text-white w-[950px] flex flex-col gap-3 mt-8'>
        <StudentCardList students={sameCollegeGuys?? null}/>

        
      </div>

    </div>
  )
}

export default Page;