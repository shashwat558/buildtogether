import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"



export const config = {
    providers:[
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],

    pages:{
        signIn: "/signin"
    }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth(config)


