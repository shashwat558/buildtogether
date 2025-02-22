"use client"

import React from 'react';

import { Github, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Blinker from './ui/blinker';



interface ProjectCard3Props {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  membersCount: number;
  techStack: string[];
  upvotes: number;
  authorName: string;
  currentlyWorking: boolean;
}

const ProjectCard3: React.FC<ProjectCard3Props> = ({
  id,
  title,
  description,
  githubLink,
  membersCount,
  techStack,
  upvotes,
  authorName,
  currentlyWorking,
}) => {
  return (
    <div className="group relative max-h-[200px] w-full max-w-4xl overflow-hidden rounded-xl bg-gray-900 p-0.5 transition-all hover:scale-[1.01] hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 transition-opacity group-hover:opacity-100" />
      
      <div className="relative flex bg-gray-900 p-6">
        <div className="flex flex-col justify-between w-full gap-2">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Link 
                href={`/project/${id}`}
                className="text-xl font-bold text-white hover:text-indigo-400 transition-colors"
              >
                {title}
                <ArrowUpRight className="inline ml-2 h-5 w-5" />
              </Link>
              
              <div className="flex items-center gap-2">
                {currentlyWorking && (
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                    <Blinker />
                  </span>
                )}
                <Link 
                  href={githubLink} 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-6 w-6" />
                </Link>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4">{description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-around">
             <Link href={`/user/${authorName}`} className='hover:text-blue-500 text-gray-400'>
                author: {authorName}
              </Link>
            <div
              
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
             
              <Users className="h-5 w-5" />
              <span>{membersCount} member{membersCount !== 1 ? 's' : ''}</span>
            </div>
            
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                {upvotes} upvote{upvotes !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard3;