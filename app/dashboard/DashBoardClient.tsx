"use client"
import React, { useEffect, useState } from 'react'


import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'
// import {PacmanLoader} from "react-spinners";

import StudentCardList, { StudentProps } from '@/components/StudentCardList'
import { motion } from 'framer-motion';
import SearchUser from '@/components/SearchUser'
import UsePingWebSocket from '@/hooks/useWebSocket'
import { toast } from 'react-toastify'

const DashBoardClient = ({sameCollegeGuys, otherCollegeMates}: {sameCollegeGuys: StudentProps[], otherCollegeMates: StudentProps[]}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  
  const {data: session }= useSession();
  const {recievedPings, messages} = UsePingWebSocket({userId: session?.user?.id ?? ""});

  const handleVote = async (id: string, isUpvote: boolean) => {
    const res = await fetch(`/api/project/${isUpvote ? "upvote": "downvote"}`, {
      method: "POST",
      body: JSON.stringify({projectId: id}),
      headers: {
        'Content-Type': "application/json"
      }
    });
    
    if(!res.ok){
      console.log("Error");
      return;
      } 
     }

  

      

  useEffect(() => {
    if (recievedPings) {
      toast("You got a ping");
    }
    if (messages) {
      toast("You've got a message");
    }
  }, [recievedPings, messages]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center mt-20">
  //       <div className=" h-screen w-12 border-t-2 border-b-2 border-primary flex flex-col justify-center items-center"><PacmanLoader color='#4c52b8'/></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: -15 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1
            }
          }
        }}
        initial="hidden"
        animate="visible"
        className="text-white text-2xl font-semibold mb-6"
      >
        Hi, {session?.user?.username}! 👋
      </motion.div>

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

      <motion.h1 
        variants={{hidden: {opacity: 0, y: -15},
          visible: {
            opacity: 1,
            y:0,
            transition: {
              duration: 1
            }
          }
        }} 
        initial="hidden" 
        animate="visible" 
        className='text-white text-4xl font-bold mt-3'
      >
        {sameCollegeGuys.length > 0 ? "Your College Mates" : "No one from your college, check out others!"}
      </motion.h1>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm />
      </Modal>

      <div className='text-white w-[950px] flex flex-col gap-3 mt-8'>
        <StudentCardList students={sameCollegeGuys.length > 0 ? sameCollegeGuys : otherCollegeMates} onUpvote={handleVote}/>
      </div>
    </div>
  );
};

export default DashBoardClient;