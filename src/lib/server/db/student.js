import { supabase } from "./supabaseClient";

const createStudent = (student) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .insert({
        ...student,
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

const getStudents = (teacherId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("student")
      .select()
      .eq("teacher_id", teacherId)
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
