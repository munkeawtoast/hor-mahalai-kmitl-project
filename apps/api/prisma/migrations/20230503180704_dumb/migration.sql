/*
  Warnings:

  - You are about to drop the column `roomId` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Image` table. All the data in the column will be lost.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roomId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomID` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_roomId_fkey";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "roomId",
ADD COLUMN     "roomID" INTEGER;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "roomId",
ADD COLUMN     "roomID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "roomId",
ADD COLUMN     "roomID" SERIAL NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomID");

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("roomID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("roomID") ON DELETE RESTRICT ON UPDATE CASCADE;
