
import SignInButtons from "@/components/SignInButtons"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth()

  if (session) {
    // Redirect to dashboard or home page if already signed in
    redirect("/dashborad")
    return null // You might want to add a redirect here
  }

  return (
    <div className=" flex items-center justify-center p-4 mt-10">
      <div className="w-[500px] h-[500px]">
        <h1 className="text-5xl tracking-wide font-bold text-center text-white mb-8">Sign in to your account</h1>
        <SignInButtons />
      </div>
    </div>
  )
}

