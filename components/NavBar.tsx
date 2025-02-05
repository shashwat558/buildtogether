"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { motion } from "framer-motion"
import { signOut, useSession } from 'next-auth/react'

 const cardVariant = {
        hidden: {opacity: 0, y:-20},
        visible: {
            opacity: 1,
            y:0,
            transition: {
                duration: 1
            }
        }
    }

const NavBar = () => {
  const {data: session} =useSession()
  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariant} className=' w-[50%] py-5 m-5 flex flex-row justify-between px-10 items-center rounded-lg border-purple-400 border-[1px] shadow-md shadow-purple-500 bg-[#18181B] hover:scale-95 transition-all ease-in-out duration-300 hover:shadow-lg hover:shadow-purple-400'>
      <Link href={"/"}>
      <div className="">
            <Image 
              src="/Hammer.svg"
              alt='image'
              height={60}
              width={80}
              className=''
            />
        </div>
      </Link>
        
            
        <div className='flex flex-row items-center gap-5'>
          {session && <Link href={"/profile"}>
            <div className='text-white '>
              <AccountCircleOutlinedIcon className="text-[40px] tracking-tighter" />
            </div>
          </Link>}
          
            {session?<Button onClick={async () => {
              
               signOut()
            }} variant="outline" className='bg-transparent text-white text-lg cursor-pointer '>
                Logout
            </Button>:<Link href="/signin">
            <Button variant="outline" className='bg-transparent text-white text-lg cursor-pointer '>
                Login
            </Button>
            </Link>}
            
                  

        
        

        </div>
    </motion.div>
  )
}

export default NavBar