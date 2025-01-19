
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { auth, signOut } from '@/app/auth'



const NavBar = async () => {
  const session =await auth()
  return (
    <div className='w-[50%] py-5 m-5 flex flex-row justify-between px-10 items-center rounded-lg border-purple-400 border-[1px] shadow-md shadow-purple-500 bg-[#18181B] hover:scale-95 transition-all ease-in-out duration-300 hover:shadow-lg hover:shadow-purple-400'>
      <Link href={"/"}>
      <div className="">
            <Image 
              src="/Untitled.jpeg"
              alt='image'
              height={100}
              width={100}
              className=''
            />
        </div>
      </Link>
        
            
        <div className=''>
          
          
            {session?<Button onClick={async () => {
              "use server"
              await signOut()
            }} variant="outline" className='bg-transparent text-white text-lg cursor-pointer '>
                Logout
            </Button>:<Link href="/signin">
            <Button variant="outline" className='bg-transparent text-white text-lg cursor-pointer '>
                Login
            </Button>
            </Link>}
                  

        
        

        </div>
    </div>
  )
}

export default NavBar