import { supabase } from "./supabaseClient";

const createClassroom = (classroom) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
      .insert({ ...classroom })
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

const getClassrooms = (teacherId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
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

const getClassroom = (classroomId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("classroom")
      .select()
      .eq("id", classroomId)
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
  createClassroom,
  getClassrooms,
  getClassroom,
  updateClassroom,
  deleteClassroom,
};
