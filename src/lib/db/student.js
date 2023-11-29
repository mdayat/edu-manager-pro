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

export { createStudent };
