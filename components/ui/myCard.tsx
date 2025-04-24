"use client"
import React from 'react';
import { motion } from "framer-motion";

import { LucideIcon} from 'lucide-react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  color: string;
  delay: number;
}

const Card = ({ icon: Icon, title, content, color, delay }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: delay,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group relative w-72 p-6 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 shrink-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <motion.div 
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="relative mb-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
        <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700`}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </motion.div>
      
      <div className="relative">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default Card