import { redirect } from "next/navigation"
import { auth } from "./auth"


export default async function Home() {
  const session = await auth()
  if(session){
    redirect("/signin")
  } 
  return (
    <div className="w-screen h-screen">
       <div className="flex flex-col justify-start text-purple-400 items-center w-full h-full absolute top-40">
        <h1 className="text-8xl font-bold leading-realxed selection:bg-slate-600">
          <span>Discover, <span className="text-gray-300">Collaborate,</span><br /> Build: </span>Connect with peers to <br />bring amazing projects<br /> to life.
        </h1>
        <h3 className="text-xl underline">Link up with your crew to create something epic together.</h3>

       </div>
    </div>
  )
}
