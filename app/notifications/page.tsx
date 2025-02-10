"use client"
import UsePingWebSocket from '@/hooks/useWebSocket';
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'



const Page = () => {
    const {data: session} = useSession();

    const {recievedPings} = UsePingWebSocket()
    const [pings, setPings] = useState()


  return (
    <div>page</div>
  )
}

export default Page