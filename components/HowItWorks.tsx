"use client"

import React from 'react'
import {motion} from "framer-motion";
import { BlurIn } from './ui/blurtext';
const HowItWorks = () => {
  return (
    <motion.div className='w-full mt-20 h-[600px]'>
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='w-2/3'>
                <h1 className='underline text-5xl pl-20 text-start font-semibold text-[#C084FC] '>
                    <BlurIn><span className='tracking-tight'>Get started in just <span className='text-white'>3</span> simple steps:</span></BlurIn>

               </h1>

            </div>
            
        </div>
    </motion.div>
  )
}

export default HowItWorks