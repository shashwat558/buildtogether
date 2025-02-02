"use client";

import React, { useEffect, useState } from 'react'
import {  Poppins } from 'next/font/google';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { School } from 'lucide-react';


const Poppin = Poppins({
weight: "400",
subsets: ["latin"]
})
interface UserDetailsType {
  username: string,
  college: {
    name: string,
    city: string
  },
  email: string;
  githubUsername: string;
  profileImage: string
}

const Page = () => {
    const {data: session} = useSession();  
    const router = useRouter()
    if(!session){
        router.push("/")
    } else if(!session.user?.username || session.user.username === "default"){
      router.push("/completeProfile")
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
          const {user} = await response.json();
          setUserDetails(user);
          

        } else{
          console.log("sory")
        }
      }
      getUserDetails()
    }, [session])
    
  return (
    <div className={`${Poppin.className} w-1/2 h-[800px] rounded-md p-5 shadow-md `}>

      <div className='flex items-center gap-x-6'>

      <div className='w-40 h-40 rounded-full overflow-hidden bg-transparent text-center text-2xl flex justify-center items-center'>
        {userDetails?.profileImage ? <Image className="object-fill"  src={userDetails?.profileImage?? userDetails?.username.split(""[0])} alt='profilePic' width={200} height={200}/>: <div>{userDetails?.username.split("")[0]}</div>}
      </div>
      <div className='flex flex-col gap-5 justify-center'>
      <h1 className='text-5xl text-white'><span className='text-xl underline mr-2'>username:</span>{userDetails?.username}</h1>
      <h1 className='text-4xl text-white'><span><School /></span> {userDetails?.college.name}</h1>
      </div>
      
      </div>




    </div>
  )
}

export default Page;