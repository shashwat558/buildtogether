import { MessageCircle } from 'lucide-react'
import React from 'react'
import Comment from './Comment'
import { Input } from './ui/input'


const CommentSection = () => {
  return (
    <div className='w-full bg-transparent'>
        <div className='w-full p-8 flex flex-col'>
            <h1 className='text-white flex items-center gap-2'><MessageCircle size={30}/><span className=' font-semibold text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent'>Comments</span></h1>

            <Input className='w-full'/>

            <div className='flex flex-col overflow-y-scroll'>
                <Comment />
                <Comment />
            </div>

        </div>
    </div>
  )
}

export default CommentSection