/*
  Warnings:

  - You are about to drop the `_classroom_student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_classroom_student" DROP CONSTRAINT "_classroom_student_A_fkey";

-- DropForeignKey
ALTER TABLE "_classroom_student" DROP CONSTRAINT "_classroom_student_B_fkey";

-- DropTable
DROP TABLE "_classroom_student";

-- CreateTable
CREATE TABLE "classroom_student" (
    "classroom_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,

    CONSTRAINT "classroom_student_pkey" PRIMARY KEY ("classroom_id","student_id")
);

-- AddForeignKey
ALTER TABLE "classroom_student" ADD CONSTRAINT "classroom_student_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom_student" ADD CONSTRAINT "classroom_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
