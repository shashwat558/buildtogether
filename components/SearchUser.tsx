import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface UsersProp{
    username: string,
    profileImage: string

}

const SearchUser = () => {
    const [users, setUsers] = useState<UsersProp[] | null>(null);
    const [searchParams, setSearchParams] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [colleges, setColleges] = useState("")

    useEffect(() => {
        if(searchParams.length < 3){
            setUsers([]);
            return;
        }

        const timeOutId = setTimeout(async() => {
            setIsLoading(true);
            const response = await fetch(`/api/getUsers?query=${searchParams}`);
            try{
            if(response.ok){
                const data = await response.json();
                console.log(data)
                setUsers(data)
            }else{
                console.log("something went wrong");
            }
        } catch(error){
            console.log(error)
        } finally{
            setIsLoading(false);
        }
        },300)

        return () => clearTimeout(timeOutId);


    },[searchParams])
  return (
    <div className='w-full bg-transparent'>
        <div className='flex justify-center items-center gap-5'>
            <div className='flex flex-col'>
            <input type="text" value={searchParams} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchParams(e.target.value)}/>
            {isLoading?<p>Loading Users...</p>: <ul className='z-10  text-white'>{users?.map((user, index) => (
                <li className='cursor-pointer' onClick={()=> {
                    redirect(`/user/${user.username}`)
                }} key={index}>{user.username}</li>
            ))}</ul> }
            </div>
            <div className='flex flex-col'>
            <input type="text" value={searchParams} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchParams(e.target.value)}/>
            {isLoading?<p>Loading Users...</p>: <ul className='z-10  text-white'>{users?.map((user, index) => (
                <li className='cursor-pointer' onClick={()=> {
                    redirect(`/user/${user.username}`)
                }} key={index}>{user.username}</li>
            ))}</ul> }
            </div>
            
        </div>

    </div>
  )
}

export default SearchUser