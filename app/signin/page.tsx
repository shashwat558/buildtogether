"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
    <div>
        <button onClick={() => signIn("google")}>
            signin
        
        </button>
    </div>
  )
}

export default page