

import { auth, signIn } from "../auth"
 
export default async function SignIn() {
  const session = await auth()
   console.log(session)
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")

      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 