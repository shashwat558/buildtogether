"use client"
import React, {  useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUp, ArrowDown, ExternalLink, MessageSquareMore } from 'lucide-react';
import Blinker from './ui/blinker';
import { useSession } from 'next-auth/react';
import PingButton from './pingButton';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface StudentCardProps {
  id: string;
  projectId: string;
  username: string;
  githubUsername: string;
  projectTitle: string;
  currentlyWorking: boolean;
  upvotes: number;
  onUpvote: (id: string, isUpvote: boolean) => Promise<void>;
}

const StudentCard: React.FC<StudentCardProps> = ({
  username,
  githubUsername,
  projectTitle,
  currentlyWorking,
  id,
  upvotes,
  projectId,
  onUpvote,
}) => {
  const { data: session } = useSession();
  const [localUpvotes, setLocalUpvotes] = useState<number>(upvotes);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleLocalUpvote = async (isUpvote: boolean) => {
    setLocalUpvotes((prev) => (isUpvote ? prev + 1 : prev - 1));
    await onUpvote(projectId, isUpvote);
  };

  const handleChatClick = async(userId2: string) => {
    const response = await fetch("/api/chat/start", {
      method: "POST",
      body: JSON.stringify({userId2}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    try {
      if(response.ok){
        
        
          router.push(`/chats`);
          
        
      } 
      
    } catch (error) {
      console.log(error)
      
    }
  }

  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 transform scale-[2] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative w-full bg-gradient-to-r from-gray-800/90 to-gray-900/90 p-6 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between space-x-6">
          <motion.div 
            variants={contentVariants}
            className="flex items-center gap-4 flex-grow"
          >
            <div className="flex flex-col">
              <motion.a
                href={session?.user?.username === username ? "/profile" : `/user/${username}`}
                className="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {username}
              </motion.a>
              <motion.a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">@{githubUsername}</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            variants={contentVariants}
            className="flex items-center gap-6"
          >
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-sm">Current Project</span>
              <span className="font-semibold text-white">{projectTitle}</span>
            </div>

            <div className="flex items-center gap-4">
              <PingButton 
                receiverId={id} 
                projectId={projectId} 
                projectName={projectTitle} 
                senderName={session?.user?.username ?? ""} 
              />
              {session?.user?.username === username ? "": <MessageSquareMore className='cursor-pointer hover:text-purple-400' onClick={() => handleChatClick(id)}/>}

              {currentlyWorking && <Blinker />} 
            </div>


            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLocalUpvote(true)}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
              <span className={clsx(
                "font-bold px-2",
                localUpvotes > 0 ? "text-green-400" : 
                localUpvotes < 0 ? "text-red-400" : 
                "text-gray-400"
              )}>
                {localUpvotes}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLocalUpvote(false)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <ArrowDown className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StudentCard;