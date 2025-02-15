import React from 'react';

import { GithubIcon, User, ExternalLink, Sparkles } from 'lucide-react';
import { motion, useAnimation} from 'framer-motion';
import Blinker from './ui/blinker';

const ProjectCard = ({
  title,
  description,
  gitHubLink,
  author,
  currentlyWorking
}: {
  title: string;
  description: string;
  gitHubLink: string;
  author: string;
  currentlyWorking: boolean;
}) => {
 
  const controls = useAnimation();

  const truncatedDescription = description && description.length > 100 
    ? `${description.substring(0, 100)}...` 
    : description;
    
  const truncatedGitLink = gitHubLink && gitHubLink.length > 30 
    ? `${gitHubLink.substring(0, 30)}...` 
    : gitHubLink;

 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-[340px] h-[380px]"
    >
      <motion.div
        initial={false}
        animate={controls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        
        className="relative h-full rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-[2px] overflow-hidden shadow-xl"
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(45deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)",
            filter: "blur(1px)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Card content */}
        <motion.div
          className="relative h-full rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 p-6 overflow-hidden"
          
        >
          {/* Header */}
          <motion.div 
            className="flex justify-between items-start mb-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="bg-yellow-500/10 p-2 rounded-lg"
              >
                <Sparkles size={24} className="text-yellow-400" />
              </motion.div>
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                {title}
              </motion.h1>
            </div>
            {currentlyWorking && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mt-2"
              >
                <Blinker />
              </motion.div>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            className="flex-grow mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-2">
              <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">About</span>
              <motion.p
                className="text-gray-100 text-base leading-relaxed font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {truncatedDescription}
              </motion.p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="space-y-4 mt-auto pt-4 border-t border-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* GitHub Link */}
            <motion.a
              href={gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-200 hover:text-blue-400 transition-colors duration-300 bg-gray-800/50 p-3 rounded-lg"
              whileHover={{ x: 5, backgroundColor: "rgba(30, 41, 59, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <GithubIcon size={20} className="text-blue-400" />
              </motion.div>
              <span className="text-sm font-medium truncate flex-1">{truncatedGitLink}</span>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink size={14} className="text-blue-400" />
              </motion.div>
            </motion.a>

            {/* Author */}
            <motion.div
              className="flex items-center gap-3 text-gray-200 bg-gray-800/30 p-3 rounded-lg"
              whileHover={{ x: 5 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="bg-gray-700/50 p-1.5 rounded-lg"
              >
                <User size={20} className="text-blue-400" />
              </motion.div>
              <motion.span
                className="text-base font-semibold bg-gradient-to-r from-gray-100 to-blue-100 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                {author}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;