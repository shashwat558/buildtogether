"use client"

import type React from "react"
import { motion } from "framer-motion"
import { UserCircle, Check, X } from "lucide-react"
import Link from "next/link"

interface NotificationCardProps {
  username: string
  project: string
  onAccept: (id: string) => void
  onReject: (id: string) => void
  pingId: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({ username, project, onAccept, onReject, pingId }) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="relative p-6">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50" />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="flex items-center mb-4"
          >
            <UserCircle className="w-12 h-12 text-indigo-400 mr-4" />
            <Link href={`/user/${username}`}>
              <h2 className="text-2xl font-bold text-gray-100 hover:text-indigo-400 transition-all ease-in-out duration-500">
                {username}
              </h2>
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-300 mb-4"
          >
            wants to collaborate with you on:
          </motion.p>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gray-700 rounded-lg p-3 mb-4"
          >
            <h3 className="text-lg font-semibold text-indigo-300">{project}</h3>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-between"
          >
            <button
              onClick={() => onAccept(pingId)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              <Check className="w-5 h-5 mr-2" />
              Accept
            </button>
            <button
              onClick={() => onReject(pingId)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              <X className="w-5 h-5 mr-2" />
              Reject
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NotificationCard

