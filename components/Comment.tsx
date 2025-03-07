import React from 'react';


interface CommentProps {
  username: string;
  content: string;
  createdAt: string;
}

const Comment = ({ username, content, createdAt }: CommentProps) => {
  return (
    <div className='w-full border-[0.5px] border-white/10 rounded-lg bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10'>
      <div className='w-full flex flex-col p-4 text-white gap-2'>
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-purple-400">@{username}</h1>
          <p className="text-sm text-white/50">
            {createdAt}
          </p>
        </div>
        <p className='w-full text-white/80'>{content}</p>
      </div>
    </div>
  );
}

export default Comment;