import { cookies } from "next/headers";
import { auth } from "../auth";
import NotificationClient from "./NotificationClient";
import { redirect } from "next/navigation";

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


const getPings = async () => {
    const session = await auth();
            try {
                const getCookie = async (name: string) => {
                 return (await cookies()).get(name)?.value ?? "";
     }
                const sessionTokenAuthJs = await getCookie("authjs.session-token");
                
                const response = await fetch(`${process.env.PRODUCTION_URL}/api/ping?userId=${session?.user?.id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json",
                        Cookie: `authjs.session-token=${sessionTokenAuthJs}`
                        
                     },
                     credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    

                    const formattedData = data.map((ping: PingProps) => ({
                        ...ping,
                        sender: { username: ping.sender?.username ?? ping.senderName??"Unknown" },
                        project: { title: ping.project?.title ?? ping.projectName ?? "Untitled Project" },
                    }));

                    return formattedData
                } else {
                    console.log("Cannot fetch pings");
                }
            } catch (error) {
                console.error("Error fetching pings:", error);
            }
        };


const page = async () => {
    const session = await auth();

    if(!session){
        redirect("/signin")
    }
    const pings = await getPings();
    
  return (
    <NotificationClient pings={pings}/>
  )
}

export default page