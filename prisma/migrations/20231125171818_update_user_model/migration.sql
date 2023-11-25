/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "refresh_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_refresh_token_key" ON "user"("refresh_token");
