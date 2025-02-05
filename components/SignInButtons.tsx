"use client"



import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Loader, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInButtons() {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <Card className="p-6 h-[300px] w-[500px] space-y-4 bg-gray-800 border-gray-700 flex flex-col justify-center items-center gap-6">
      <Button className="w-full h-[45px] bg-white text-black text-lg hover:bg-gray-200" onClick={async () => {

        setLoading(true)
        
        signIn("google")
        
        setLoading(false)
        }}>
        <Mail className="mr-2 h-4 w-4" />
        {loading? <Loader />: "Sign in with Google"}
      </Button>
      <Button className="w-full h-[45px] bg-gray-900 text-lg  text-white hover:bg-gray-800" onClick={() => signIn("github")}>
        <Github className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
    </Card>
  )
}



