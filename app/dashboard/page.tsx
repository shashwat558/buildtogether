import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'

const page = async() => {
    const session = await auth()
    
    if(!session){
        redirect("/signin")
    } 
    console.log(`${session.user?.username} ${session.user?.email}`)

  return (
    <div>page</div>
  )
}

export default page