import { supabase } from "./supabaseClient";

const createStudent = (student) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .insert({ ...student })
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

const getStudents = (teacherId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .select("id, name, email, age, payment_status, classroom(count)")
      .eq("teacher_id", teacherId)
      .then((res) => {
        if (res.status === 200) {
          const students = res.data.map((student) => {
            return {
              id: student.id,
              name: student.name,
              email: student.email,
              age: student.age,
              payment_status: student.payment_status,
              numberOfEnrolledClassrooms:
                student.classroom.length !== 0 ? student.classroom[0].count : 0,
            };
          });

          resolve(students);
        } else {
          reject(res.error);
        }
      });
  });

  return promise;
};

const getStudent = (studentId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .select(
        "name, email, age, gender, address, payment_status, classroom(id, name)",
      )
      .eq("id", studentId)
      .maybeSingle()
      .then((res) => {
        if (res.status === 200) {
          const student = {
            name: res.data.name,
            email: res.data.email,
            age: res.data.age,
            gender: res.data.gender,
            address: res.data.address,
            payment_status: res.data.payment_status,
            enrolledClassrooms: res.data.classroom,
            numberOfEnrolledClassrooms: res.data.classroom.length,
          };

          resolve(student);
        } else {
          reject(res.error);
        }
      });
  });

  return promise;
};

const updateStudent = (studentId, newData) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .update({ ...newData })
      .eq("id", studentId)
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

const deleteStudent = (studentId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .delete()
      .eq("id", studentId)
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

export { createStudent, getStudents, getStudent, updateStudent, deleteStudent };
