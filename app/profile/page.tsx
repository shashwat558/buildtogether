import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation';
import { getUserDetails } from '@/lib/actions';

const page = async() => {
    const session = await auth();
    const email = session?.user?.email as string;
    const userInfo = await getUserDetails(email)
    if(!session){
        redirect("/")
    }
    console.log(JSON.stringify(userInfo))
    console.log((email))
  return (
    <div className='w-1/2 h-[800px] border-2  rounded-md p-5 shadow-md bg-gray-900 '>
      <div className='w-10 h-10 rounded-full bg-white text-center text-2xl'>{userInfo?.name?.split("")[0]}</div>
      <h1 className='text-white'>{userInfo?.name}</h1>




    </div>
  )
}

export default page