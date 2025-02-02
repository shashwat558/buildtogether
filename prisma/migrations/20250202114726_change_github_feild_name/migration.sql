/*
  Warnings:

  - You are about to drop the column `githubLink` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubLink",
ADD COLUMN     "githubUsername" TEXT;
