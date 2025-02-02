"use client"
import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Page = () => {
    const {data: session }= useSession();
    console.log(session?.user);
    
    if(!session){
        redirect("/signin")
    } else if(session.user?.username === "default"){
      redirect("/completeProfile")
    }
   

  return (
    <div>page</div>
  )
}

export default Page;