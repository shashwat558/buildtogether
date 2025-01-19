import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation';
import { getUserDetails } from '@/lib/actions';

const page = async() => {
    const session = await auth();
    const email = session?.user?.email as string;
    const userInfo = getUserDetails(email)
    if(!session){
        redirect("/")
    }
    console.log(JSON.stringify(userInfo))
    console.log(email)
  return (
    <div>page</div>
  )
}

export default page