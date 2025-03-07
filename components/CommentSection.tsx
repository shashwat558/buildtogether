"use client";
import { MessageCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Input } from './ui/input'
import {useCommentStore} from "../app/store/actions/commentActions";
import Comment from './Comment';

    const formatTime = (date: Date) => {
     return new Intl.DateTimeFormat('en-US', {
       hour: 'numeric',
       minute: 'numeric',
       hour12: true,
     }).format(new Date(date));
  };


const CommentSection = ({projectId}: {projectId: string}) => {

  const {setComments, comments} = useCommentStore();

  const [newComment, setNewComment] = useState("");



  useEffect(() => {
    const getComment = async () => {
      const res = await fetch(`/api/comment?projectId=${projectId}`, {

        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }

      })
      if(res.ok){
        const data = await res.json();
         console.log(data)
        setComments(data)
      }
    }
    getComment()
  },[projectId, setComments])
  return (
    <div className='w-full bg-transparent'>
        <div className='w-full p-8 flex flex-col'>
            <h1 className='text-white flex items-center gap-2'><MessageCircle size={30}/><span className=' font-semibold text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent'>Comments</span></h1>

            <Input className='w-full' type='text'/>

            <div className='flex flex-col overflow-y-scroll'>
              {comments && comments.map((comment) => ({
               
                <Comment content={comment.content} createdAt={ formatTime(new Date()) } username={"shashwat"}/>

              }))}
            </div>

        </div>
    </div>
  )
}

export default CommentSection