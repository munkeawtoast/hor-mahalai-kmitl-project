/*
  Warnings:

  - You are about to drop the column `roomsID` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `electricityrate` on the `Dorm` table. All the data in the column will be lost.
  - You are about to drop the column `roomsID` on the `Image` table. All the data in the column will be lost.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roomsID` on the `Room` table. All the data in the column will be lost.
  - Added the required column `electricityRate` to the `Dorm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_roomsID_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_roomsID_fkey";

-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "roomsID",
ADD COLUMN     "roomId" INTEGER;

-- AlterTable
ALTER TABLE "Dorm" DROP COLUMN "electricityrate",
ADD COLUMN     "electricityRate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "roomsID",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "roomsID",
ADD COLUMN     "roomId" SERIAL NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId");

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
