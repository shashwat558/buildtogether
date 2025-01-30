"use client"


import { signIn } from "@/app/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"

export default function SignInButtons() {
  return (
    <Card className="p-6 h-[200px] space-y-4 bg-gray-800 border-gray-700 flex flex-col justify-center items-center gap-6">
      <Button className="w-full h-[45px] bg-white text-black text-lg hover:bg-gray-200" onClick={() => signIn("google")}>
        <Mail className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
      <Button className="w-full h-[45px] bg-gray-900 text-lg  text-white hover:bg-gray-800" onClick={() => signIn("github")}>
        <Github className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
    </Card>
  )
}

