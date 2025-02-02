"use client";

import React, { useEffect, useState } from 'react'


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


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
    <div className='w-1/2 h-[800px] border-2  rounded-md p-5 shadow-md bg-gray-900 '>
      <div className='w-40 h-40 rounded-full overflow-hidden bg-white text-center text-2xl flex justify-center items-center'>
        {userDetails?.profileImage ? <Image className="object-fill"  src={userDetails?.profileImage?? userDetails?.username.split(""[0])} alt='profilePic' width={200} height={200}/>: <div>{userDetails?.username.split("")[0]}</div>}
      </div>
      <h1 className='text-white'>{userDetails?.username}</h1>




    </div>
  )
}

export default Page;