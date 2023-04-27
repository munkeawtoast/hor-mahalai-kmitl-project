/*
  Warnings:

  - You are about to drop the `accommodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodation_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dorm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `landmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'DORM_OWNER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "accommodation" DROP CONSTRAINT "accommodation_AccommodationTypeID_fkey";

-- DropForeignKey
ALTER TABLE "accommodation" DROP CONSTRAINT "accommodation_DormID_fkey";

-- DropForeignKey
ALTER TABLE "accommodation" DROP CONSTRAINT "accommodation_RoomsID_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_DormID_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_ParentCommentID_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_UserID_fkey";

-- DropForeignKey
ALTER TABLE "dorm" DROP CONSTRAINT "dorm_LandMarkID_fkey";

-- DropForeignKey
ALTER TABLE "dorm" DROP CONSTRAINT "dorm_UserID_fkey";

-- DropForeignKey
ALTER TABLE "landmark" DROP CONSTRAINT "landmark_ParentUniversityID_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_DormID_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_UserID_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_DormID_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_TicketCategoryID_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_UserID_fkey";

-- DropTable
DROP TABLE "accommodation";

-- DropTable
DROP TABLE "accommodation_type";

-- DropTable
DROP TABLE "comment";

-- DropTable
DROP TABLE "dorm";

-- DropTable
DROP TABLE "landmark";

-- DropTable
DROP TABLE "rating";

-- DropTable
DROP TABLE "rooms";

-- DropTable
DROP TABLE "ticket";

-- DropTable
DROP TABLE "ticket_category";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bannedAt" TIMESTAMP(3),
    "roleID" "Role" NOT NULL,
    "imageID" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ticketCategoryID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID")
);

-- CreateTable
CREATE TABLE "TicketCategory" (
    "ticketCategoryID" SERIAL NOT NULL,
    "ticketCategoryName" TEXT NOT NULL,

    CONSTRAINT "TicketCategory_pkey" PRIMARY KEY ("ticketCategoryID")
);

-- CreateTable
CREATE TABLE "Dorm" (
    "dormID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "waterRate" TEXT NOT NULL,
    "electricityrate" TEXT NOT NULL,
    "landmarkID" INTEGER NOT NULL,

    CONSTRAINT "Dorm_pkey" PRIMARY KEY ("dormID")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomsID" SERIAL NOT NULL,
    "dormID" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomsID")
);

-- CreateTable
CREATE TABLE "Landmark" (
    "landmarkID" SERIAL NOT NULL,
    "parentUniversityID" INTEGER,
    "name" TEXT NOT NULL,

    CONSTRAINT "Landmark_pkey" PRIMARY KEY ("landmarkID")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "accommodationID" SERIAL NOT NULL,
    "dormID" INTEGER,
    "roomsID" INTEGER,
    "accommodationTypeID" INTEGER NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("accommodationID")
);

-- CreateTable
CREATE TABLE "AccommodationType" (
    "accommodationTypeID" SERIAL NOT NULL,
    "accommodationName" TEXT NOT NULL,

    CONSTRAINT "AccommodationType_pkey" PRIMARY KEY ("accommodationTypeID")
);

-- CreateTable
CREATE TABLE "Rating" (
    "ratingID" SERIAL NOT NULL,
    "dormID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("ratingID")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "dormID" INTEGER NOT NULL,
    "parentCommentID" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentID")
);

-- CreateTable
CREATE TABLE "Image" (
    "imageID" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("imageID")
);

-- CreateTable
CREATE TABLE "_DormToImage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Dorm_userID_key" ON "Dorm"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Image_url_key" ON "Image"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_DormToImage_AB_unique" ON "_DormToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_DormToImage_B_index" ON "_DormToImage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToRoom_AB_unique" ON "_ImageToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToRoom_B_index" ON "_ImageToRoom"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageID_fkey" FOREIGN KEY ("imageID") REFERENCES "Image"("imageID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ticketCategoryID_fkey" FOREIGN KEY ("ticketCategoryID") REFERENCES "TicketCategory"("ticketCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dorm" ADD CONSTRAINT "Dorm_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dorm" ADD CONSTRAINT "Dorm_landmarkID_fkey" FOREIGN KEY ("landmarkID") REFERENCES "Landmark"("landmarkID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_parentUniversityID_fkey" FOREIGN KEY ("parentUniversityID") REFERENCES "Landmark"("landmarkID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_roomsID_fkey" FOREIGN KEY ("roomsID") REFERENCES "Room"("roomsID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_accommodationTypeID_fkey" FOREIGN KEY ("accommodationTypeID") REFERENCES "AccommodationType"("accommodationTypeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentID_fkey" FOREIGN KEY ("parentCommentID") REFERENCES "Comment"("commentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DormToImage" ADD CONSTRAINT "_DormToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Dorm"("dormID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DormToImage" ADD CONSTRAINT "_DormToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("imageID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToRoom" ADD CONSTRAINT "_ImageToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("imageID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToRoom" ADD CONSTRAINT "_ImageToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("roomsID") ON DELETE CASCADE ON UPDATE CASCADE;
