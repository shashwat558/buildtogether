"use client"
import React, { useState } from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const {data: session }= useSession();
    console.log(session?.user);
    
    if(!session){
        redirect("/signin")
    } else if(session.user?.username === "default"){
      redirect("/completeProfile")
    }
   

  return (
    <div>
      <Button></Button>
    </div>
  )
}

export default Page;