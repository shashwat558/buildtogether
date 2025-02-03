/*
  Warnings:

  - You are about to drop the column `authorId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorName` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_authorId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "authorId",
ADD COLUMN     "authorName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
