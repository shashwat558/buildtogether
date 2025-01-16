"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
    <div>
        <button onClick={() => signIn("google")}>
            signin
        
        </button>
        <button onClick={() => signIn("github")}>
            github

        </button>
    </div>
  )
}

export default page