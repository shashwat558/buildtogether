"use client"
import React, { useEffect, useState } from 'react';
import { School, MapPin, Github, Mail, User } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import ProfileSkeleton from '@/components/ui/ProfileSkeleton';
import { redirect, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';


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
    <div className="min-h-screen w-full flex  justify-center p-4">
      <div className="profile-border w-full max-w-3xl flex flex-col gap-5 p-1">
        <div className="backdrop-blur-sm bg-slate-900/50 p-8 rounded-xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image Section */}
            <div className="flex-shrink-0 hover-effect">
              <div className="w-48 h-48 rounded-2xl overflow-hidden ring-2 ring-purple-500/20">
                {userDetails.profileImage ? (
                  <Image
                    src={userDetails.profileImage}
                    alt={userDetails.username}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl font-semibold text-purple-300">
                    {userDetails.username.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="flex-grow space-y-6">
              
              

              <div className="space-y-4">
                <div className="space-y-2">
                
                <p className="ml-[10px] text-white flex items-center gap-2">
                  <User className="w-5 h-5 font-bold" />
                  <h1 className="text-4xl font-semibold tracking-tight">
                  {userDetails.username ?? ""}
                </h1>
                  
                </p>
              </div>
                
                <div className="flex items-center gap-3 text-gray-300 hover-effect p-2 rounded-lg">
                  <School className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium text-2xl">{userDetails.college.name}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {userDetails.college.city}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${userDetails.email}`}
                    className="flex items-center gap-3 text-gray-300 hover-effect p-2 rounded-lg text-xl"
                  >
                    <Mail className="w-5 h-5 text-pink-400" />
                    {userDetails.email}
                  </a>

                  <a
                    href={`https://github.com/${userDetails.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover-effect p-2 rounded-lg text-xl"
                  >
                    <Github className="w-5 h-5 text-blue-400" />
                    github.com/{userDetails.githubUsername}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
          <div className='flex backdrop-blur-sm bg-slate-900/50 flex-col gap-3 w-full rounded-xl h-[360px] p-1'>
            <h1 className='text-5xl ml-3 mt-3 underline text-pretty items-center text-white'>Currently Live projects</h1>

            <div className='flex gap-2 overflow-x-scroll scroll-smooth h-full text-center'>
              {userDetails.projects && userDetails.projects.map((project, index) => (
                <ProjectCard key={index} author={project.authorName} title={project.title} description={project.description}  gitHubLink={project.githubLink} currentlyWorking={project.currentlyWorking}/>

              ))}
              
            
            </div>

          <div>
              
        </div>
          
          

          
        </div>
      </div>
    </div>
  );
}

export default Page;