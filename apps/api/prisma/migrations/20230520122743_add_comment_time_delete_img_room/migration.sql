/*
  Warnings:

  - You are about to drop the column `roomID` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_roomID_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "roomID";
