import { prisma } from "@/lib/prisma"

import NextAuth, { NextAuthConfig, } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"


declare module "next-auth" {
    interface User {
        username: string;
    }
}

export const config:NextAuthConfig = {
    session: {
        strategy: "jwt"
    
    },
   
    

    providers:[
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        })
    ],

    pages:{
        signIn: "/signin"
    },

    callbacks: {
        async signIn({account, profile}){
            if(!profile?.email){
                throw new Error("No profile")

            }
            const existingUser = await prisma.user.findFirst({
                where:{
                    email: profile?.email
                }
            })
            if(existingUser){
                const linkedAccount = await prisma.account.findFirst({
                    where:{
                        provider: account?.provider,
                        providerAccountId: account?.providerAccountId
                    }
                });
                if(!linkedAccount){
                    await prisma.account.create({
                        data:{
                            userId: existingUser.id,
                            provider: account?.provider as string,
                            providerAccountId: account?.providerAccountId as string,
                            access_token: account?.access_token,
                            refresh_token: account?.refresh_token,
                            type: "oauth"
                        }
                    })
                }
            } else{
                await prisma.user.create({
                    data: {
                        email: profile?.email,
                        name: profile?.name,
                        username: "default",
                        accounts:{
                            create:{
                                provider: account?.provider ?? "",
                                providerAccountId: account?.providerAccountId ?? "",
                                access_token: account?.access_token,
                                refresh_token: account?.refresh_token,
                                type: "oauth"
                            }
                        }
                    }
                })
            }
            return true;
        },
        
        async jwt({token, account, user}){
            if(account){
                token.accessToken = account.access_token;
                token.provider = account.provider
            }
            if(user){
                
                

            }
            if(user){
                const dbUser = await prisma.user.findUnique({
                    where:{
                        email: user.email ?? ""
                    }
                })
                console.log(dbUser?.username + "this is my username")
                token.username = dbUser?.username
                token.id = user.id
                token.email = user.email
                token.name = user.name
            
            }
            
            return token;



        },
        async session({session, token}){
            if(token){
                session.user = {
                    
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name,
                    username : (token.username as string),
                    emailVerified: null
                } 
            }
            return session;

        }
    }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth(config)


