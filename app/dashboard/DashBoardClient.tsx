"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'
import StudentCardList, { StudentProps } from '@/components/StudentCardList'
import { motion } from 'framer-motion';
import SearchUser from '@/components/SearchUser'
import UsePingWebSocket from '@/hooks/useWebSocket'
import { toast } from 'react-toastify'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const itemsPerPage = 10;

const DashBoardClient = ({sameCollegeGuys, otherCollegeMates}: {sameCollegeGuys: StudentProps[] | null, otherCollegeMates: StudentProps[] | null}) => {

  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPingCount, setPrevPingCount] = useState(0);
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  const selectedList = (sameCollegeGuys && sameCollegeGuys.length > 0) ? sameCollegeGuys : otherCollegeMates;
  const totalItems = (selectedList && selectedList.length);
  const totalPages = Math.ceil((totalItems ?? 0) / itemsPerPage);

  const paginatedData = ( selectedList && selectedList.slice(
    (currentPage - 1) * itemsPerPage, (currentPage * itemsPerPage))
  )

  const gretting= (): string => {
    const d = new Date()
    const hours = d.getHours();
    if(hours >= 5 && hours < 12 ){
      return "Good Morning"
    } else if(hours >= 12 && hours < 17 ){
      return "Good evening"
    } else if(hours >= 17 && hours < 21){
      return "Good afternoon"
    } else {
      return "Good Night"
    }

    
  }
  
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
    if ((recievedPings?.length ?? 0) > prevPingCount) {
      toast("You got a ping");
      setPrevPingCount(recievedPings?.length ?? 0)
    }
    if ((messages?.length ?? 0) > prevMessageCount) {
      toast("You've got a message");
      setPrevMessageCount(messages?.length?? 0)
    }
  }, [recievedPings, messages, prevPingCount, prevMessageCount]);

  return (
    <div className='max-sm:overflow-x-hidden'>
      <motion.div
  variants={{
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }}
  initial="hidden"
  animate="visible"
  className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 rounded-2xl mb-5 shadow-lg w-full max-w-lg mx-auto max-sm:overflow-hidden max-sm:w-[370px]"
>
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    className="absolute -top-3 -right-3"
  >
    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 animate-pulse" />
  </motion.div>

  <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-2 sm:gap-3">
    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text text-center sm:text-left">
      {gretting()}
    </h2>
    <span className="text-2xl sm:text-3xl font-bold text-blue-400">
      {session?.user?.username}
    </span>
    <span className="text-2xl sm:text-3xl">👋</span>
  </div>

  <p className="mt-2 text-gray-400 font-medium text-center">
    {"Ready to explore what's new today?"}
  </p>
</motion.div>


      

      
      <div className='flex max-sm:flex-col max-sm:justify-center items-center'>
         <Link className=''  href={"/project/domain"}><motion.p variants={{ hidden: {opacity: 0, y:-15},
        visible: {
            opacity: 1,
            y:0,
            transition: {
                duration: 1
            }
        }}} initial="hidden" animate="visible" className='flex items-center'><Button  variant={"outline"}>Projects by domain<span className="rotate-[-45deg] ">{"->"}</span></Button></motion.p></Link>
        <SearchUser />
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
      </div>

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
        className='text-white text-4xl font-bold mt-3 max-sm:text-center'
      >
        { paginatedData && paginatedData.length > 0 ? "Your College Mates" : "No one from your college, check out others!"}
      </motion.h1>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm />
      </Modal>

      <div className='text-white w-[950px] flex flex-col gap-3 mt-8'>
        <StudentCardList students={paginatedData && paginatedData.length > 0 ? paginatedData : []} onUpvote={handleVote}/>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashBoardClient;