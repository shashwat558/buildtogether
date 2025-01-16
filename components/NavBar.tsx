import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'


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
        <div className='cursor-pointer'>
            <Button variant="outline" className='bg-transparent text-white text-lg '>
                Login/signup
            </Button>
            

        </div>

        </div>
    </div>
  )
}

export default NavBar