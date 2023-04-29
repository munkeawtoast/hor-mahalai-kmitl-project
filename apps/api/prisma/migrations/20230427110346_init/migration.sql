-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'DORM_OWNER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "UserID" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "PassWord" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsBanned" BOOLEAN NOT NULL DEFAULT false,
    "LastOnline" TIMESTAMP(3) NOT NULL,
    "RoleID" "role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "ticket" (
    "TicketID" SERIAL NOT NULL,
    "TicketCategoryID" INTEGER NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("TicketID")
);

-- CreateTable
CREATE TABLE "ticket_category" (
    "TicketCategoryID" SERIAL NOT NULL,
    "TicketCategoryName" TEXT NOT NULL,

    CONSTRAINT "ticket_category_pkey" PRIMARY KEY ("TicketCategoryID")
);

-- CreateTable
CREATE TABLE "dorm" (
    "DormID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Lattitude" TEXT NOT NULL,
    "Longitude" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "WaterRate" TEXT NOT NULL,
    "Electricityrate" TEXT NOT NULL,
    "LandMarkID" INTEGER NOT NULL,

    CONSTRAINT "dorm_pkey" PRIMARY KEY ("DormID")
);

-- CreateTable
CREATE TABLE "rooms" (
    "RoomsID" SERIAL NOT NULL,
    "DormID" INTEGER NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("RoomsID")
);

-- CreateTable
CREATE TABLE "landmark" (
    "LandmarkID" SERIAL NOT NULL,
    "ParentUniversityID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "landmark_pkey" PRIMARY KEY ("LandmarkID")
);

-- CreateTable
CREATE TABLE "accommodation" (
    "AccommodationID" SERIAL NOT NULL,
    "DormID" INTEGER NOT NULL,
    "RoomsID" INTEGER NOT NULL,
    "AccommodationTypeID" INTEGER NOT NULL,

    CONSTRAINT "accommodation_pkey" PRIMARY KEY ("AccommodationID")
);

-- CreateTable
CREATE TABLE "accommodation_type" (
    "AccommodationTypeID" SERIAL NOT NULL,
    "AccommodationName" TEXT NOT NULL,

    CONSTRAINT "accommodation_type_pkey" PRIMARY KEY ("AccommodationTypeID")
);

-- CreateTable
CREATE TABLE "rating" (
    "RatingID" SERIAL NOT NULL,
    "DormID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Score" INTEGER NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("RatingID")
);

-- CreateTable
CREATE TABLE "comment" (
    "CommentID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "CommentedText" TEXT NOT NULL,
    "DormID" INTEGER NOT NULL,
    "ParentCommentID" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("CommentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_UserName_key" ON "user"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "user_PassWord_key" ON "user"("PassWord");

-- CreateIndex
CREATE UNIQUE INDEX "dorm_UserID_key" ON "dorm"("UserID");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_TicketCategoryID_fkey" FOREIGN KEY ("TicketCategoryID") REFERENCES "ticket_category"("TicketCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "user"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dorm" ADD CONSTRAINT "dorm_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "user"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dorm" ADD CONSTRAINT "dorm_LandMarkID_fkey" FOREIGN KEY ("LandMarkID") REFERENCES "landmark"("LandmarkID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_DormID_fkey" FOREIGN KEY ("DormID") REFERENCES "dorm"("DormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landmark" ADD CONSTRAINT "landmark_ParentUniversityID_fkey" FOREIGN KEY ("ParentUniversityID") REFERENCES "landmark"("LandmarkID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_DormID_fkey" FOREIGN KEY ("DormID") REFERENCES "dorm"("DormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_RoomsID_fkey" FOREIGN KEY ("RoomsID") REFERENCES "rooms"("RoomsID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_AccommodationTypeID_fkey" FOREIGN KEY ("AccommodationTypeID") REFERENCES "accommodation_type"("AccommodationTypeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_DormID_fkey" FOREIGN KEY ("DormID") REFERENCES "dorm"("DormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "user"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "user"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_DormID_fkey" FOREIGN KEY ("DormID") REFERENCES "dorm"("DormID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_ParentCommentID_fkey" FOREIGN KEY ("ParentCommentID") REFERENCES "comment"("CommentID") ON DELETE RESTRICT ON UPDATE CASCADE;
