"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star } from 'lucide-react';

const GitHubButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <a
        href="https://github.com/shashwat558/buildtogether"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-full backdrop-blur-sm border border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-purple-500/20"
      >
        <Github className="w-5 h-5" />
        <span className="font-medium">Star on GitHub</span>
        <div className="flex items-center gap-1 bg-gray-700/50 px-2 py-0.5 rounded-full">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm">Star</span>
        </div>
      </a>
    </motion.div>
  );
}

export default GitHubButton;