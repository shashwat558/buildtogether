"use client"

import { Github } from "lucide-react"
import type React from "react"
import { motion } from "framer-motion"
import Blinker from "./ui/blinker"
import Link from "next/link"
import { useSession } from "next-auth/react"
import PingButton from "./pingButton"

interface StudentCardProps {
  id: string;
  
  username: string;
  githubUsername: string;
  projectTitle: string
  currentlyWorking: boolean
}

const StudentCard: React.FC<StudentCardProps> = ({ username, githubUsername, projectTitle, currentlyWorking,id}) => {

  const {data: session} = useSession();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="flex items-center justify-around space-x-8">
        <motion.div className="relative flex items-center gap-2"
          whileHover="hover">
          <motion.h1 whileHover={{scale: 1.2}} variants={itemVariants} className="text-white text-2xl font-bold truncate flex-shrink-0 hover:bg-white hover:text-black hover:rounded-md ">
            <Link href={session?.user?.username===username?"/profile": `/user/${username}`}>{username}</Link>
            <motion.span 
              variants={{
                hover: { opacity: 1, x: 5 },
                initial: { opacity: 0, x: 0 }
              }}
              initial="hidden"
              animate="visible"
              className="text-[#1D2634] hover:text-[black] text-xl font-semibold rotate-[45deg]"
            >
              →
            </motion.span>
          </motion.h1>
        </motion.div>
        <motion.a
          variants={itemVariants}
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors duration-300 ease-in-out flex-shrink-0"
        >
          <Github className="w-5 h-5" />
          <span className="text-md font-semibold">@{githubUsername}</span>
        </motion.a>
        <motion.p variants={itemVariants} className="text-gray-300 text-sm flex-grow truncate">
          Working on: <span className="font-semibold text-white">{projectTitle}</span>
        </motion.p>
        <PingButton receiverId={id} projectName={projectTitle}/>
        {currentlyWorking && (
          <motion.div variants={itemVariants}>
            <Blinker />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default StudentCard;