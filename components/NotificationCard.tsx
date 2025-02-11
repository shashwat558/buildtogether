import React from 'react'

const NotificationCard = ({username, project}: {username: string, project: string}) => {
  
  return (
    <div className='w-full h-auto p-2 bg-gray-700'>
      <div className='flex justify-center items-center'>
        <h1>{username}</h1>
        <p> Wants to work with you on </p>
        <h1>{project}</h1>
      </div>
    </div>
  )
}

export default NotificationCard