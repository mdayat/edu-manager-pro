-- DropForeignKey
ALTER TABLE "classroom" DROP CONSTRAINT "classroom_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_student" DROP CONSTRAINT "classroom_student_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_student" DROP CONSTRAINT "classroom_student_student_id_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_teacher_id_fkey";

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom_student" ADD CONSTRAINT "classroom_student_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom_student" ADD CONSTRAINT "classroom_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
