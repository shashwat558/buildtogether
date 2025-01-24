
import { redirect } from "next/navigation"
import { auth, signIn } from "../auth"
 
export default async function SignIn() {
  const session = await auth( )
  if(session){
    redirect("/dashboard")
  }
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
        redirect("/completeProfile")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 