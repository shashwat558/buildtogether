"use client"

import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {useSession} from "next-auth/react";

interface College {
    id: string,
    name: string
}

const Page = () => {
    const {data} = useSession();
    const userId = data?.user?.id;
    const [username, setUsername] =useState<string>("");
    const [colleges, setColleges] = useState<College[]>([]);
    const [college, setCollege] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

    if(searchQuery.length < 3){
        setColleges([]);
        return;
    }

    const timeOutId = setTimeout(async() => {
        setLoading(true);
        try {
            const response = await fetch(`/api/colleges?query=${searchQuery}`)
            if(response.ok){
                const data = await response.json();
                setCollege(data)
            }
        } catch (error) {
            console.log(error)
            
        }finally{
            setLoading(false)
        }

    }, 300);

    return () => clearInterval(timeOutId)


    },[searchQuery])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId ,username, college})
        });

        if(response.ok){
            console.log("Profile updated succesfully")
        } else {
            console.log("failed to update profile")
        }

    }

     

  return (
    <div className='w-[850px] h-[800px] border-2 border-gray-700 rounded-lg p-10'>
        <form action="" onSubmit={handleSubmit} >
            <label className='text-white text-2xl' htmlFor="username">Username</label>
            <Input onChange={(e) => setUsername(e.target.value)} type='text' value={username} placeholder='username' className='w-1/2'/>
            <label htmlFor="college" className='text-white text-2xl'>Select your College</label>
            <Input className='w-1/2' value={college} onChange={(e) => setSearchQuery(e.target.value)}/>
            {loading && <p>Loading colleges</p>}
            <ul>
                {colleges.map((college) => (
                    <li key={college.id }>
                        {college.name}

                    </li>
                ))}
            </ul>

        </form>
    </div>
  )
}

export default Page;