


import GenenricStudentsComponent from "@/components/GenericStudentsComponent";
import { School } from "lucide-react";
import React from "react";

const getUsers = async (collegeId: string) => {
    const res = await fetch(`https://buildtogether.vercel.app/api/colleges/getbyCollege?collegeId=${collegeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
};






const page = async ({params}: {params: Promise<{collegeId: string}>}) => {
    const {collegeId} = await params
    
    
    const users = await getUsers(collegeId)
    
    

    

  return (
    <div className="flex flex-col gap-5 w-1/2 mt-10">
       <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent ">
    Builders of <span><School /></span> {users?.name}
</h1>
        <GenenricStudentsComponent students={users.users}/>

    </div>
    
  )
}

export default page;


