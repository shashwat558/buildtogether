-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "memberIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "membersCount" INTEGER NOT NULL DEFAULT 1;
