"use client"

import { Github, Users, Boxes } from 'lucide-react';
import Link from 'next/link';

export interface ProjectProps {
  id: string
  title: string;
  description: string;
  githubLink: string;
  memberIds: string[];
  membersCount: number;
  techStack: string[];
  Domain: string;
  currentlyWorking: boolean;
  authorName: string;
}

function ProjectCard2({project}: {project: ProjectProps}) {
  return (
    <div className="w-full max-w-[38rem] mx-auto p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <Link href={`/project/${project.id}`}><h1 className="text-xl font-bold text-white mb-1">{project.title}</h1></Link>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              project.currentlyWorking ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
            }`}>
              {project.currentlyWorking ? 'Active' : 'Completed'}
            </span>
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-3">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Users size={16} />
                <span>{project.membersCount} member{project.membersCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-6">
                {project.memberIds.map((member, index) => (
                  <Link
                    key={index}
                    href={`/user/${member}`}
                    
                    className="text-blue-400 hover:text-blue-300 transition-colors text-xs"
                  >
                    {member}
                    {index < project.memberIds.length - 1 && ","}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Boxes size={16} />
              <span>{project.Domain}</span>
            </div>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              <Github size={16} />
              <span>View on GitHub</span>
            </a>
          </div>

          {/* Author */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-white text-sm font-medium">{project.authorName[0]}</span>
              </div>
              <div>
                <Link
                  href={`/user/${project.authorName}`}
                  className="text-white font-medium hover:text-blue-400 transition-colors text-sm"
                 
                >
                  {project.authorName}
                </Link>
                <p className="text-gray-400 text-xs">Project Author</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard2;