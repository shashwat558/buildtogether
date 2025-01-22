import { prisma } from "./prisma"

export const getUserDetails = async (userEmail: string) => {
    const user = await prisma.user.findFirst({
        where:{
            email: userEmail
        },
        
    });
    
    return user;
}

