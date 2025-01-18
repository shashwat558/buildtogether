"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'


const NavBar = () => {
  return (
    <div className='w-full px-20 py-5'>
        <div className="flex justify-between items-center">
            <Image 
              src="/Untitled.jpeg"
              alt='image'
              height={100}
              width={100}
              className=''
            />
            
        <div className=''>
          <Link href="/signin">
          
            <Button onClick={() => console.log("jdljfl")}  variant="outline" className='bg-transparent text-white text-lg cursor-pointer '>
                Login
            </Button>
          </Link>            

        </div>
        

        </div>
    </div>
  )
}

export default NavBar