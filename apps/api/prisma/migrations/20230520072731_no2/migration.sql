/*
  Warnings:

  - The values [WEB,USER] on the enum `TicketCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketCategory_new" AS ENUM ('REGISTER', 'LOGIN', 'WEBBUG', 'OTHER', 'DORM');
ALTER TABLE "Ticket" ALTER COLUMN "TicketCategory" TYPE "TicketCategory_new" USING ("TicketCategory"::text::"TicketCategory_new");
ALTER TYPE "TicketCategory" RENAME TO "TicketCategory_old";
ALTER TYPE "TicketCategory_new" RENAME TO "TicketCategory";
DROP TYPE "TicketCategory_old";
COMMIT;
