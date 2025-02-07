import UsePingWebSocket from '@/hooks/useWebSocket'
import { useSession } from 'next-auth/react';
import React from 'react'

const PingButton = ({receiverId}: {receiverId: string}) => {

    const {data:session} = useSession();

    const {sendPing} = UsePingWebSocket(session?.user?.id ?? "");

  return ( 
    <div>
        <button onClick={() => sendPing(receiverId)}>ping</button>
    </div>

  )
}

export default PingButton;