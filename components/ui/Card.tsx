import React from 'react'

const Card = ({color, title, content, rotate, icon}:{
    color: string;
    title: string;
    content: string;
    rotate: string;
    icon: React.ReactNode
}) => {
  return (
    <div className={`h-72 w-56 rounded-3xl gap-3 flex flex-col ${color} p-5 text-white border-[1px] hover:rotate-0 hover:scale-125 transition-all ease-in-out ${rotate} shadow-md hover:bg-[#18181B] shadow-inherit`}>
        <div className='flex flex-row items-center'>
          <h1 className='text-3xl capitalize'>{title}</h1>
       <div className='scale-150'>
        {icon}
       </div>
            
          
          

        </div>
        
        <p className='hover:text-lg text-md'>{content}</p>
        
    </div>
  )
}

export default Card