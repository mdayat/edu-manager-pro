import { supabase } from "./supabaseClient";

const createStudent = (student) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .insert({
        id: student.id,
        name: student.name,
        email: student.email,
        age: student.age,
        gender: student.gender,
        address: student.address,
        payment_status: student.payment_status,
      })
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

const getStudents = () => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .select()
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
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
      .select()
      .eq("id", studentId)
      .maybeSingle()
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
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

export { createStudent, getStudents, getStudent, deleteStudent };
