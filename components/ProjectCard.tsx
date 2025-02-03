import React from 'react'
import Blinker from './ui/blinker';
import { GithubIcon, User } from 'lucide-react';

const ProjectCard = ({title, description, gitHubLink, author, currentlyWorking}: {
    title: string;
    description: string;
    gitHubLink: string;
    author: string
    currentlyWorking: boolean
}) => {

    const truncatedDescription = description && description.length > 50 ? `${description.substring(0, 50)}...`: description;


  return (
    <div className='bg-gray-800 w-[250px] h-[250px] p-3 rounded-xl border-[0.3px] border-gray-300'>
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className='flex justify-between w-full item-center'>
                <h1 className='text-[30px] underline text-yellow-50 '>{title}</h1>
                <div className='mt-4 mr-2'>
                    {currentlyWorking && <Blinker />}
                </div>
                
            </div>
            <div className='w-full'>
                <p className='text-start text-[20px] text-white flex flex-col'>
                    <span className='text-[15px]'>About:</span> {truncatedDescription}
                  
                </p>
                </div>
                <div className='w-full text-start text-white'>
                    <div className='flex gap-2'>
                        <GithubIcon size={25}/>
                        <a className='text-blue-400' href={gitHubLink}>
                 {gitHubLink}
                        </a>
                    </div>
                    
            <h1 className='flex gap-2 mt-4 text-xl text-white'><User />: {author}</h1>
                </div>
            

        </div>

    </div>
  )
}

export default ProjectCard;