/*
  Warnings:

  - A unique constraint covering the columns `[dormID]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ticket_dormID_key" ON "Ticket"("dormID");
