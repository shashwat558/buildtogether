"use client"

import type React from "react"
import { motion } from "framer-motion"
import { UserCircle, Check, X, Sparkles, Clock } from "lucide-react"
import Link from "next/link"


interface NotificationCardProps {
  username: string
  project: string
  onAccept: (id: string) => void
  onReject: (id: string) => void
  pingId: string
  timestamp?: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({ 
  username, 
  project, 
  onAccept, 
  onReject, 
  pingId,
  timestamp = "2 hours ago"
}) => {
  
  
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  }

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    hover: { 
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      
      className="w-[350px] h-[340px] max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-[0_0_15px_rgba(124,58,237,0.1)] rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all duration-500"
    >
      <div className="relative p-8">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-indigo-900/20 opacity-50" />
        
        
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="flex items-center"
            >
              <div className="relative">
                <UserCircle className="w-14 h-14 text-indigo-400" />
                <motion.div
                  variants={sparkleVariants}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>
              <div className="ml-4">
                <Link href={`/user/${username}`} className="group">
                  <h2 className="text-2xl font-bold text-gray-100 group-hover:text-indigo-400 transition-all duration-300">
                    {username}
                  </h2>
                </Link>
                <div className="flex items-center mt-1 text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{timestamp}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-300 mb-4 text-lg"
          >
            wants to collaborate with you on:
          </motion.p>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 mb-6 border border-gray-700 hover:border-indigo-500/30 transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold text-indigo-300 mb-2">{project}</h3>
            <div className="flex items-center text-gray-400">
              <span className="text-sm">Click to view project details</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-between gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAccept(pingId)}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              <Check className="w-5 h-5 mr-2" />
              Accept
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onReject(pingId)}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-500 hover:to-rose-500 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              <X className="w-5 h-5 mr-2" />
              Reject
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NotificationCard