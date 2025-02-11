"use client"
import NotificationCard from '@/components/NotificationCard';
import UsePingWebSocket from '@/hooks/useWebSocket';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface PingProps {
    senderId: string;
    type: "ping";
    targetedUserId: string;
    projectName: string;
}

const Page = () => {
    const { data: session } = useSession();
    const [pings, setPings] = useState<PingProps[]>([]);
    const { recievedPings } = UsePingWebSocket({ userId: session?.user?.id ?? "" });

    console.log("Live WebSocket Pings:", recievedPings);

    // Update state when new pings arrive
    useEffect(() => {
        if (recievedPings) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
            setPings((prev) => [...prev, ...recievedPings]);
        }
    }, [recievedPings]);

   
    useEffect(() => {
        if (!session?.user?.id) return;
        
        const getPings = async () => {
            const response = await fetch(`/api/ping?userId=${session?.user?.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched API Pings:", data);
                setPings(data);
            } else {
                console.log("Cannot fetch pings");
            }
        };

        getPings();
    }, [session?.user?.id]);

    return (
        <div>
            <h2>Live Pings</h2>
            <ul>
                {pings.map((ping, index) => (
                    <NotificationCard 
                        key={index}
                        project={ping.projectName} 
                        username={ping.senderId} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default Page;
