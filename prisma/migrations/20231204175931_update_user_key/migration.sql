/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "classroom" DROP CONSTRAINT "classroom_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_teacher_id_fkey";

-- AlterTable
ALTER TABLE "classroom" ALTER COLUMN "teacher_id" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "teacher_id" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
