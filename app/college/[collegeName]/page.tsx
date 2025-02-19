

import React from "react";

const getUsers = async (collegeName: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/colleges/getbyCollege?collegeName=${collegeName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store", 
        next: {revalidate: 100}
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
};






const page = async ({params}: {params: Promise<{collegeName: string}>}) => {
    const {collegeName} = await params
    console.log(collegeName)
    const users = await getUsers(collegeName)
    console.log(users);

    

  return (
    <div>page</div>
  )
}

export default page;


