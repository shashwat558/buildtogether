import { headers } from 'next/headers'
import React from 'react'

const page =async  () => {

  const header = await headers();
  const username = header.get("username")
  console.log(username)
  return (
    <div>page</div>
  )
}

export default page