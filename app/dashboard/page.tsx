"use client"
import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Page = () => {
    const {data: session }= useSession();
    
    if(!session){
        redirect("/signin")
    } 
    

  return (
    <div>page</div>
  )
}

export default Page;