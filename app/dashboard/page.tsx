/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import DashBoardClient from './DashBoardClient';
import { cookies } from 'next/headers';
import { auth } from '../auth';
import ChatComponent from '@/components/ChatComponent';
import { redirect } from 'next/navigation';



const getStudents = async () => {
  const getCookie = async (name: string) => {
      return (await cookies()).get(name)?.value ?? "";
     }
     const sessionTokenAuthJs = await getCookie("authjs.session-token");
  const [res1, res2] = await Promise.all([
    fetch(`${process.env.PRODUCTION_URL}/api/college`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authjs.session-token=${sessionTokenAuthJs}`
      },
      next: {revalidate: 50}
    }),
    fetch(`${process.env.PRODUCTION_URL}/api/colleges/other-colleges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authjs.session-token=${sessionTokenAuthJs}`
      },
      
      next: {revalidate: 100}
    })
  ])
  const data1 = res1.ok ? await res1.json() : null;
  const data2 = res2.ok ? await res2.json() : null;

  return {data1, data2}
  
}

const getChats = async () => {
        const session = await auth();
        if(!session){
          redirect("/signin")
        }
        const getCookie = async (name: string) => {
      return (await cookies()).get(name)?.value ?? "";
     }
     const sessionTokenAuthJs = await getCookie("authjs.session-token");
        const response = await fetch(`${process.env.PRODUCTION_URL}/api/chat`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `authjs.session-token=${sessionTokenAuthJs}`
            },
            
        })
        if(response.ok){
            try {
                const data = await response.json();
                 
                  const chatUsers = data.chats.flatMap((chat: any) => 
                    chat.participants.filter((p:any) => p.userId !== session?.user?.id).map((p:any) => ({
                      id: p.userId,
                      username: p.sender.username,
                      profileImage: p.sender.profileImage,
                      lastSeen: p.sender.lastSeen,
                      isOnline: p.sender.isOnline,
                      chatId: chat.id


                    }))
                  )
              return chatUsers;
            } catch(error){
              console.log(error)
    };
        }}

const page = async () => {
  const {data1, data2} = await getStudents();
  const chatUsers = await getChats();
  console.log(chatUsers)

  
  
  return (
    <div> 
      <ChatComponent chatUsers={chatUsers}/>
       <DashBoardClient otherCollegeMates={data2[0]?.users} sameCollegeGuys={data1[0]?.users} />

    </div>
   

  )
}

export default page