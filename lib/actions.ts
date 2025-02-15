import { prisma } from "./prisma"

export const getUserProfilePic = async (id: string) => {
    const pic = await prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            profileImage: true
        }
    })
    return pic;

}