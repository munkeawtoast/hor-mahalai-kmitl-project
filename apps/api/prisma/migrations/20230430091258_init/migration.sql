-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'DORM_OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('WEB', 'USER', 'DORM', 'OTHER');

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
    "Role" "Role" NOT NULL,
    "imageID" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "TicketCategory" "TicketCategory" NOT NULL,
    "userID" INTEGER NOT NULL,
    "dormID" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID")
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
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
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
    "dormID" INTEGER NOT NULL,
    "roomsID" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("imageID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Dorm_userID_key" ON "Dorm"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Image_url_key" ON "Image"("url");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageID_fkey" FOREIGN KEY ("imageID") REFERENCES "Image"("imageID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Image" ADD CONSTRAINT "Image_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomsID_fkey" FOREIGN KEY ("roomsID") REFERENCES "Room"("roomsID") ON DELETE RESTRICT ON UPDATE CASCADE;
