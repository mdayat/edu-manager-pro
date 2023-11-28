/*
  Warnings:

  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" VARCHAR(8) NOT NULL,
    "address" TEXT NOT NULL,
    "payment_status" BOOLEAN NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);
