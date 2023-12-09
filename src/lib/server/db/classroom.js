import { supabase } from "./supabaseClient";

const createClassroomStudentRelationship = (classroomId, studentIds) => {
  const classroomStudentRows = studentIds.map((id) => {
    return {
      classroom_id: classroomId,
      student_id: id,
    };
  });

  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom_student")
      .insert(classroomStudentRows)
      .then((res) => {
        if (res.status === 201) {
          resolve();
        } else {
          reject(res.error);
        }
      });
  });
  return promise;
};

const deleteClassroomStudentRelationship = (studentIds) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom_student")
      .delete()
      .in("student_id", studentIds)
      .then((res) => {
        if (res.status === 204) {
          resolve();
        } else {
          reject(res.error);
        }
      });
  });
  return promise;
};

const createClassroom = (classroom, studentIds) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
      .insert({ ...classroom })
      .then((res) => {
        if (res.status === 201) {
          createClassroomStudentRelationship(classroom.id, studentIds)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(res.error);
        }
      });
  });
  return promise;
};

const getClassrooms = (teacherId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
      .select("id, name, description, student(count)")
      .eq("teacher_id", teacherId)
      .then((res) => {
        if (res.status === 200) {
          const classrooms = res.data.map((classroom) => {
            return {
              id: classroom.id,
              name: classroom.name,
              description: classroom.description,
              numberOfEnrolledStudents: classroom.student[0].count,
            };
          });

          resolve(classrooms);
        } else {
          reject(res.error);
        }
      });
  });
  return promise;
};

const getClassroom = (classroomId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
      .select(
        "name, description, student(id, name, email, age, gender, payment_status)",
      )
      .eq("id", classroomId)
      .maybeSingle()
      .then((res) => {
        if (res.status === 200) {
          const classroom = {
            name: res.data.name,
            description: res.data.description,
            enrolledStudents: res.data.student,
            numberOfEnrolledStudents: res.data.student.length,
          };

          resolve(classroom);
        } else {
          reject(res.error);
        }
      });
  });
  return promise;
};

const updateClassroom = (classroomId, newData) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
      .update({ ...newData })
      .eq("id", classroomId)
      .then((res) => {
        if (res.status === 204) {
          resolve();
        } else {
          reject(res.error);
        }
      });
  });
  return promise;
};

const deleteClassroom = (classroomId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
      .delete()
      .eq("id", classroomId)
      .then((res) => {
        if (res.status === 204) {
          resolve();
        } else {
          reject(res.error);
        }
      });
  });
  return promise;
};

export {
  createClassroomStudentRelationship,
  deleteClassroomStudentRelationship,
  createClassroom,
  getClassrooms,
  getClassroom,
  updateClassroom,
  deleteClassroom,
};
