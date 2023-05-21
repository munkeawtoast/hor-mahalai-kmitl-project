/*
  Warnings:

  - The primary key for the `AccommodationType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `accommodationTypeID` column on the `AccommodationType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `accommodationTypeID` on the `Accommodation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `AccommodationCategory` to the `AccommodationType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_accommodationTypeID_fkey";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "accommodationTypeID",
ADD COLUMN     "accommodationTypeID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AccommodationType" DROP CONSTRAINT "AccommodationType_pkey",
ADD COLUMN     "AccommodationCategory" "AccommodationCategory" NOT NULL,
DROP COLUMN "accommodationTypeID",
ADD COLUMN     "accommodationTypeID" SERIAL NOT NULL,
ADD CONSTRAINT "AccommodationType_pkey" PRIMARY KEY ("accommodationTypeID");

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_accommodationTypeID_fkey" FOREIGN KEY ("accommodationTypeID") REFERENCES "AccommodationType"("accommodationTypeID") ON DELETE RESTRICT ON UPDATE CASCADE;
