
import React from 'react'
import DashBoardClient from './DashBoardClient';
import { cookies } from 'next/headers';



const getStudents = async () => {
  const getCookie = async (name: string) => {
      return (await cookies()).get(name)?.value ?? "";
     }
     const sessionTokenAuthJs = await getCookie("authjs.session-token");
  const [res1, res2] = await Promise.all([
    fetch(`${process.env.PRODUCTION_URL}/api/college`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authjs.session-token=${sessionTokenAuthJs}`
      },
      next: {revalidate: 50}
    }),
    fetch(`${process.env.PRODUCTION_URL}/api/colleges/other-colleges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authjs.session-token=${sessionTokenAuthJs}`
      },
      
      next: {revalidate: 100}
    })
  ])
  const data1 = res1.ok ? await res1.json() : null;
  const data2 = res2.ok ? await res2.json() : null;

  return {data1, data2}
  
}

const page = async () => {
  const {data1, data2} = await getStudents();
  
  
  return (
    <DashBoardClient otherCollegeMates={data2[0]?.users} sameCollegeGuys={data1[0]?.users} />
  )
}

export default page