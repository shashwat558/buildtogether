"use client";

import React, { useEffect, useState } from 'react'

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';


interface UserDetailsType {
  username: string,
  college: {
    name: string,
    city: string
  },
  email: string;
  githubUsername: string;
}

const Page = () => {
    const {data: session} = useSession();  
    if(!session){
        redirect("/")
    } else if(!session.user?.username || session.user.username === "default"){
      redirect("/completeProfile")
    }

  
    
    const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);


    useEffect(() => {
      const getUserDetails = async () => {
        const response = await fetch("/api/getUserDetals", {
          method: "GET",
          headers : {
            'Content-Type': "application/json"
          }
        })
        if(response.ok){
          const {data} = await response.json();
          setUserDetails(data);
          

        } else{
          console.log("sory")
        }
      }
      getUserDetails()
    }, [session, userDetails])
    
  return (
    <div className='w-1/2 h-[800px] border-2  rounded-md p-5 shadow-md bg-gray-900 '>
      <div className='w-10 h-10 rounded-full bg-white text-center text-2xl'>{userDetails?.username?.split("")[0]}</div>
      <h1 className='text-white'>{userDetails?.username}</h1>




    </div>
  )
}

export default Page;