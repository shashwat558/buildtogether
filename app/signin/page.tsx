

import SignInButtons from "@/components/SignInButtons"
import { auth} from "../auth"
 
export default async function SignIn() {
  const session = await auth()
   console.log(session)
  return (
    <SignInButtons />
  )
} 