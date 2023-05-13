/*
  Warnings:

  - Added the required column `contactTelnum` to the `Dorm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dorm" ADD COLUMN     "contactFacebook" TEXT,
ADD COLUMN     "contactLine" TEXT,
ADD COLUMN     "contactTelnum" TEXT NOT NULL;
