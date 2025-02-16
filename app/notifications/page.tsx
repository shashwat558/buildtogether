"use client";

import NotificationCard from "@/components/NotificationCard";
import UsePingWebSocket from "@/hooks/useWebSocket";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PingProps {
    id?: string,
    pingId?: string,
    senderId: string;
    type: "ping";
    targetedUserId: string;
    sender?: { username: string }; 
    project?: { title: string };  
    projectId?: string; 
    projectName?: string; 
    senderName?: string
}

const Page = () => {
    const { data: session } = useSession();
    const [pings, setPings] = useState<PingProps[]>([]);
    const { recievedPings } = UsePingWebSocket({ userId: session?.user?.id ?? "" });

    if(!session){
        redirect("/signin")
    }


    

    // Update state when new pings arrive from WebSocket
    useEffect(() => {
        if(!recievedPings || recievedPings.length === 0) return;
        if (recievedPings) {
            // Transform WS response to match `PingProps`
            const formattedPings = recievedPings.map((ping: PingProps) => ({
                ...ping,
                id: ping.id ?? ping.pingId,
                sender: { username: ping.sender?.username ?? ping.senderName ?? "Unknown" }, // Handle missing sender
                project: { title: ping.project?.title ?? ping.projectName ?? "Untitled Project" }, // Handle missing project name
            }));
                    
            setPings((prev) => [...prev, ...formattedPings]);
        }
    }, [recievedPings]);

    // Fetch initial pings from API when session is available
    useEffect(() => {
        if (!session?.user?.id) return;

        const getPings = async () => {
            try {
                const response = await fetch(`/api/ping?userId=${session?.user?.id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const data = await response.json();
                    

                    const formattedData = data.map((ping: PingProps) => ({
                        ...ping,
                        sender: { username: ping.sender?.username ?? ping.senderName??"Unknown" },
                        project: { title: ping.project?.title ?? ping.projectName ?? "Untitled Project" },
                    }));

                    setPings(formattedData);
                } else {
                    console.log("Cannot fetch pings");
                }
            } catch (error) {
                console.error("Error fetching pings:", error);
            }
        };

        getPings();
    }, [session?.user?.id]);

    const handlePingAction = async (id:string,isAccept:boolean, senderName: string, projectId: string)=>{
        
        const response = await fetch(`/api/ping/${isAccept ? "accept": "reject"}`,
            {method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, senderName, projectId })
            },
            
        )
        if(response.ok){
            

            setPings((prev) => prev.filter((ping) => ping.id !== id))
        } else {
            return;
        }

    }

    return (
        <div>
            <h2 className="text-3xl text-white">Notifications</h2>
            <ul className="grid grid-cols-3 gap-3  mt-5">
                {pings.map((ping, index) => (
                    <NotificationCard 
                        pingId = {ping.id?? ""}
                        key={index}
                        project={ping.project?.title || "Unknown Project"} 
                        username={ping.sender?.username ?? ping.senderName ?? "Anonymous"} 
                        onAccept={() => handlePingAction(ping.id ?? ping.pingId ?? "", true, ping.senderName ?? ping.sender?.username ?? "", ping.projectId ?? "")}
                        onReject={() => handlePingAction(ping.id ?? ping.pingId??"", false, ping.senderName ?? ping.sender?.username ?? "", ping.projectId ?? "")}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Page;
