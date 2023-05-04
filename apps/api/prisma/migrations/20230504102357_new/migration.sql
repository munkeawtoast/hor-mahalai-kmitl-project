-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_dormID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentCommentID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userID_fkey";

-- DropForeignKey
ALTER TABLE "Dorm" DROP CONSTRAINT "Dorm_userID_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_dormID_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_roomID_fkey";

-- DropForeignKey
ALTER TABLE "Landmark" DROP CONSTRAINT "Landmark_parentUniversityID_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_dormID_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userID_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_dormID_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_dormID_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userID_fkey";

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dorm" ADD CONSTRAINT "Dorm_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_parentUniversityID_fkey" FOREIGN KEY ("parentUniversityID") REFERENCES "Landmark"("landmarkID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentID_fkey" FOREIGN KEY ("parentCommentID") REFERENCES "Comment"("commentID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_dormID_fkey" FOREIGN KEY ("dormID") REFERENCES "Dorm"("dormID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("roomID") ON DELETE CASCADE ON UPDATE CASCADE;
