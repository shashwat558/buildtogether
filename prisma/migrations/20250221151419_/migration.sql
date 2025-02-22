/*
  Warnings:

  - You are about to drop the column `userId` on the `Members` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId,userName]` on the table `Members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_userId_fkey";

-- DropIndex
DROP INDEX "Members_projectId_userId_key";

-- AlterTable
ALTER TABLE "Members" DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Members_projectId_userName_key" ON "Members"("projectId", "userName");

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
