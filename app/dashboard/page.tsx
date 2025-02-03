"use client"
import React, { useState } from 'react'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'

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
      <Button variant={'outline'} onClick={() => setIsModalOpen(true)}>
        New Project
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm />
      </Modal>
    </div>
  )
}

export default Page;