"use client"

import ProjectCard3 from '@/components/ProjectCard3';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChartNoAxesColumn, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  membersCount: number;
  techStack: string[];
  _count: {upvotes: number}
  authorName: string;
  currentlyWorking: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const LeaderBoardClient = ({topProjects}: {topProjects: ProjectCardProps[]}) => 
    {

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalItems = topProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = (topProjects).slice(
    (currentPage - 1) * itemsPerPage, (currentPage * itemsPerPage)
  )
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2'>
        <motion.h1 variants={{
            hidden: {opacity: 0, y: -20},
            visible: {opacity: 1, y:0, transition: {duration: 1}}
        }} className='text-4xl font-semibold text-white w-2/3 flex items-center'>Leaderboard  <ChartNoAxesColumn size={40} /></motion.h1>
    
        <motion.div 
      className='w-full overflow-scroll'
      variants={container}
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
    >
      {paginatedData && paginatedData.length > 0 && (
        paginatedData.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            style={{ width: '100%' }}
            className='w-full flex flex-col justify-center items-center gap-5'

          >
            <ProjectCard3 
              authorName={project.authorName}
              currentlyWorking={project.currentlyWorking}
              description={project.description}
              githubLink={project.githubLink}
              id={project.id}
              membersCount={project.membersCount}
              techStack={project.techStack}
              title={project.title}
              upvotes={project._count.upvotes}
            />
          </motion.div>
        ))
      )}
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
    </motion.div>
    </div>
  );
};

export default LeaderBoardClient;