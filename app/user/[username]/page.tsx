"use client"
import React, { useEffect, useState } from 'react';
import { School, MapPin, Github, Mail, User, Code } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import ProfileSkeleton from '@/components/ui/ProfileSkeleton';
import { redirect, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {motion} from "framer-motion";
interface UserDetailsType {
  username: string;
  college: {
    name: string;
    city: string;
  };
  email: string;
  githubUsername: string;
  profileImage: string;

  projects: [
    {title: string,
      description: string;
      authorName: string;
      currentlyWorking: boolean;
      githubLink: string;

    }
  ]
}



function Page() {

  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  const {data:session} = useSession();
  


  
  
  const {username} = useParams();
  const sanitizedUsername = String(username);
  if(session?.user?.username === sanitizedUsername){
    redirect("/profile")
  }



  useEffect(() => {
    
    const getUserDetails = async () => {
      const res = await fetch("/api/getUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: sanitizedUsername})
      })

      const data = await res.json();

      if(res.ok){
        console.log(data)
        setUserDetails(data)
      }
    }

    

    getUserDetails();
  },[sanitizedUsername])


 

  if (!userDetails) {
    return (
      <ProfileSkeleton />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-gray-900 py-8 px-4"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 blur-3xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 shadow-xl">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Profile Image */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-shrink-0"
                >
                  <div className="w-56 h-56 rounded-2xl overflow-hidden ring-4 ring-purple-500/30 shadow-2xl">
                    {userDetails.profileImage ? (
                      <Image
                        src={userDetails.profileImage}
                        alt={userDetails.username}
                        width={224}
                        height={224}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <span className="text-6xl font-bold text-purple-300">
                          {userDetails.username.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Profile Details */}
                <div className="flex-grow space-y-8">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <h1 className="flex items-center gap-3 text-4xl font-bold">
                      <User className="w-8 h-8 text-purple-400" />
                      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        {userDetails.username}
                      </span>
                    </h1>

                    <div className="space-y-4">
                      <motion.div 
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                      >
                        <School className="w-6 h-6 text-purple-400" />
                        <div>
                          <p className="font-semibold text-2xl text-white">{userDetails.college.name}</p>
                          <p className="text-gray-400 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> {userDetails.college.city}
                          </p>
                        </div>
                      </motion.div>

                      <motion.a
                        whileHover={{ x: 10 }}
                        href={`mailto:${userDetails.email}`}
                        className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                      >
                        <Mail className="w-6 h-6 text-pink-400" />
                        <span className="text-gray-300 text-lg">{userDetails.email}</span>
                      </motion.a>

                      <motion.a
                        whileHover={{ x: 10 }}
                        href={`https://github.com/${userDetails.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                      >
                        <Github className="w-6 h-6 text-blue-400" />
                        <span className="text-gray-300 text-lg">github.com/{userDetails.githubUsername}</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Code className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Active Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
              {userDetails.projects && userDetails.projects.length > 0 ? (
                userDetails.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard
                      author={project.authorName}
                      title={project.title}
                      description={project.description}
                      gitHubLink={project.githubLink}
                      currentlyWorking={project.currentlyWorking}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">No active projects at the moment</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Page;