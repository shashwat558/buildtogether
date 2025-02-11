"use client"

import type React from "react"
import { motion } from "framer-motion"
import { UserCircle } from "lucide-react"

interface NotificationCardProps {
  username: string
  project: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({ username, project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="relative p-6">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 opacity-50" />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="flex items-center mb-4"
          >
            <UserCircle className="w-12 h-12 text-indigo-500 mr-4" />
            <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 mb-4"
          >
            wants to collaborate with you on:
          </motion.p>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-indigo-100 rounded-lg p-3"
          >
            <h3 className="text-lg font-semibold text-indigo-800">{project}</h3>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NotificationCard

